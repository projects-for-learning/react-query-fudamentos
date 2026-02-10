import { useQuery } from "@tanstack/react-query";
import { sleep } from "../sleep";

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export function useUsers() {
  const { data, isLoading, refetch, isFetching, error } = useQuery({
    // enabled: false, estou dizendo para o react-query que essa queryFn mão deve ser executada, para que não execute assim que o componente seja montado
    enabled: true,
    // refetchInterval: 1000,
    queryKey: ["users"],
    queryFn: async (): Promise<IUser[]> => {
      // throw new Error("deu error");
      await sleep();
      const response = await fetch("http://localhost:3000/users");

      return response.json();
    },
  });

  return {
    users: data ?? [],
    isLoading,
    refetch,
    isFetching,
    error,
  };
}
