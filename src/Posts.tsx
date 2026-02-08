import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { sleep } from "./sleep";

interface IUser {
  id: string;
  name: string;
  email: string;
}

export function Posts() {
  const queryClient = useQueryClient();

  function handleMouseEnter() {
    queryClient.prefetchQuery({
      queryKey: ["users"],
      queryFn: async (): Promise<IUser[]> => {
        await sleep();
        const response = await fetch("http://localhost:3000/users");
        return response.json();
      },
    });
  }

  return (
    <div>
      <h1>Posts</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <br />
      <br />
      <Link to="/" onMouseEnter={handleMouseEnter}>
        Ir para os usuarios
      </Link>
    </div>
  );
}
