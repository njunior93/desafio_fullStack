import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createVolunteerApi, getVolunteersApi } from '../api/volunteers';

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

  return {
    volunteers,
    isLoading,
    queryError,
    createVolunteer: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
  };
}