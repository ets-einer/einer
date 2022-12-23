import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function SignOutPage() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate } = useMutation(
    ["signOut"],
    () =>
      fetch(`${import.meta.env.VITE_SERVICE_AUTH_URL}/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        credentials: "include",
      }).then((res) => res.json()),
    {
      onSuccess: (res) => {
        // alert(JSON.stringify(res, null, 2));
        const callBackUrl = searchParams.get("callbackUrl");
        if (callBackUrl) {
          window.location.href = callBackUrl;
        } else {
          navigate("/");
        }
      },
      onError: (err) => {
        alert(JSON.stringify(err, null, 2));
        console.log(err);
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
