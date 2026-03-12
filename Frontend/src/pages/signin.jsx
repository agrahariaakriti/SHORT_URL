import { Link } from "react-router-dom";
import api from "../stores/api.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLoginData = async (e) => {
    e.preventDefault();

    try {
      await api.post("/user/signin", formData);
      navigate("/shorten");
    } catch (err) {
      console.log(err.response);

      const message =
        err?.response?.data?.msg ||
        err?.response?.data?.error ||
        "Login failed";

      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Glow */}
      <div className="absolute w-175 h-175 bg-indigo-600/30 blur-[200px] rounded-full -top-62.5 left-[30%]" />

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          Short<span className="text-indigo-400">Link</span>
        </h1>

        <Link
          to="/signup"
          className="px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
        >
          Sign Up
        </Link>
      </nav>

      {/* Sign In Card */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6">
        <div className="p-px rounded-2xl bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500 w-full max-w-md">
          <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Welcome Back
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleLoginData}>
              {/* Error Alert */}
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm px-3 py-2 rounded-lg">
                  {error}
                </div>
              )}

              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 outline-none"
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />

              <input
                type="password"
                placeholder="Password"
                className="px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 outline-none"
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />

              <button
                type="submit"
                className="mt-2 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
              >
                Sign In
              </button>
            </form>

            <p className="text-sm text-gray-400 mt-6 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-400 hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-gray-400 text-sm border-t border-white/10">
        © {new Date().getFullYear()} ShortLink
      </footer>
    </div>
  );
};

export default SignIn;
