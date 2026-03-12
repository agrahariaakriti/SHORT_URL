import React, { useState } from "react";
import Navbar from "./navbar";

const ClickTracker = () => {
  const [url, setUrl] = useState("");
  const [clicks, setClicks] = useState(null);
  const handleUrlClick = async () => {
    const code = url.split("/").pop();
    const response = await api.get("/url/clicks", { params: { code } });
  };
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow */}
      <div className="absolute w-[700px] h-[700px] bg-indigo-600/30 blur-[200px] rounded-full top-[-200px] left-[30%]" />

      <div className="relative z-10 flex flex-col items-center px-6 py-20 w-full">
        <div className="w-full max-w-5xl">
          {/* Title */}
          <h1 className="text-4xl font-bold mb-4 text-center">
            Click <span className="text-indigo-400">Tracker</span>
          </h1>

          <p className="text-gray-400 text-center mb-12">
            Paste your short link to see how many people have visited it and
            monitor its performance.
          </p>

          {/* Tracker Tool */}
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

                <button className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold">
                  Track
                </button>
              </div>

              <p className="text-gray-500 text-sm mt-3">
                Example: https://shortlink.io/abc123
              </p>
            </div>
          </div>

          {/* Results */}
          {clicks !== null && (
            <>
              {/* Metrics */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-sm">Total Clicks</p>
                  <p className="text-3xl font-bold text-indigo-400 mt-2">
                    {clicks}
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

              {/* Graph placeholder */}
              <div className="p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 mb-12">
                <div className="bg-black/90 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold mb-6">Click Activity</h3>

                  <div className="h-48 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-500">
                    Click timeline graph will appear here
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Info Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:scale-105 transition">
              <h4 className="font-semibold mb-2 text-indigo-400">
                Real-Time Tracking
              </h4>
              <p className="text-gray-400 text-sm">
                Instantly check how many users visited your short link.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:scale-105 transition">
              <h4 className="font-semibold mb-2 text-indigo-400">
                Performance Insights
              </h4>
              <p className="text-gray-400 text-sm">
                Measure how effective your shared links are.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:scale-105 transition">
              <h4 className="font-semibold mb-2 text-indigo-400">
                Advanced Analytics
              </h4>
              <p className="text-gray-400 text-sm">
                Soon you will see country, device and timeline analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickTracker;
