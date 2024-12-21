import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg text-center">
        Welcome to <span className="text-yellow-400">AuthNexus</span>
      </h1>
      <p className="text-base md:text-lg lg:text-xl mb-8 text-center max-w-xl">
        Secure, seamless, and stylish authentication for your digital world. Get
        started now!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center w-full sm:w-auto">
        <Link
          href="/registation"
          className="w-full sm:w-auto px-8 py-2 text-center rounded-sm text-sm bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-transform transform hover:scale-105 shadow-lg"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="w-full sm:w-auto px-8 py-2 text-center rounded-sm text-sm bg-purple-700 hover:bg-purple-600 font-bold transition-transform transform hover:scale-105 shadow-lg"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Home;
