import { Link } from "fsr";
import { useLocation } from 'react-router-dom'
import Base from "../layout/Base";

function HomePage() {
  return (
    <Base>
      <div className="bg-indigo-900 flex flex-col justify-center items-center h-screen text-white gap-3">
        <h1 className="text-3xl font-bold">Web Mocks</h1>
        <h2 className="font-semibold">Conjunto de mocks para testes que necessitam de um browser</h2>
      </div>
    </Base>
  );
}

export function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "Home", link: "/" },
    { name: "S3 Client Image up.", link: "/mocks/s3-client-mock" },
    { name: "S3 Client File up.", link: "/mocks/s3-client-file-mock" },
    { name: "S3 Client Retrieve", link: "/mocks/s3-client-retrieve-file" },
    { name: "Auth", link: "/mocks/auth-client-mock" },
  ];

  return (
    <div className="w-[10vw] box-border p-2">
      {menus?.map((menu, i) => (
        <Link to={menu.link} key={i}>
          <h2 className={
            menu.link === location.pathname
             ? "font-semibold text-blue-600"
              : ""
          }>{menu.name}</h2>
        </Link>
      ))}
    </div>
  );
}

export default HomePage;
