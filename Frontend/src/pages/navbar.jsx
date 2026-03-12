import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../stores/api";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.get("/user/logout");
    navigate("/");
  };

  const baseStyle = "px-5 py-2 border border-white/20 rounded-lg transition";

  const activeStyle = "bg-indigo-500 text-white border-indigo-500";

  const inactiveStyle = "hover:bg-white/10";

  return (
    <nav className="relative z-10 flex justify-between items-center px-10 py-6">
      {/* Logo */}
      <h1 className="text-2xl font-bold tracking-wide">
        Short<span className="text-indigo-400">Link</span>
      </h1>

      {/* Navigation */}
      <div className="flex gap-4">
        <NavLink
          to="/shorten"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Shortener
        </NavLink>

        <NavLink
          to="/clicks"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Track Click
        </NavLink>

        <button
          onClick={handleLogout}
          className="px-5 py-2 border border-white/20 rounded-lg transition hover:bg-red-600 hover:border-red-600 hover:text-white"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
