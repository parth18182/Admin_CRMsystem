import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="
      w-72
      min-h-screen
      border-r
      border-white/10
      bg-white/5
      p-5
      backdrop-blur-xl
      "
    >
      <h1 className="mb-10 text-3xl font-bold text-white">
        Admin CRM
      </h1>

      <div className="space-y-3">

        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `block rounded-xl px-4 py-3 transition-all ${isActive
              ? "bg-violet-600 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10"
            }`
          }
        >
          👤 Users
        </NavLink>
        <NavLink
          to="/dashboard/cities"
          className={({ isActive }) =>
            `block rounded-xl px-4 py-3 transition-all ${isActive
              ? "bg-violet-600 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10"
            }`
          }
        >
          🏙 Cities
        </NavLink>

        <NavLink
          to="/dashboard/areas"
          className={({ isActive }) =>
            `block rounded-xl px-4 py-3 transition-all ${isActive
              ? "bg-violet-600 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10"
            }`
          }
        >
          📍 Areas
        </NavLink>

        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            `block rounded-xl px-4 py-3 transition-all ${isActive
              ? "bg-violet-600 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10"
            }`
          }
        >
          📦 Products
        </NavLink>

      </div>
    </div>
  );
}

export default Sidebar;