import { useContext, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Button, Card, CardContent, Chip, Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVolunteers } from '../hooks/useVolunteers';
import { AppContext } from '../shared/context/context';
import alertMessage from '../shared/components/alertMessage';
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { IVolunteer } from './interfaces/IVolunteer';


const VolunteersList = () => {
  const navigate = useNavigate();
  const {volunteers, isLoading, deleteMutation, isDeleting, isUpdating, total} = useVolunteers();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [positionFilter, setPositionFilter] = useState('todos');
  const [availabilityFilter, setAvailabilityFilter] = useState('todos');
  const {listPosition} = useContext(AppContext);
  const {listAvailability} = useContext(AppContext);
  const [alert, setAlert] = useState<React.ReactNode | null>(null);

  interface NavigationState {
    feedbackMessage?: string;
    feedbackType?: 'success' | 'error';
  }

  const location = useLocation();
  const state = location.state as NavigationState;

  useEffect(() => {
    if (location.state?.feedbackMessage) {
      const type = location.state.feedbackType;
      const message = location.state.feedbackMessage;

      setAlert(
        alertMessage(
          message, 
          type, 
          type === "success" ? <CheckCircleIcon /> : <ReportProblemIcon />
        )
      );

      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location]);

  const pageEditVolunteer = (id:number) =>{
      navigate(`/edit-volunteer/${id}`);
  }

  const softDeleteVolunteer = async (id:number) => {
      try{
          await deleteMutation.mutateAsync({ id }); 
      }catch(error){
          setAlert(alertMessage("Erro ao tentar inativar voluntário!","error",<ReportProblemIcon />))    
      }
  };

  return (
    <>
    <div className='min-h-screen w-full flex justify-center items-center'>
      <div className='w-full max-w-4xl flex flex-col gap-8 m-4'>
        <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-2'>
  <div className='flex flex-col items-start gap-1'>
      <Typography variant='h5' color='text.primary' fontWeight={700}>Gerenciamento de Voluntários</Typography>
      <Typography variant='body2' color='text.secondary'>Gerencie cadastros, visualize informações e acompanhe voluntários</Typography>
  </div>

  <Button
    variant="contained"
    onClick={() => navigate("/create-volunteer")}
    sx={{
      borderRadius: 3,
      textTransform: "none",
      px: 3,
      py: 1.2,
      width: {
      xs: "100%",
      sm: "auto",
    }
    }}
  >
    Novo Voluntário
  </Button>
        </div>

        <div className='flex flex-col gap-6'>
          <Paper elevation={1} className='w-full border border-gray-200'>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ p: 2 }}>
              <TextField
                  fullWidth
                  placeholder="Buscar por nome ou email"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>

                  <Select
                    label="Status"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                  >
                    <MenuItem value="todos">Todos os status</MenuItem>
                    <MenuItem value="ativo">Ativo</MenuItem>
                    <MenuItem value="inativo">Inativo</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Cargo</InputLabel>

                  <Select
                    label="Cargo"
                    value={positionFilter}
                    onChange={(event) => setPositionFilter(event.target.value)}
                  >
                    <MenuItem value={"todos"}>Todos os cargos</MenuItem>

                    {listPosition.map((position) => (
                      <MenuItem value={position}>{position}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Disponibilidade</InputLabel>

                  <Select
                    label="Disponibilidade"
                    value={availabilityFilter}
                    onChange={(event) => setAvailabilityFilter(event.target.value)}
                  >
                     <MenuItem value={"todos"}>Todas as disponibilidades</MenuItem>

                    {listAvailability.map((position) => (
                      <MenuItem value={position}>{position}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
            </Stack>
          </Paper>

          <TableContainer component={Paper} elevation={1} className='rounded-xl border border-gray-200 w-full overflow-x-auto max-h-[500px] overflow-y-auto'>
          <Table aria-label="simple table" className="min-w-[800px]" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Telefone</TableCell>
                <TableCell align="left">Cargo</TableCell>
                <TableCell align="left">Disponibilidade</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Data de Incrição</TableCell>
                <TableCell align="left">Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

            {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className='min-h-[200px] w-full flex justify-center items-center'>
                      <Typography variant='h6' color='text.primary'>
                        Carregando...
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (() => {
                  const filterVolunteers = volunteers.filter((volunteer: IVolunteer) =>{
                    if (!searchTerm && !statusFilter && !positionFilter && !availabilityFilter) {
                      return true;
                  }

                  const filterTerm = volunteer.name?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || volunteer.email?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
                  const filterStatus = statusFilter === "todos" ? true : statusFilter === "ativo" ? volunteer.status === true : volunteer.status === false
                  const filterPosition = positionFilter === "todos" ? true : volunteer.position?.toLocaleLowerCase().includes(positionFilter.toLocaleLowerCase())
                  const filterAvali = availabilityFilter === "todos" ? true : volunteer.availability?.toLowerCase().includes(availabilityFilter.toLocaleLowerCase())

                  const filters = filterTerm && filterStatus && filterPosition && filterAvali

                  return filters
              });

              if (filterVolunteers.length === 0) {
                return (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Box sx={{ py: 4, display: 'flex', flexDirection: 'col', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <Typography variant='body1' color='text.secondary' fontWeight={500}>
                          Nenhuma informação encontrada
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              }
          
              return filterVolunteers.map((volunteer: IVolunteer) => (   
                <TableRow
                  key={volunteer.id}
                >
                  <TableCell component="th" scope="row">
                    {volunteer.email}
                  </TableCell>
                  <TableCell align="right">{volunteer.fone}</TableCell>
                  <TableCell align="right">{volunteer.position}</TableCell>
                  <TableCell align="right">{volunteer.availability}</TableCell>
                  <TableCell  align="right">
                    <span className={`
                      p-1 
                      text-xs 
                      font-semibold 
                      rounded-full
                      ${volunteer.status 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}>
                      {volunteer.status ? "Ativo" : "Inativo"}
                    </span> 
                  </TableCell>
                  <TableCell align="right">{new Date(volunteer.data_inscricao + "Z").toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton disabled={isDeleting || isUpdating} onClick={() => pageEditVolunteer(volunteer.id)} size="small">
                        <EditOutlinedIcon  fontSize="small" />
                      </IconButton>
                      {volunteer.status === true ? (
                        <IconButton disabled={isDeleting || isUpdating} onClick={() => softDeleteVolunteer(volunteer.id)} size="small">
                          <CloseOutlinedIcon fontSize="small" />
                        </IconButton>
                      ) : (
                          <IconButton disabled size="small">
                            <CloseOutlinedIcon fontSize="small" />
                          </IconButton>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))})()}
            </TableBody>
          </Table>
          </TableContainer>

          <Typography variant="body2" color="text.secondary" className="p-2">
            Mostrando {volunteers.length} de {total} voluntários
          </Typography>

        </div>
      </div>

      {alert  && (
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
    </>
  )
}

export default VolunteersList