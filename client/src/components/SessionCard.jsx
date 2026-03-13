import { motion } from "framer-motion";
import { useState } from "react";

const SessionCard = ({ session }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="relative h-[450px] w-full max-w-[320px] mx-auto cursor-pointer"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        animate={{
          rotateY: flipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 bg-[#f5f5f7] rounded-[2rem] p-8 flex flex-col items-center justify-between text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#b4befe]/20 blur-2xl rounded-full" />

          <div className="space-y-1 z-10">
            <span className="text-[#9ea0ad] font-bold text-[10px] uppercase tracking-[0.3em]">
              Session // {session.id.toString().padStart(2, "0")}
            </span>

            <h3 className="text-3xl font-black text-[#4c4f69] leading-tight">
              {session.title}
            </h3>
          </div>

          <div className="z-10">
            <div className="bg-[#b4befe]/10 text-[#7287fd] px-4 py-1 rounded-full text-medium font-bold mb-2">
              {session.dates}
            </div>

            <p className="text-medium font-medium italic">
              Monday — Friday
            </p>

            <p className="text-medium font-medium italic">
              9:00am — 12:35pm
            </p>
          </div>

          <div className="z-10 w-full">
            <div className="text-2xl font-black text-[#4c4f69]">
              $250
              <span className="text-sm font-light text-[#9ea0ad]">
                /wk
              </span>
            </div>

            <p className="mt-4 text-[#eba0ac] text-[10px] font-black uppercase tracking-widest">
              Tap to View Projects
            </p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-[#1e1e2e] border-2 border-[#b4befe]/20 rounded-[2rem] p-8 flex flex-col items-center justify-between text-center overflow-hidden shadow-2xl"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:20px_20px]" />

          <div className="w-full z-10">
            <h4 className="text-lg font-black text-[#cdd6f4] mb-6 flex items-center justify-center gap-3">
              <span className="h-[2px] w-6 bg-[#f5e0dc]" />
              Projects
              <span className="h-[2px] w-6 bg-[#f5e0dc]" />
            </h4>

            <ul className="space-y-3 text-left inline-block">
              {session.projects.map((proj, i) => (
                <li
                  key={i}
                  className="flex items-center text-lg text-[#a6adc8]"
                >
                  <span className="text-[#b4befe] mr-3 font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {proj}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[#585b70] text-[10px] font-bold uppercase tracking-[0.2em]">
            Tap to Return
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SessionCard;