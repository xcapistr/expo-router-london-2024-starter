import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useFavStatusQuery = function (id: string) {
  const { authToken } = useAuth();
  // Queries
  const query = useQuery({
    queryKey: [`works:fav:${id}`],
    queryFn: async () => {
      return false;
    },
  });

  return query;
};
