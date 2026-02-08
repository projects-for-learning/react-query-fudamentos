import { useUsers } from "./hooks/useUsers";

export function Users() {
  /*
    A propriedade enabled é "reativa" então podemos passar um state para ela
  */
  // const [enabled, setEnabled] = useState(false);

  const { users, isLoading, refetch, isFetching, error } = useUsers();

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
      {error && <h1 className="text-red-400">{error.toString()}</h1>}
      {users.map((user) => (
        <div key={user.id}>
          <strong className="block">{user.name}</strong>
          <small>{user.email}</small>
        </div>
      ))}
    </div>
  );
}
