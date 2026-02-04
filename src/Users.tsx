import { useQuery } from "@tanstack/react-query";
import { sleep } from "./sleep";
import { useState } from "react";

interface IUser {
  id: string;
  name: string;
  email: string;
}

export function Users() {
  /*
    A propriedade enabled é "reativa" então podemos passar um state para ela
  */
  // const [enabled, setEnabled] = useState(false);

  const { data, isLoading, refetch, isPending, isFetching } = useQuery({
    // enabled: false, estou dizendo para o react-query que essa queryFn mão deve ser executada, para que não execute assim que o componente seja montado
    enabled: false,
    queryKey: ["users"],
    queryFn: async (): Promise<IUser[]> => {
      await sleep();
      const response = await fetch("http://localhost:3000/users");

      return response.json();
    },
  });

  return (
    <div className="p-4">
      <button
        className="bg-white text-black px-4 py-2 rounded-lg block"
        type="button"
        onClick={() => refetch()}
        // onClick={() => setEnabled(true)}
      >
        listar usuarios
      </button>
      {isLoading && <h1>Carregando...</h1>}
      {!isLoading && isFetching && <small>Fetching...</small>}
      {data?.map((user) => (
        <div key={user.id}>
          <strong className="block">{user.name}</strong>
          <small>{user.email}</small>
        </div>
      ))}
    </div>
  );
}
