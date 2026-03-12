import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../stores/api.js";
import Navbar from "./navbar.jsx";
import { useNavigate } from "react-router-dom";

const Shortener = () => {
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState(""); // added

  const handleShorten = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/url/shorturl", { url });
      console.log(response);

      setShortUrl(response.data.shorturl);
      setError("");
    } catch (err) {
      const message =
        err?.response?.data?.msg ||
        err?.response?.data?.error ||
        "Something went wrong";

      setError(message);
    }
  };

  const handleRedirect = async (e) => {
    e.preventDefault();

    try {
      const code = shortUrl.split("/").pop();
      console.log("Code .....", code);

      const data = await api.get(`/url/${code}`);
      console.log("hyyy babay ....", data);

      window.open(data.data.longurl, "_blank");
      setError("");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Redirect failed";

      setError(message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow */}
      <div className="absolute w-[700px] h-[700px] bg-indigo-600/30 blur-[200px] rounded-full top-[-250px] left-[30%]" />

      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6">
        <div className="max-w-3xl w-full p-px rounded-2xl bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500">
          <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-10">
            <h2 className="text-4xl font-bold text-center mb-4">
              Shorten Your URL
            </h2>

            <p className="text-gray-400 text-center mb-8">
              Paste your long URL below and generate a short link instantly
            </p>

            {/* Error Alert */}
            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500 text-red-400 text-sm px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleShorten}
              className="flex flex-col md:flex-row gap-4"
            >
              <input
                type="url"
                placeholder="Paste your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 outline-none"
              />

              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
              >
                Shorten
              </button>
            </form>

            {/* Result */}
            {shortUrl && (
              <div className="mt-8 bg-black border border-white/10 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="text-indigo-400 break-all">{shortUrl}</span>

                <div className="flex items-center gap-5">
                  <button
                    onClick={copyToClipboard}
                    className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition font-medium"
                  >
                    Copy
                  </button>

                  <button
                    onClick={handleRedirect}
                    className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition font-medium"
                  >
                    Redirect To
                  </button>
                </div>
              </div>
            )}
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

export default Shortener;
