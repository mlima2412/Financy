import { Outlet } from "react-router-dom";
import { Header } from "./header";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-[48px]">
        <Outlet />
      </main>
    </div>
  );
}
