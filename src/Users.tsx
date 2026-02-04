import { useQuery } from "@tanstack/react-query";

interface IUser {
  id: string;
  name: string;
  email: string;
}

export function Users() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<IUser[]> => {
      const response = await fetch("http://localhost:3000/users");

      return response.json();
    },
  });

  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>
          <strong className="block">{user.name}</strong>
          <small>{user.email}</small>
        </div>
      ))}
    </div>
  );
}
