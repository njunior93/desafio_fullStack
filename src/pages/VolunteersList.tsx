import { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate } from 'react-router-dom';
import { useVolunteers } from '../hooks/useVolunteers';
import { AppContext } from '../shared/context/context';

const VolunteersList = () => {
  const navigate = useNavigate();
  const {volunteers, isLoading} = useVolunteers();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [positionFilter, setPositionFilter] = useState('todos');
  const [availabilityFilter, setAvailabilityFilter] = useState('todos');
  const {listPosition} = useContext(AppContext);
  const {listAvailability} = useContext(AppContext);

  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
      <div className='w-full max-w-4xl flex flex-col gap-8 m-4'>
        <div className='w-full flex flex-row justify-between items-center'>
          <div className='flex flex-col items-start gap-1'>
              <Typography variant='h5'color='text.primary' fontWeight={700}>Gerenciamento de Voluntários</Typography>
              <Typography variant='body2'color='text.secondary'>Gerencie cadastros, visualize informações e acompanhe voluntários</Typography>
          </div>

          <Button
            variant="contained"
            onClick={() => navigate("/create-volunteer")}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              px: 3,
              py: 1.2,
            }}
          >
            Novo Voluntário
          </Button>
        </div>

        <div className='flex flex-col gap-6'>
          <Paper elevation={1} className='w-full border border-gray-200'>
            <Stack direction="row" spacing={2} sx={{ p: 2 }}>
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

          <TableContainer component={Paper} elevation={1} className='rounded-xl border border-gray-200'>
          <Table aria-label="simple table">
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
              ) : (    
              volunteers.filter((volunteer) =>{
                if (!searchTerm && !statusFilter && !positionFilter && !availabilityFilter) {
                  return true;
                }

                const filterTerm = volunteer.name?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || volunteer.email?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
                const filterStatus = statusFilter === "todos" ? true : statusFilter === "ativo" ? volunteer.status === true : volunteer.status === false
                const filterPosition = positionFilter === "todos" ? true : volunteer.position?.toLocaleLowerCase().includes(positionFilter.toLocaleLowerCase())
                const filterAvali = availabilityFilter === "todos" ? true : volunteer.availability?.toLowerCase().includes(availabilityFilter.toLocaleLowerCase())

                return filterTerm && filterStatus && filterPosition && filterAvali

              }).map((volunteer) => (
                <TableRow
                  key={volunteer.id}
                >
                  <TableCell component="th" scope="row">
                    {volunteer.email}
                  </TableCell>
                  <TableCell align="right">{volunteer.fone}</TableCell>
                  <TableCell align="right">{volunteer.position}</TableCell>
                  <TableCell align="right">{volunteer.availability}</TableCell>
                  <TableCell  align="right" sx={{
                      bgcolor: volunteer.status ? 'success.main' : 'grey.300',
                      color: volunteer.status ? 'common.white' : 'text.secondary',
                    }}
                  >
                    {volunteer.status ? "Ativo" : "Inativo"}
                  </TableCell>
                  <TableCell align="right">{new Date(volunteer.data_inscricao + "Z").toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton size="small">
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <CloseOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default VolunteersList