import { FaEnvelopeOpenText } from "react-icons/fa";

export default function StayNotified({ spotsLeft }) {
  // spotsLeft is an object you can update manually:
  // { session1: 10, session2: 7, session3: 5 }
  return (
    <div className="bg-[#453c39] rounded-[2.5rem] p-10 shadow-xl flex flex-col justify-between overflow-hidden relative group">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#f9c89e]/10 blur-3xl group-hover:bg-[#f9c89e]/20 transition-all duration-700" />

      <div className="relative z-10">
        <h3 className="text-2xl font-black text-[#fefaf0] mb-4 flex items-center gap-3">
          <FaEnvelopeOpenText className="text-[#f9c89e]" />
          Studio Spaces Left:
        </h3>
        <p className="text-[#c7bdb9] mb-4 leading-relaxed">
          Our sessions are limited to <span className="text-[#f9c89e] font-bold">15 artists</span> each. Check remaining spots below:
        </p>

        {/* Session Spots */}
        <ul className="text-[#f9c89e] font-semibold space-y-1 mb-6">
          <li>Session 1 (June 15–19): {spotsLeft.session1} spots left</li>
          <li>Session 2 (June 29–July 3): {spotsLeft.session2} spots left</li>
          <li>Session 3 (July 20–24): {spotsLeft.session3} spots left</li>
        </ul>
      </div>

      <a
        href="/registration"
        className="relative z-10 w-full py-4 bg-[#f9c89e] text-[#453c39] font-black text-center rounded-2xl hover:bg-[#fce5cf] transition-all shadow-lg active:scale-95"
      >
        Register Now
      </a>
    </div>
  );
}