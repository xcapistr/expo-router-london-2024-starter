import { useQuery } from "@tanstack/react-query";

const data = require("../api/cma_artwork.json");

export const useWorksForExhibitQuery = function (exhibitName: string) {
  // Queries
  const query = useQuery({
    queryKey: [`departments:${exhibitName}`],
    queryFn: async () => {
      return data.data.filter((item: any) => item.department === exhibitName);
    },
  });

  return query;
};
