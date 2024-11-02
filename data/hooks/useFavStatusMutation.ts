import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useFavStatusMutation = function () {
  const queryClient = useQueryClient();
  const { authToken } = useAuth();

  // Queries
  const query = useMutation({
    mutationFn: async (favStatus: { workId: string; status: boolean }) => {
      const { workId, status } = favStatus;
      return false;
    },
    onSuccess: (data: any, variables: any) => {
      queryClient.setQueryData([`works:fav:${variables.id}`], variables.status);
      queryClient.invalidateQueries({ queryKey: ["favs"] });
    },
  });

  return query;
};
