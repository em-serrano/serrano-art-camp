import { motion } from "framer-motion";
import { useState } from "react";

const SessionCard = ({ session }) => {
  const [flipped, setFlipped] = useState(false);
  const [light, setLight] = useState({ x: 50, y: 50 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setLight({ x, y });
  };

  return (
    <motion.div
      onClick={() => setFlipped(!flipped)}
      onMouseMove={handleMove}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 180 }}
      className="relative h-[460px] w-full max-w-[320px] mx-auto cursor-pointer"
    >
      {/* spotlight */}
      <div
        className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(255,255,255,0.45), transparent 55%)`,
        }}
      />

      {/* CARD BODY */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >

        {/* FRONT */}
        <div
          className="absolute inset-0 bg-[#fffaf3] border border-[#f1e3cf] rounded-[2rem] p-8 flex flex-col justify-between items-center text-center shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* push pin */}
         
          <div className="space-y-2">
            <span className="text-[#a08f85] text-xs font-bold tracking-[0.3em] uppercase">
              Session {session.id}
            </span>

            <h3 className="text-3xl font-black text-[#4b3f3a]">
              {session.title}
            </h3>
          </div>

          <div>
            <div className="bg-[#fdf2e9] text-[#a87f5d] px-4 py-1 rounded-full font-bold mb-3">
              {session.dates}
            </div>

            <p className="text-[#7b6f68] italic">Monday — Friday</p>
            <p className="text-[#7b6f68] italic">9:00am — 12:35pm</p>
          </div>

          <div>
            <div className="text-2xl font-black text-[#4b3f3a]">
              $250
              <span className="text-sm font-light text-[#9f8e86]"> / week</span>
            </div>

            <p className="mt-4 text-[#e76f51] text-xs font-bold tracking-widest uppercase">
              Tap to View Projects
            </p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-[#2b2a2a] border border-[#f1e3cf]/20 rounded-[2rem] p-8 flex flex-col justify-between items-center text-center shadow-2xl"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,#999_1px,transparent_1px),linear-gradient(to_bottom,#999_1px,transparent_1px)] bg-[size:22px_22px]" />

          <div className="w-full">
            <h4 className="text-lg font-black text-[#f9e9da] mb-6 flex items-center justify-center gap-3">
              <span className="h-[2px] w-6 bg-[#f9c89e]" />
              Projects
              <span className="h-[2px] w-6 bg-[#f9c89e]" />
            </h4>

            <ul className="space-y-3 text-left inline-block">
              {session.projects.map((proj, i) => (
                <li key={i} className="flex items-center text-lg text-[#d4c9c2]">
                  <span className="text-[#f9c89e] mr-3 font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {proj}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[#8b817b] text-xs font-bold uppercase tracking-[0.25em]">
            Tap to Return
          </p>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default SessionCard;