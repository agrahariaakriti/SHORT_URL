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
      console.log("HYYY in the fuunction");

      const response = await api.get(`/url/clicks/${code}`);
      setClicks(response.data.count);
      console.log("responnse", response);
    } catch (err) {
      const message =
        err?.response?.data?.msg ||
        err?.response?.data?.error ||
        "Something went wrong";
      console.error(err);
      if (message == "Unauthorized" || message == "Token Expired") {
        const res = await api.get("/user/refresh");
        if (res.data.msg == "Invalid Refresh Token") navigate("/signin");
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

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute w-[700px] h-[700px] bg-indigo-600/30 blur-[200px] rounded-full top-[-200px] left-[30%]" />

      <div className="relative z-10 flex flex-col items-center px-6 py-20 w-full">
        <div className="w-full max-w-5xl">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Click <span className="text-indigo-400">Tracker</span>
          </h1>

          <p className="text-gray-400 text-center mb-12">
            Paste your short link to see how many people have visited it.
          </p>

          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 mb-12">
            <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-8">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Paste your short link here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-black border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 outline-none"
                />

                <button
                  className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
                  onClick={handleTrack}
                >
                  Track
                </button>
              </div>

              <p className="text-gray-500 text-sm mt-3">
                Example: https://shortlink.io/abc123
              </p>
            </div>
          </div>

          {error && <p className="text-red-500 text-center mb-6">{error}</p>}

          {clicks !== null && (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-sm">Total Clicks</p>
                  <p className="text-3xl font-bold text-indigo-400 mt-2">
                    <CountUp end={clicks} duration={1.5} />
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-sm">Clicks Today</p>
                  <p className="text-3xl font-bold text-indigo-400 mt-2">--</p>
                </div>

                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-sm">Last Click</p>
                  <p className="text-3xl font-bold text-indigo-400 mt-2">--</p>
                </div>
              </div>

              <div className="p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 mb-12">
                <div className="bg-black/90 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold mb-6">Click Activity</h3>

                  <div className="h-48 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-500">
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
