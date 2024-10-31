import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useFavStatusMutation = function () {
  const queryClient = useQueryClient();
  const { authToken } = useAuth();

  // Queries
  const query = useMutation({
    mutationFn: async (favStatus: { id: string; status: boolean }) => {
      const { id, status } = favStatus;
      const response = await fetch(`/api/works/${id}/fav`, {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
          authToken,
        },
        cache: "default",
        body: JSON.stringify({ status }),
      });
      return await response.json();
    },
    onSuccess: (data: any, variables: any) => {
      queryClient.setQueryData([`works:fav:${variables.id}`], variables.status);
      queryClient.invalidateQueries({ queryKey: ["favs"] });
    },
  });

  return query;
};
