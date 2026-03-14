import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../stores/api";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.get("/user/");
    navigate("/");
  };

  const baseStyle =
    "px-4 sm:px-5 py-2 border border-white/20 rounded-lg transition text-sm sm:text-base";

  const activeStyle = "bg-indigo-500 text-white border-indigo-500";

  const inactiveStyle = "hover:bg-white/10";

  return (
    <nav className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-8 py-4 sm:py-6">
      {/* Logo */}
      <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
        Short<span className="text-indigo-400">Link</span>
      </h1>

      {/* Navigation */}
      <div className="flex flex-wrap justify-center gap-3">
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
          className="px-4 sm:px-5 py-2 border border-white/20 rounded-lg transition hover:bg-red-600 hover:border-red-600 hover:text-white text-sm sm:text-base"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
