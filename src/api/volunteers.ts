import { apiClient } from './apiClient';
import type { ICreateVolunteerInput } from '../pages/interfaces/ICreateVolunteerInput';
import type { IlistVolunteerOutput } from '../pages/interfaces/IListVolunteerOutput';


export const createVolunteerApi = async (data: ICreateVolunteerInput) => {
  const response = await apiClient.post('/volunteer-create', data);
  return response.data;
};

export const getVolunteersApi = async (): Promise<IlistVolunteerOutput[]> => {
  const response = await apiClient.get('/volunteer-list');
  return response.data;
};