import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, MenuItem, Paper, TextField, Typography, CircularProgress } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState, type CSSProperties } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../shared/context/context';
import type { ICreateVolunteerInput } from './interfaces/ICreateVolunteerInput';
import { useVolunteers } from '../hooks/useVolunteers';
import React from 'react';
import * as yup from "yup";
import type { IUpdateVolunteer } from "../pages/interfaces/IUpdateVolunteer";
import { useVolunteerById } from "../../src/hooks/useVolunteers";
import { useParams } from 'react-router-dom';
import alertMessage from '../shared/components/alertMessage';
import ReportProblemIcon from "@mui/icons-material/ReportProblem";


const VolunteerEdit = () => {
    const navigate = useNavigate();
    const {updateVolunteer, isUpdating} = useVolunteers();
    const { id } = useParams<{ id: string }>(); 
    const volunteerId = id ? Number(id) : null;
    const [alert, setAlert] = useState<React.ReactNode | null>(null);
    const {listPosition} = useContext(AppContext);
    const {listAvailability} = useContext(AppContext);
    const {setAlertEdit} = useContext(AppContext);
    const { data: volunteerData, isLoading: isLoadingVolunteer } = useVolunteerById(volunteerId);

    const style: CSSProperties = {
        width: "100%",
        boxSizing: "border-box",
        gap: "1rem",
        display: "flex",
        flexDirection: "column",
    };

    const schema = yup.object({
        name: yup.string().required("O nome é obrigatório"),
        email: yup.string().email("Email inválido").required("O email é obrigatório"),
        fone: yup.string().test("telefone-valido", "Formato: (99) 99999-9999", (value) => {if (!value) return true; return /^\(\d{2}\)\s\d{5}-\d{4}$/.test(value);}).required(),
        position: yup.string().required("O celular é obrigatório"),
        availability: yup.string().required("Disponibilidade é obrigatorio")
    })

    const {register,handleSubmit,reset, control,formState: { errors },} = useForm<ICreateVolunteerInput>({ resolver: yupResolver(schema) });

    useEffect(() =>{
        if(volunteerData){
          reset({
            name: volunteerData.name,
            email: volunteerData.email,
            fone: volunteerData.fone,
            position: volunteerData.position,
            availability: volunteerData.availability
          })
        }
    },[volunteerData, reset])

    const fetchVolunteerUpdate = async (data: IUpdateVolunteer) =>{
      if(!volunteerData) return;

        const newVolunteer = {
                name: data.name,
                email: data.email,
                fone: data.fone,
                position: data.position,
                availability: data.availability
            }
    
            try{
                await updateVolunteer({id: Number(volunteerId),data:newVolunteer})
                navigate("/", { state: { feedbackMessage: "Edição feita com sucesso!", feedbackType: "success" } });
            }catch(error:any){
                setAlert(alertMessage("Erro ao tentar atualizar voluntário!", "error", <ReportProblemIcon />));
  }    }

    const formatTel = (number: string): string => {
        const value = number.replace(/\D/g, "");

        return value.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
    };

    return(
        <div className="min-h-screen w-full flex justify-center items-center">
            <div className='w-full max-w-4xl flex flex-col gap-4'>
                        <div className='w-full flex justify-start'>
                            <Button disabled={isUpdating} onClick={() => navigate("/")} sx={{p: 0,minWidth: 0, margin: 0}} startIcon={<ArrowBackIcon />}></Button>
                            <p>Voltar para lista</p>
                        </div>

                        <Paper elevation={4} className='gap-8 flex flex-col p-8 rounded-2xl w-full w-full border border-gray-200 '>
                            <div className='flex flex-col gap-1 items-start'>
                                <Typography variant='h5'color='text.primary'  fontWeight={700}>Edição do Voluntário</Typography>
                                <Typography variant='body2' color='text.secondary'>Atualize os campos que deseja</Typography>                     
                            </div>

                            <form style={style} className="flex flex-col" onSubmit={handleSubmit(fetchVolunteerUpdate)}>

                                {isLoadingVolunteer ? (
                                    <div className="py-8 flex justify-center items-center w-full">
                                        <Typography variant="body1">Buscando dados do voluntário...</Typography>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex flex-col sm:flex-row gap-4 w-full">
                                        <TextField
                                            label="Nome"
                                            required
                                            {...register("name")}
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                            fullWidth
                                            placeholder='Nome Completo'
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "12px",
                                                },
                                            }}
                                        />

                                        <TextField
                                            label="Email"
                                            required
                                            {...register("email")}
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            fullWidth
                                            placeholder='email@exemplo.com'
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "12px",
                                                },
                                            }}
                                        />
                                        </div>

                                        <div className="flex flex flex-col sm:flex-row w-full gap-4">
                                            <TextField
                                                label="Telefone"
                                                fullWidth
                                                required
                                                placeholder="(99) 9999-9999"
                                                {...register("fone")}
                                                error={!!errors.fone}
                                                helperText={errors.fone?.message}
                                                onChange={(e) => {
                                                    e.target.value = formatTel(e.target.value);
                                                }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "12px",
                                                    },
                                                }}
                                            />

                                            <Controller
                                                name="position"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <TextField
                                                        select
                                                        required
                                                        label="Cargo"
                                                        fullWidth
                                                        {...field}
                                                        error={!!errors.position}
                                                        helperText={errors.position?.message}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: "12px",
                                                            },
                                                        }}
                                                        >
                                                        {listPosition.map((position) => (
                                                                <MenuItem key={position} value={position}>{position}</MenuItem>
                                                            ))}
                                                    </TextField>
                                                )}
                                            />
                                        </div>

                                        <div className="flex flex flex-col sm:flex-row w-full gap-4">
                                            <div className='sm:w-1/2 w-full'>
                                                <Controller
                                                name="availability" 
                                                defaultValue=""                                    
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        select
                                                        required                
                                                        label="Disponibilidade"
                                                        fullWidth
                                                        {...field}
                                                        error={!!errors.availability}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: "12px",
                                                            },
                                                        }}
                                                        helperText={errors.availability?.message}
                                                        >
                                                            {listAvailability.map((availability) => (
                                                                <MenuItem key={availability} value={availability}>{availability}</MenuItem>
                                                            ))} 
                                                    </TextField>
                                                )}
                                            />
                                            </div>             
                                        </div>      

                                        <div className="flex justify-end gap-3 pt-4 border-t">
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            disabled={isUpdating}
                                            onClick={() => reset()}
                                            sx={{
                                                borderRadius: 3,
                                                textTransform: "none",
                                                px: 3,
                                                py: 1.2,
                                            }}>
                                        Cancelar
                                        </Button>

                                        <Button
                                            variant="contained"
                                            type='submit'
                                            disabled={isUpdating}
                                            sx={{
                                                borderRadius: 3,
                                                textTransform: "none",
                                                px: 3,
                                                py: 1.2,
                                            }}>
                                        {isUpdating ? (
                                            <CircularProgress size={24} color="inherit" />
                                            ) : (
                                            "Atualizar Voluntário"
                                            )}
                                        </Button>
                                        </div>
                                    </>
                                    
                                )}

                            </form>
                        </Paper>
            </div>

            {alert && (
                <Box
                sx={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1301,
                    pointerEvents: "none",
                }}
                >
                {alert}
                </Box>
            )}
        </div>
    )

}

export default VolunteerEdit
