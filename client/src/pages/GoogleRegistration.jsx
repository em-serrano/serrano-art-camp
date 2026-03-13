import React from "react";
import Navigation from "../components/Nav";
import Footer from "../components/Footer";
import { FaInfoCircle, FaTag } from "react-icons/fa";

export default function GoogleRegistration() {
  return (
    <div className="min-h-screen bg-[#fefaf0]">
      <Navigation />

      {/* Main Content: Matches About Page Spacing/Logic */}
      <main className="relative font-sans text-[#5c524e] pt-32 pb-24 px-6 overflow-hidden">
        
        {/* Soft Pastel Glows - Mirrored from About Page */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#f9c89e]/15 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#b8c5d6]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto">
          
          {/* Section Header: Spacing matched to Pricing header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-[#453c39] mb-10 tracking-tighter italic">
              Summer 2026 Registration
            </h1>
            
            {/* Informational Grid: Matches the "Information Grid" layout style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left mb-16">
              <div className="bg-white/60 backdrop-blur-md border border-[#f5e6d3] rounded-[2.5rem] p-8 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-[#f9c89e]/20 rounded-xl mt-1">
                  <FaInfoCircle className="text-[#a87f5d]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#453c39] mb-2 uppercase tracking-widest text-[10px]">Session Capacity</h3>
                  <p className="text-sm text-[#786c67] leading-relaxed">
                    Each session is limited to <span className="font-bold text-[#453c39]">15 artists</span> to ensure personalized studio instruction.
                  </p>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md border border-[#f5e6d3] rounded-[2.5rem] p-8 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-[#f9c89e]/20 rounded-xl mt-1">
                  <FaTag className="text-[#a87f5d]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#453c39] mb-2 uppercase tracking-widest text-[10px]">Quick Pricing</h3>
                  <p className="text-sm text-[#786c67] leading-relaxed">
                    <span className="font-bold text-[#453c39]">$250/week | </span> 
                    <span className="font-bold text-[#453c39]">$450/2 weeks | </span> 
                    <span className="font-bold text-[#453c39]">$650/3 weeks</span> 
                    
                    <br /> Multi-session discounts are applied in your final invoice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Form: Cleaned up to match the "Activity Card" style */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md border border-[#f5e6d3] rounded-[2.5rem] shadow-sm overflow-hidden relative">
              {/* Top accent bar to match the "Milky" look */}
              <div className="h-2 w-full bg-[#f9c89e]/30" />
              
              <iframe
                title="Serrano Art Camp Registration"
                src="https://forms.gle/yiweRHFsRpSNL3xo7"
                width="100%"
                height="1400"
                frameBorder="0"
                className="w-full"
              >
                Loading…
              </iframe>
            </div>
            
            <p className="mt-10 text-center text-sm italic text-[#786c67] max-w-2xl mx-auto">
              Please allow 24-48 hours after submission for our team to follow up with your formal confirmation and payment details.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}