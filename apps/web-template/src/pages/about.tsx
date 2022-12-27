import { useQuery } from "@tanstack/react-query";
import { Link } from "fsr";
import { trpc } from '../utils/trpc'

export default function AboutPage() {
  const helloQuery = useQuery(['protectedHello'], async () => (
    await trpc.example.protectedHello.query({
      number: 40
    })
  ))
  
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
      {JSON.stringify(helloQuery.data, null, 2)}
    </div>
  );
}
