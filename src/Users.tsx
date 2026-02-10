import { useUsers, type IUser } from "./hooks/useUsers";
import { useMutation } from "@tanstack/react-query";
import { sleep } from "./sleep";
import { useCreateUser } from "./hooks/useCreateUser";

export function Users() {
  /*
    A propriedade enabled é "reativa" então podemos passar um state para ela
  */
  // const [enabled, setEnabled] = useState(false);

  const {
    users,
    isLoading: isUserLoading,
    refetch,
    isFetching,
    error: userError,
  } = useUsers();

  const { createUser, isPending, data, error } = useCreateUser();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // pegando os valores do input de form uncontrolled. Para exemplificar como pegar os dados se tivesse fora do componente
    /*
      Tenha o seu mesmo tipo  -> as typeof event.currentTarget.elements
      E adicionei os inputs -> & {
      name: HTMLInputElement;
      email: HTMLInputElement;
    }
    */
    const element = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
    };

    console.log("Nome:", element.name.value);
    console.log("E-mail:", element.email.value);

    // Podemos utilizar estados mas o mais comum é utilizar uncontrolled values pois assum podemos garantir
    // que as informações estão corretas, pois podemos não ter controle por os estates estarem fora do escopo
    const { data } = await createUser({
      name: element.name.value,
      email: element.email.value,
    });
  }

  return (
    <div className="p-4">
      <div className="mb-10">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            className="outline-none rounded-md text-zinc-900 pl-2"
            placeholder="Nome"
            name="name"
          />
          <input
            className="outline-none rounded-md text-zinc-900 pl-2"
            placeholder="E-mail"
            name="email"
          />

          <button className="bg-blue-400 py-2 text-zinc-950 rounded-md">
            {isPending ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>

      <button
        className="bg-white text-black px-4 py-2 rounded-lg block"
        type="button"
        onClick={() => refetch()}
        // onClick={() => setEnabled(true)}
      >
        listar usuarios
      </button>
      {isUserLoading && <h1>Carregando...</h1>}
      {!isUserLoading && isFetching && <small>Fetching...</small>}
      {userError && <h1 className="text-red-400">{userError.toString()}</h1>}
      {users.map((user) => (
        <div key={user.id}>
          <strong className="block">{user.name}</strong>
          <small>{user.email}</small>
        </div>
      ))}
    </div>
  );
}
