import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-3xl font-bold mb-6">Welcome</h1>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;