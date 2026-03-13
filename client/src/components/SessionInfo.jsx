import { FaMapMarkerAlt, FaClock, FaPalette, FaTag } from "react-icons/fa";

export default function SessionInfo() {
  return (
    <div className="bg-[#fdfaf0] border border-[#f5e6d3] rounded-[2.5rem] p-10 shadow-sm max-w-3xl mx-auto text-center">
      
      {/* Title */}
      <h2 className="text-3xl font-black text-[#453c39] mb-8">
        Serrano Art Camp 2026
      </h2>

      {/* Grid: Logistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-4 bg-[#f5e6d3]/30 p-4 rounded-2xl">
          <div className="p-3 bg-[#f9c89e]/20 rounded-xl text-[#a87f5d]">
            <FaMapMarkerAlt />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase font-black text-[#a87f5d] tracking-widest">Location</p>
            <p className="text-sm font-bold text-[#453c39]">Valor North Austin, 78728</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-[#f5e6d3]/30 p-4 rounded-2xl">
          <div className="p-3 bg-[#f9c89e]/20 rounded-xl text-[#a87f5d]">
            <FaClock />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase font-black text-[#a87f5d] tracking-widest">Time</p>
            <p className="text-sm font-bold text-[#453c39]">Monday – Friday</p>
            <p className="text-sm font-bold text-[#453c39]">9:00am – 12:35pm</p>
          </div>
        </div>
      </div>

      {/* Pricing & Info */}
      <div className="space-y-6 text-[#5c524e]">
        <div className="flex items-start gap-4 p-4 border-t border-[#f5e6d3]">
          <FaTag className="text-[#a87f5d] mt-1 shrink-0" />
          <p className="text-sm text-left leading-relaxed">
            <strong className="text-[#453c39]">$250/week</strong> | 
            <strong className="text-[#453c39]"> $450</strong> (2 sessions) | 
            <strong className="text-[#453c39]"> $650</strong> (all 3 sessions) <br />
            *Tuition covers all premium supplies, professional instruction, and a daily snack.
          </p>
        </div>

        <div className="flex items-center gap-4 p-4 bg-[#f9c89e]/10 rounded-2xl">
          <FaPalette className="text-[#a87f5d] shrink-0" />
          <p className="text-sm font-bold text-[#453c39]">
            Join us for the Art Show every Friday from 12:00pm – 12:35pm!
          </p>
        </div>
      </div>
    </div>
  );
}