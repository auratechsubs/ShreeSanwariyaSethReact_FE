import React from "react";

interface SectionLoaderProps {
  text?: string;
  height?: string; // e.g. "200px" or "300px"
}

const SectionLoader: React.FC<SectionLoaderProps> = ({
  text = "Loading...",
  height = "250px",
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center text-white backdrop-blur-sm bg-gradient-to-br from-black/40 via-[#0b1b2b]/50 to-[#00111f]/40 rounded-2xl shadow-md`}
      style={{ height }}
    >
      {/* Rotating gradient ring */}
      <div className="relative w-16 h-16 mb-3">
        {/* Outer spinning border */}
        <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-[#0ea5e9] animate-spin"></div>

        {/* Inner soft gradient */}
        <div className="absolute inset-1 rounded-full bg-white from-white/10 to-transparent blur-[1px]" />

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/img/logo.png"
            alt="Shree Sanwariya Seth Logo"
            className="w-12 h-12 object-contain rounded-full animate-pulse drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          />
        </div>
      </div>

      {/* Loading text */}
      <p className="text-base font-semibold tracking-wide animate-pulse text-white/90">
        {text}
      </p>
    </div>
  );
};

export default SectionLoader;
