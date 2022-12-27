import { useQuery } from "@tanstack/react-query";
import { Link } from "fsr";
import { Button, Spinner } from "ui";

function HomePage() {
  const { data, isLoading, isError } = useQuery(["me"], () =>
    fetch(`${import.meta.env.VITE_SERVICE_AUTH_URL}/me`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
    }).then((res) => res.json())
  );

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error!</div>;

  return (
    <div className="bg-indigo-900 flex flex-col justify-center items-center h-screen text-white gap-3">
      <h1 className="text-3xl font-bold">Web Common Home</h1>
      <p>{JSON.stringify(data, null, 2)}</p>

      <div className="flex gap-4">
        {"user" in data ? (
          <Link to="/signout">
            <Button>Sign Out</Button>
          </Link>
        ) : (
          <Link to="/signin">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomePage;
