import { Box, Button, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState, type CSSProperties } from "react";
import { AppContext } from "../context/context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import type { IUpdateVolunteer } from "../../pages/interfaces/IUpdateVolunteer";
import { useVolunteerById, useVolunteers } from "../../hooks/useVolunteers";
import alertMessage from "../components/alertMessage";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalComponent = ({isOpen, onClose}: ModalComponentProps) =>{

    const { openModal, setOpenModal } = useContext(AppContext);
    const {updateVolunteer, isUpdating} = useVolunteers();
    const {selectedId} = useContext(AppContext);
    const [alert, setAlert] = useState<React.ReactNode | null>(null);
    const {listPosition} = useContext(AppContext);
    const {listAvailability} = useContext(AppContext)
    const { data: volunteerData, isLoading: isLoadingVolunteer } = useVolunteerById(selectedId);

    useEffect(() => {
        if (!alert) return;
    
        const timer = setTimeout(() => {
          setAlert(null);
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [alert]);

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
    },[])

    const style: CSSProperties = {
        width: "100%",
        boxSizing: "border-box",
        gap: "1rem",
        display: "flex",
        flexDirection: "column",
    };

    const styleModal = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: 500, // Evita que ele ocupe a tela inteira
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column' as 'column',
        gap: '1rem',
    };

    const schema = yup.object({
        name: yup.string().required("O nome é obrigatório"),
        email: yup.string().email("Email inválido").required("O email é obrigatório"),
        fone: yup.string().test("telefone-valido", "Formato: (99) 99999-9999", (value) => {if (!value) return true; return /^\(\d{2}\)\s\d{5}-\d{4}$/.test(value);}).required(),
        position: yup.string().required("O celular é obrigatório"),
        availability: yup.string().required("Disponibilidade é obrigatorio")
    })
    const {register,handleSubmit,reset, control,formState: { errors },} = useForm<IUpdateVolunteer>({ resolver: yupResolver(schema) });
    
    const fetchVolunteerUpdate = async (data: IUpdateVolunteer) =>{
      if(!selectedId) return;

        const newVolunteer = {
                name: data.name,
                email: data.email,
                fone: data.fone,
                position: data.position,
                availability: data.availability
            }
    
            try{
                await updateVolunteer({id: selectedId,data:newVolunteer})
                setAlert(alertMessage("Edição feita com sucesso!","success",<CheckCircleIcon/>))
                setTimeout(()=> setOpenModal(false), 1000)
                reset();
    
            }catch(error:any){
                  setAlert(alertMessage(`Erro ao cadastrar voluntário! ${error}`,"error",<ReportProblemIcon/>))
              }
    }

    const formatTel = (number: string): string => {
        const value = number.replace(/\D/g, "");

        return value.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
    };
    
    return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
      >
        <Box sx={styleModal}>
          <Typography
            variant='h5'color='text.primary' fontWeight={700}
          >
            "Editar Voluntário"
          </Typography>

            {isLoadingVolunteer ? (
                        <div className="py-8 flex justify-center items-center w-full">
                            <Typography variant="body1">Buscando dados do voluntário...</Typography>
                        </div>
                    ) : (
                        <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit(fetchVolunteerUpdate)}>
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <TextField
                                    label="Nome"
                                    required
                                    {...register("name")}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    fullWidth
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                                />

                                <TextField
                                    label="Email"
                                    required
                                    {...register("email")}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    fullWidth
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row w-full gap-4">
                                <TextField
                                    label="Telefone"
                                    fullWidth
                                    required
                                    {...register("fone")}
                                    error={!!errors.fone}
                                    helperText={errors.fone?.message}
                                    onChange={(e) => { e.target.value = formatTel(e.target.value); }}
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
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
                                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                                        >
                                            {listPosition.map((pos) => (
                                                <MenuItem key={pos} value={pos}>{pos}</MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row w-full gap-4">
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
                                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                                                helperText={errors.availability?.message}
                                            >
                                                {listAvailability.map((avail) => (
                                                    <MenuItem key={avail} value={avail}>{avail}</MenuItem>
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
                                    onClick={() => setOpenModal(false)}
                                    disabled={isUpdating}
                                    sx={{ borderRadius: 3, textTransform: "none", px: 3, py: 1.2 }}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    variant="contained"
                                    type='submit'
                                    disabled={isUpdating}
                                    sx={{ borderRadius: 3, textTransform: "none", px: 3, py: 1.2 }}
                                >
                                    {isUpdating ? "Salvando..." : "Salvar Alterações"}
                                </Button>
                            </div>
                        </form>
                    )}
                </Box>
            </Modal>

            {alert && (
                <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1301, pointerEvents: "none" }}>
                    {alert}
                </Box>
            )}
        </>
    );
};

export default ModalComponent;