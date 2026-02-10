import { useMutation } from "@tanstack/react-query";
import type { IUser } from "./useUsers";
import { sleep } from "../sleep";

export function useCreateUser() {
  const { mutateAsync, isPending, data, error } = useMutation({
    mutationFn: async ({
      name,
      email,
    }: {
      name: string;
      email: string;
    }): Promise<IUser> => {
      await sleep();
      // throw new Error("Deu ruim na mutation");
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      return response.json();
    },
    onError: (error, variables) => {
      console.log(
        `Error na request.\n${error.toString()}\nvariables:`,
        variables,
      );
    },
    onSuccess: (data, variables) => {
      console.log("onSuccess: ", { data, variables });
    },
    onSettled: () => {
      //seu comportamento se assemelha ao finally do try catch, ele vai ser executado independete
      // se tiver dado sucesso ou erro
      console.log("onSettled -> terminou a execucao!");
    },
  });

  return {
    createUser: mutateAsync,
    isPending,
    data,
    error,
  };
}
