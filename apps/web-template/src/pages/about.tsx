import { useQuery } from "@tanstack/react-query";
import { Link } from "fsr";
import { Spinner } from "ui";
import { trpc } from "../utils/trpc";

export default function AboutPage() {
  const helloQuery = useQuery(
    ["protectedHello"],
    async () =>
      await trpc.example.protectedHello.query({
        number: 40,
      })
  );

  return (
    <div className="bg-slate-900 flex flex-col justify-center items-center h-screen text-white gap-3">
      <div className="font-bold">Nothing here lmao</div>
      <a
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        target="_blank"
        rel="noreferrer"
        className="font-black text-xl underline"
      >
        Just please do not click this link
      </a>
      <Link to="/">
        <p className="underline">Get back to Home Page</p>
      </Link>
      <div>
        {helloQuery.status === "success" ? (
          JSON.stringify(helloQuery.data, null, 2)
        ) : (
          <p>
            Not sign in. Click{" "}
            <a
              className="text-blue-500 underline font-bold"
              target="_blank"
              rel="noreferrer noopener"
              href="http://localhost:3000"
            >
              here
            </a>{" "}
            to sign in
          </p>
        )}
      </div>
    </div>
  );
}
