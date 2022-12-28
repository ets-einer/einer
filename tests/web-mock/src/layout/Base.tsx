import { Sidebar } from "../pages";

export default function Base({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-screen flex">
      <Sidebar />
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}