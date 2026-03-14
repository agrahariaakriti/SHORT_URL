import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import CountUp from "react-countup";
import api from "../stores/api";

const ClickTracker = () => {
  const [url, setUrl] = useState("");
  const [clicks, setClicks] = useState(null);
  const [error, setError] = useState("");
  const [tracking, setTracking] = useState(false);

  const fetchClicks = async () => {
    const code = url.split("/").pop();

    if (!code) {
      setError("Please enter a valid short URL");
      setClicks(null);
      return;
    }

    try {
      setError("");
      const response = await api.get(`/url/clicks/${code}`);
      setClicks(response.data.count);
    } catch (err) {
      const message =
        err?.response?.data?.msg ||
        err?.response?.data?.error ||
        "Something went wrong";

      if (message === "Unauthorized" || message === "Token Expired") {
        const res = await api.get("/user/refresh");
        if (res.data.msg === "Invalid Refresh Token") navigate("/signin");
        else handleShorten(e);
      }

      setError("Unable to fetch clicks. Check your link.");
      setClicks(null);
    }
  };

  const handleTrack = async () => {
    await fetchClicks();
    setTracking(true);
  };

  useEffect(() => {
    if (!tracking) return;

    const interval = setInterval(fetchClicks, 5000);
    return () => clearInterval(interval);
  }, [tracking, url]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      <Navbar />

      {/* grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* glow background */}
      <div className="absolute w-[300px] sm:w-[450px] md:w-[700px] h-[300px] sm:h-[450px] md:h-[700px] bg-indigo-600/30 blur-[160px] rounded-full top-[-150px] left-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 py-12 sm:py-20 w-full">
        <div className="w-full max-w-5xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
            Click <span className="text-indigo-400">Tracker</span>
          </h1>

          <p className="text-gray-400 text-center mb-8 sm:mb-12 text-sm sm:text-base">
            Paste your short link to see how many people have visited it.
          </p>

          {/* input card */}
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 mb-8 sm:mb-12">
            <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Paste your short link here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 outline-none text-sm sm:text-base break-all"
                />

                <button
                  className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold w-full sm:w-auto"
                  onClick={handleTrack}
                >
                  Track
                </button>
              </div>

              <p className="text-gray-500 text-xs sm:text-sm mt-3 break-all">
                Example: https://shortlink.io/abc123
              </p>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center mb-6 text-sm">{error}</p>
          )}

          {clicks !== null && (
            <>
              {/* stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
                <div className="p-5 sm:p-6 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-sm">Total Clicks</p>
                  <p className="text-3xl font-bold text-indigo-400 mt-2">
                    <CountUp end={clicks} duration={1.5} />
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-sm">Clicks Today</p>
                  <p className="text-3xl font-bold text-indigo-400 mt-2">--</p>
                </div>

                <div className="p-5 sm:p-6 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-sm">Last Click</p>
                  <p className="text-3xl font-bold text-indigo-400 mt-2">--</p>
                </div>
              </div>

              {/* graph section */}
              <div className="p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 mb-10">
                <div className="bg-black/90 rounded-2xl p-5 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-semibold mb-6">
                    Click Activity
                  </h3>

                  <div className="h-36 sm:h-48 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-500 text-xs sm:text-sm text-center px-4">
                    Click timeline graph will appear here...(developing 😊)
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClickTracker;
