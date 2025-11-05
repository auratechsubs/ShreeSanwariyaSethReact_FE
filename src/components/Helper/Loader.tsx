import React from "react";

const Loader = ({ text = "Loading...", fullHeight = true }) => {
  return (
    <section
      className={`relative flex flex-col items-center justify-center ${
        fullHeight ? "h-screen" : "h-[300px]"
      } bg-gradient-to-br from-black via-[#0b1b2b] to-[#00111f] text-white backdrop-blur-sm`}
    >
      {/* Rotating gradient ring */}
      <div className="relative w-24 h-24 mb-6">
        {/* Outer spinning border */}
        <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-[#0ea5e9] animate-spin"></div>

        {/* Inner soft gradient */}
        <div className="absolute inset-1 rounded-full bg-white from-white/10 to-transparent blur-[1px]" />

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/img/logo.png"
            alt="Shree Sanwariya Seth Logo"
            className="w-25 h-25 object-contain rounded-full animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>
      </div>

      {/* Loading text */}
      <p className="text-xl font-semibold tracking-wide animate-pulse text-white/90">
        {text}
      </p>
    </section>
  );
};

export default Loader;
