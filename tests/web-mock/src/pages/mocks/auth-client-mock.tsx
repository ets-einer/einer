import Base from "../../layout/Base";

export default function AuthClientMock() {
  return (
    <Base>
      <div className="bg-indigo-900 flex flex-col justify-center items-center h-screen text-white gap-3">
        <h1 className="text-3xl font-bold">Web Mocks</h1>
        <h2 className="font-semibold">Conjunto de mocks para testes que necessitam de um browser</h2>
      </div>
    </Base>
  );
}