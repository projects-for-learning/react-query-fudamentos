import { useQuery } from "@tanstack/react-query";
import { sleep } from "./sleep";

interface IUser {
  id: string;
  name: string;
  email: string;
}

export function Posts() {
  // const { data } = useQuery({
  //   // enabled: false, estou dizendo para o react-query que essa queryFn mão deve ser executada, para que não execute assim que o componente seja montado
  //   enabled: true,
  //   staleTime: 5000,
  //   gcTime: 5000,
  //   queryKey: ["users"],
  //   queryFn: async (): Promise<IUser[]> => {
  //     await sleep();
  //     const response = await fetch("http://localhost:3000/users");

  //     return response.json();
  //   },
  // });

  return (
    <div>
      <h1>Posts</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
