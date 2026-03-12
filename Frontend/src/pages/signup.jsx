import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../stores/api.js";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // added

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/user/signup", formData);
      navigate("/signin");
    } catch (err) {
      const message =
        err?.response?.data?.msg ||
        err?.response?.data?.error ||
        "Something went wrong";

      setError(message);
    }
  };

  return (
    <div className="h-screen bg-black text-white relative overflow-x-hidden overflow-y-auto">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Glow */}
      <div className="absolute w-100 h-100 md:w-137.5 md:h-137.5 bg-indigo-600/30 blur-[150px] rounded-full -top-50 left-1/2 -translate-x-1/2" />

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-6 md:px-10 py-3">
        <h1 className="text-xl md:text-2xl font-bold tracking-wide">
          Short<span className="text-indigo-400">Link</span>
        </h1>

        <Link
          to="/signin"
          className="px-4 py-1.5 border border-white/20 rounded-lg hover:bg-white/10 transition text-sm md:text-base"
        >
          Sign In
        </Link>
      </nav>

      {/* Main */}
      <div className="relative z-10 flex items-center justify-center px-4 py-4 md:py-6">
        <div className="w-full max-w-md p-px rounded-2xl bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500">
          <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-5 md:p-7">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-1">
              Create Account
            </h2>

            <p className="text-gray-400 text-center mb-4 text-sm md:text-base">
              Start shortening links instantly
            </p>

            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Error Alert */}
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm px-3 py-2 rounded-lg">
                  {error}
                </div>
              )}

              {/* Username */}
              <div>
                <label className="text-xs md:text-sm text-gray-400">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full mt-1 px-3 py-2 md:px-4 md:py-2.5 rounded-lg bg-black border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 outline-none"
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                  }}
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="text-xs md:text-sm text-gray-400">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full mt-1 px-3 py-2 md:px-4 md:py-2.5 rounded-lg bg-black border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 outline-none"
                  onChange={(e) => {
                    setFormData({ ...formData, fullname: e.target.value });
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs md:text-sm text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full mt-1 px-3 py-2 md:px-4 md:py-2.5 rounded-lg bg-black border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 outline-none"
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-xs md:text-sm text-gray-400">
                  Password
                </label>

                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 rounded-lg bg-black border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 outline-none"
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-gray-400 text-sm hover:text-white"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold mt-2"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-3">
              Already have an account?{" "}
              <Link to="/signin" className="text-indigo-400 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
