import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#0f0f1a]">

      <Sidebar />

      <div className="flex-1 overflow-hidden">
        <div
          className="
          border-b
          border-white/10
          bg-white/5
          px-8
          py-5
          "
        >
          <h1 className="text-3xl font-bold text-white">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-white/40">
            Manage Users, Cities and Areas
          </p>
        </div>
        <div
          className="h-[calc(100vh-100px)] overflow-hidden p-8
          "
        >
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;