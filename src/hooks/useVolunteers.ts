import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createVolunteerApi, getVolunteerByIdApi, getVolunteersApi, updateVolunteerApi, delVolunteerApi } from '../api/volunteers';
import { useState } from 'react';
import type { IVolunteerPageOutput } from '../pages/interfaces/IVolunteerPageOutput';

 export function useVolunteerById(id: number | null) {
    return useQuery({
      queryKey: ['volunteer', id],
      queryFn: () => getVolunteerByIdApi(id!),
      enabled: !!id,
    });
  }

export function useVolunteers() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);


  const { data: paginationData, isLoading, error: queryError } = useQuery<IVolunteerPageOutput>({
  queryKey: ['volunteers', page],
  queryFn: () => getVolunteersApi(page),
  });

  const volunteers = paginationData?.items ?? [];

  const createMutation = useMutation({
    mutationFn: createVolunteerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateVolunteerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] });
    },
  });

   const deleteMutation = useMutation({
    mutationFn: delVolunteerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] });
    },
  });
 
  return {
    volunteers,
    isLoading,
    queryError,
    deleteMutation,
    createVolunteer: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
    updateVolunteer: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
    delVolunteerApi: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
    total: paginationData?.total || 0,
    page,
    setPage
  };
}