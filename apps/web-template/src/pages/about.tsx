import { Link } from "fsr";

export default function AboutPage() {
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
    </div>
  );
}
