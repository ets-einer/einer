import { Link } from "fsr";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "ui";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const { mutate } = useMutation(
    ["signIn"],
    () =>
      fetch(`${import.meta.env.VITE_SERVICE_AUTH_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({ email, password: pwd }),
        credentials: "include",
      }).then((res) => res.json()),
    {
      onSuccess: (res) => {
        console.log(res);
        const callBackUrl = searchParams.get("callbackUrl");
        if (callBackUrl) {
          window.location.href = callBackUrl;
        } else {
          navigate("/");
        }
      },
      onError: (err) => alert(JSON.stringify(err, null, 2)),
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="bg-slate-900 flex flex-col justify-center items-center h-screen text-white gap-3">
      <h1 className="text-3xl font-bold">Sign In</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          className="text-black"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="pwd">Password</label>
        <input
          className="text-black"
          type="password"
          id="pwd"
          name="pwd"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />

        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}
