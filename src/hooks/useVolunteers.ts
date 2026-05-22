import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createVolunteerApi, getVolunteerByIdApi, getVolunteersApi, updateVolunteerApi, delVolunteerApi } from '../api/volunteers';

 export function useVolunteerById(id: number | null) {
    return useQuery({
      queryKey: ['volunteer', id],
      queryFn: () => getVolunteerByIdApi(id!),
      enabled: !!id,
    });
  }

export function useVolunteers() {
  const queryClient = useQueryClient();

  const { data: volunteers = [], isLoading, error: queryError } = useQuery({
    queryKey: ['volunteers'],
    queryFn: getVolunteersApi,
  });

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
    createVolunteer: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
    updateVolunteer: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
    delVolunteerApi: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error
  };
}