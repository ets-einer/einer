import { useQuery } from "@tanstack/react-query";
import { Link } from "fsr";
import { ButtonWebTemplate, Spinner } from "ui";

function HomePage() {
  const { data, isLoading, isError } = useQuery(["data"], () =>
    fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
      res.json()
    )
  );

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error!</div>;

  return (
    <div className="bg-indigo-900 flex flex-col justify-center items-center h-screen text-white gap-3">
      <h1 className="text-3xl font-bold">Just a Web Template</h1>
      <ButtonWebTemplate>Boop</ButtonWebTemplate>
      <Link to="/about">
        <h2 className="underline">Go to about page</h2>
      </Link>
    </div>
  );
}

export default HomePage;
