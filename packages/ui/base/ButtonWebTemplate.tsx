import * as React from "react";

type ButtonProps = {
  children: React.ReactNode;
};

export const ButtonWebTemplate = ({ children }: ButtonProps) => {
  return (
    <button
      onClick={() => window.alert("Let's start building this from here!")}
      className="bg-blue-500 text-white font-bold px-5 py-2 rounded-sm hover:bg-blue-400"
    >
      {children}
    </button>
  );
};
