import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useFavStatusQuery = function (id: string) {
  const { authToken } = useAuth();
  // Queries
  const query = useQuery({
    queryKey: [`works:fav:${id}`],
    queryFn: async () => {
      const response = await fetch(`/api/works/${id}/fav`, {
        method: "GET",
        headers: {
          authToken,
        },
      });
      return await response.json();
    },
  });

  return query;
};
