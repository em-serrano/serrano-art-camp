import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { FaPaintBrush } from "react-icons/fa";
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
      "Glue and Chalk Drawing",
    ],
  },
];

const floatingImages = {
  desktop: [
    { src: "/gallery/2025Week1/SunPrints.webp", className: "top-[10%] left-[15%] w-100 rotate-[-10deg]" },
    { src: "/gallery/2025Week2/TreasureMap.webp", className: "top-[60%] right-[8%] w-100 rotate-[-12deg]" },
    { src: "/gallery/2025Week2/DotsAndLines.webp", className: "bottom-[10%] left-[15%] w-100 rotate-[6deg]" },
    { src: "/gallery/2025Week2/DotWolf.webp", className: "top-[10%] right-[15%] w-100 rotate-[8deg]" },
  ],
  mobile: [
    { src: "/gallery/2025Week1/SunPrints.webp", className: "top-[8%] -left-8 w-44 rotate-[-6deg]" },
    { src: "/gallery/2025Week2/DotWolf.webp", className: "top-[28%] -right-8 w-44 rotate-[5deg]" },
    { src: "/gallery/2025Week2/TreasureMap.webp", className: "top-[50%] -left-8 w-44 rotate-[-4deg]" },
    { src: "/gallery/2025Week2/DotsAndLines.webp", className: "top-[72%] -right-8 w-44 rotate-[7deg]" },
  ],
};

const PricingAndActivities = () => {
  const animateProps = (i) => ({
    initial: { y: 0 },
    animate: { y: [0, -15, 0] },
    transition: { duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" },
  });

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navigation />
      </div>

      <section className="relative font-sans text-[#5c524e] bg-[#fefaf0] py-24 px-4 overflow-hidden min-h-screen">
        {/* Floating Images */}
        {floatingImages.desktop.map((img, i) => (
          <motion.img
            key={`desktop-${i}`}
            src={img.src}
            alt=""
            aria-hidden="true"
            className={`absolute opacity-50 pointer-events-none rounded-xl shadow-md hidden md:block ${img.className}`}
            {...animateProps(i)}
          />
        ))}
        {floatingImages.mobile.map((img, i) => (
          <motion.img
            key={`mobile-${i}`}
            src={img.src}
            alt=""
            aria-hidden="true"
            className={`absolute opacity-40 pointer-events-none rounded-xl shadow-md block md:hidden ${img.className}`}
            {...animateProps(i)}
          />
        ))}

        {/* Background glows */}
        <div className="absolute top-0 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#f9c89e]/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#b8c5d6]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#453c39] mb-6 tracking-tighter">
              Pricing & Details
            </h2>
            <SessionInfo />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24 px-2 sm:px-4">
            {sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left px-2 sm:px-4">
            {/* Multiple Weeks */}
            <div className="bg-white/50 backdrop-blur-md border border-[#f5e6d3] rounded-2xl p-8 sm:p-10 shadow-sm">
              <h3 className="text-2xl font-black text-[#453c39] mb-6 flex items-center gap-3">
                <FaPaintBrush className="text-[#f9c89e]" />
                Attending Multiple Weeks?
              </h3>
              <div className="space-y-4">
                {[
                  { label: "2 Sessions", discount: "$50 OFF per Artist" },
                  { label: "All 3 Sessions", discount: "$100 OFF per Artist" },
                ].map((offer, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#fdf2e9] border border-[#fde5cc]"
                  >
                    <span className="text-lg font-bold text-[#5c524e]">{offer.label}</span>
                    <span className="text-[#a87f5d] font-black tracking-tight">{offer.discount}</span>
                  </div>
                ))}
              </div>
            </div>

            <StayNotified spotsLeft={{ session1: 1, session2: 0, session3: 13 }} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PricingAndActivities;