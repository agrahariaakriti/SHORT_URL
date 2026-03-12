import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow */}
      <div className="absolute w-[700px] h-[700px] bg-indigo-600/30 blur-[200px] rounded-full top-[-250px] left-[30%]" />

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          Short<span className="text-indigo-400">Link</span>
        </h1>

        <div className="flex gap-4">
          <Link
            to="/signin"
            className="px-5 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6">
        <div className="max-w-6xl grid md:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-5xl font-extrabold leading-tight mb-6">
              Turn Long Links Into
              <span className="text-indigo-400"> Short Powerful URLs</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8">
              Instantly shorten links, share them anywhere, and track every
              click with powerful analytics.
            </p>

            {/* CTA */}
            <div className="flex gap-5">
              <Link
                to="/signup"
                className="px-7 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
            <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">
                Sign in to shorten links
              </h3>

              <p className="text-gray-400 mb-6">
                Create short links and track analytics after logging in.
              </p>

              <Link
                to="/signin"
                className="inline-block px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
              >
                Sign In
              </Link>
            </div>
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

export default Home;
