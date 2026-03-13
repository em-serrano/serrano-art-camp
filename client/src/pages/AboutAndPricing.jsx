import React from "react";
import Footer from "../components/Footer";
import { FaPaintBrush, FaEnvelopeOpenText } from "react-icons/fa";
import Navigation from "../components/Nav";
import SessionCard from "../components/SessionCard";
import StayNotified from "../components/StayNotified";
import SessionInfo from "../components/SessionInfo";

const sessions = [
  {
    id: 1,
    title: "Natural Wonders",
    dates: "June 15 – June 19",
    projects: [
      "Clay Slab Aquarium Scene",
      "Gemstone Drawing",
      "Landscape Silhouette Painting",
      "Food Sculpture",
      "Altamira Inspired Cave Painting",
    ],
  },
  {
    id: 2,
    title: "Shapes and Structures",
    dates: "June 29 – July 3",
    projects: [
      "Faux Stained Glass",
      "Clay Bobble Heads",
      "One Point Perspective Painting",
      "Papier Mache",
      "Animal Painting",
    ],
  },
  {
    id: 3,
    title: "Art Across Cultures",
    dates: "July 20 – July 24",
    projects: [
      "Mola Inspired Animal Painting",
      "Mosaics",
      "Mountain Landscape",
      "Clay Coat of Arms",
      "Glue Chalk Drawing",
    ],
  },
];

const PricingAndActivities = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navigation />
      </div>

      {/* BACKGROUND: Milky Vanilla & Soft Pastel Glows */}
      <section className="relative font-sans text-[#5c524e] bg-[#fefaf0] py-24 px-4 overflow-hidden min-h-screen">
        {/* Soft Pastel Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f9c89e]/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b8c5d6]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-[#453c39] mb-6 tracking-tighter">
              Pricing & Details
            </h2>

            {/* <p className="text-xl text-[#786c67] max-w-2xl mx-auto leading-relaxed font-medium">
              Serrano Art Camp 2026
            </p>

            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm font-bold text-[#8d827e]">
              <span className="flex items-center gap-2">
                Valor North Austin
              </span>
              <span className="hidden md:block opacity-30">|</span>
              <span className="flex items-center gap-2">9:00am – 12:35pm</span>
            </div> */}
            <SessionInfo />
          </div>

          {/* Session Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-24 px-4">
            {sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>

          {/* Information Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left px-4">
            {/* Pricing Section */}
            <div className="bg-white/50 backdrop-blur-md border border-[#f5e6d3] rounded-[2.5rem] p-10 shadow-sm">
              <h3 className="text-2xl font-black text-[#453c39] mb-8 flex items-center gap-3">
                <FaPaintBrush className="text-[#f9c89e]" />
                Attending Multiple Weeks?
              </h3>

              <div className="space-y-6">
                {/* <p className="text-[#786c67] leading-relaxed">
                  Registration is{" "}
                  <strong className="text-[#453c39]">$250 per week</strong>.
                  This includes all premium art supplies, specialized
                  instruction, and a daily snack.
                </p> */}

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-[#fdf2e9] border border-[#fde5cc]">
                    <span className="text-lg font-bold text-[#5c524e]">
                      2 Sessions
                    </span>
                    <span className="text-[#a87f5d] font-black tracking-tight">
                      $50 OFF per Artist
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-[#fdf2e9] border border-[#fde5cc]">
                    <span className="text-lg font-bold text-[#5c524e]">
                      All 3 Sessions 
                    </span>
                    <span className="text-[#a87f5d] font-black tracking-tight">
                      $100 OFF per Artist
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration/Mailing Section */}
            {/* <div className="bg-[#453c39] rounded-[2.5rem] p-10 shadow-xl flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#f9c89e]/10 blur-3xl group-hover:bg-[#f9c89e]/20 transition-all duration-700" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-[#fefaf0] mb-4 flex items-center gap-3">
                  <FaEnvelopeOpenText className="text-[#f9c89e]" />
                  Stay Notified
                </h3>
                <p className="text-[#c7bdb9] mb-8 leading-relaxed">
                  Our sessions are limited to <span className="text-[#f9c89e] font-bold">15 artists</span> each. 
                  Join our list for priority registration alerts.
                </p>
              </div>

              <a
                href="https://forms.gle/r6o7VPQYToFi8fUV7"
                className="relative z-10 w-full py-4 bg-[#f9c89e] text-[#453c39] font-black text-center rounded-2xl hover:bg-[#fce5cf] transition-all shadow-lg active:scale-95"
              >
                Join Waitlist
              </a>

            </div> */}
            <StayNotified
              spotsLeft={{ session1: 15, session2: 15, session3: 15 }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PricingAndActivities;
