import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, type CSSProperties } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../shared/context/context';


const VolunteerCreate = () => {
    const navigate = useNavigate();
    const {listaCargos} = useContext(AppContext);
    const {listaDisponibilidade} = useContext(AppContext)

    const style: CSSProperties = {
        width: "100%",
        boxSizing: "border-box",
        gap: "1rem",
        display: "flex",
        flexDirection: "column",
    };

    const schema = yup.object({
        nome: yup.string().required("O nome é obrigatório"),
        email: yup.string().email("Email inválido").required("O email é obrigatório"),
        telefone: yup.string().test("telefone-valido", "Formato: (99) 9999-9999", (value) => {if (!value) return true; return /^\(\d{2}\)\s\d{4}-\d{4}$/.test(value);}).required(),
        cargo: yup.string().required("O celular é obrigatório"),
        disponibilidade: yup.string().required("Disponibilidade é obrigatorio")
    })

    interface formularioData {
        email: string
        nome: string
        telefone: string
        cargo: string
        disponibilidade: string
    }


    const {register,handleSubmit,reset, control,formState: { errors },} = useForm<formularioData>({ resolver: yupResolver(schema) });

    const formatarTel = (numero: string): string => {
        const valor = numero.replace(/\D/g, "");

        return valor.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
    };

    const voltarTela = () =>{
        navigate("/")
    }

    return(
        <div className="min-h-screen w-full flex justify-center items-center">
            <div className='w-full max-w-4xl flex flex-col gap-4'>
                        <div className='w-full flex justify-start'>
                            <Button  onClick={() => voltarTela()} sx={{p: 0,minWidth: 0, margin: 0}} startIcon={<ArrowBackIcon />}></Button>
                            <p>Voltar para lista</p>
                        </div>

                        <Paper elevation={4} className='gap-8 flex flex-col p-8 rounded-2xl w-full w-full border border-gray-200 '>
                            <div className='flex flex-col gap-1 items-start'>
                                <Typography variant='h5'color='text.primary'  fontWeight={700}>Novo Voluntário</Typography>
                                <Typography variant='body2' color='text.secondary'>Preencha os dados para cadastrar um novo voluntário</Typography>                     
                            </div>

                            <form style={style}className="flex flex-col">
                                <div className="flex flex flex-col sm:flex-row gap-4 w-full">
                                    <TextField
                                        label="Nome"
                                        required
                                        {...register("nome")}
                                        error={!!errors.nome}
                                        helperText={errors.nome?.message}
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
                                        {...register("telefone")}
                                        error={!!errors.telefone}
                                        helperText={errors.telefone?.message}
                                        onChange={(e) => {
                                            e.target.value = formatarTel(e.target.value);
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "12px",
                                            },
                                        }}
                                    />

                                    <Controller
                                        name="cargo"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                select
                                                required
                                                label="Cargo"
                                                fullWidth
                                                defaultValue="cozinha"
                                                {...field}
                                                error={!!errors.cargo}
                                                helperText={errors.cargo?.message}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "12px",
                                                    },
                                                }}
                                                >
                                                {listaCargos.map((cargo) => (
                                                        <MenuItem key={cargo} value={cargo}>{cargo}</MenuItem>
                                                    ))}
                                            </TextField>
                                        )}
                                    />
                                </div>

                                <div className="flex flex flex-col sm:flex-row w-full gap-4">
                                    <div className='sm:w-1/2 w-full'>
                                        <Controller
                                        name="disponibilidade"                                     
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                select
                                                required                
                                                label="Disponibilidade"
                                                fullWidth
                                                {...field}
                                                error={!!errors.disponibilidade}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "12px",
                                                    },
                                                }}
                                                helperText={errors.disponibilidade?.message}
                                                >
                                                    {listaDisponibilidade.map((turno) => (
                                                        <MenuItem key={turno} value={turno}>{turno}</MenuItem>
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
                                    sx={{
                                        borderRadius: 3,
                                        textTransform: "none",
                                        px: 3,
                                        py: 1.2,
                                    }}>
                                Cadastrar Voluntário
                                </Button>
                                </div>
                            </form>
                        </Paper>
            </div>
        </div>
    )

}

export default VolunteerCreate
