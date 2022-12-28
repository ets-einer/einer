import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const signOut = () => (
  fetch(`${import.meta.env.VITE_SERVICE_AUTH_URL}/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
    credentials: "include",
  }).then((res) => res.json())
)


export default function SignOutPage() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate } = useMutation(
    ["signOut"],
    signOut,
    {
      onSuccess: (res) => {
        // TODO: Notify user
        const callBackUrl = searchParams.get("callbackUrl");
        if (callBackUrl) {
          window.location.href = callBackUrl;
        } else {
          navigate("/");
        }
      },
      onError: (err) => {
        // TODO: Notify user (beautifully)
        alert(JSON.stringify(err, null, 2));
        console.error(err);
      },
    }
  );

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <div className="bg-slate-900 flex flex-col justify-center items-center h-screen text-white gap-3">
      <h1 className="text-3xl font-bold">Signing out...</h1>
    </div>
  );
}
