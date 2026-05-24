import { apiClient } from './apiClient';
import type { ICreateVolunteerInput } from '../pages/interfaces/ICreateVolunteerInput';
import type { IUpdateVolunteer } from '../pages/interfaces/IUpdateVolunteer';
import type { IVolunteer } from '../pages/interfaces/IVolunteer';
import type { IVolunteerPageOutput } from '../pages/interfaces/IVolunteerPageOutput';


export const createVolunteerApi = async (data: ICreateVolunteerInput) => {
  const response = await apiClient.post('/volunteer-create', data);
  return response.data;
};

export const getVolunteersApi = async (page: number): Promise<IVolunteerPageOutput> => {
  const response = await apiClient.get(`/volunteer-list?page=${page}&limit=5`);
  return response.data;
};

export const updateVolunteerApi = async ({ id, data }: { id: number; data: IUpdateVolunteer }) => {
  const response = await apiClient.put(`/volunteer-update/${id}`, data);
  return response.data;
};

export const delVolunteerApi = async ({ id }: { id: number}) => {
  const response = await apiClient.delete(`/volunteer-del/${id}`);
  return response.data;
};

export const getVolunteerByIdApi = async (id: number): Promise<IVolunteer> => {
  const response = await apiClient.get(`/volunteer/${id}`);
  return response.data;
};