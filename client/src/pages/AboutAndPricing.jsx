import React from "react";
import Footer from "../components/Footer";
import { FaPalette } from "react-icons/fa";
import Navigation from "../components/Nav";

const PricingAndActivities = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navigation />
      </div>
      <section className="relative font-sans text-white bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 py-24 px-4 overflow-hidden">
        {/* Grid Overlay (faint) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_80%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold drop-shadow-lg mb-2">
              Session Details Coming Soon!
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Stay tuned! The next summer’s camp themes are being hand-crafted
              and inspired by new artists and creative explorations. We're
              excited to share them with you soon!
            </p>
          </div>

          {/* Poster-style Announcement Card */}
          <div className="mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-10 max-w-3xl mt-12">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
              Serrano Art Camp 2026
            </h3>
            <p className="text-lg text-white mb-4">
              ✨ Creative Summer Adventures for Rising 2nd–5th Graders ✨
            </p>
            <p className="text-md text-white/80 mb-6">
              Themes, dates, and registration details for Summer 2026 will be
              announced in early Spring. Please check back or follow us on
              Instagram for the latest updates!
            </p>

            <a
              href="https://forms.gle/r6o7VPQYToFi8fUV7"
              className="inline-block mt-4 px-6 py-3 text-yellow-400 border-2 border-yellow-400 font-semibold rounded-lg transition hover:bg-yellow-400 hover:text-purple-900 hover:shadow-xl"
            >
              Join Our Mail List
            </a>
          </div>

          {/* Optional: Instagram link or footer nav */}
          <div className="mt-16 text-white/70 text-sm">
            Follow us on Instagram:
            <a
              href="https://www.instagram.com/serranoartcamp"
              target="_blank"
              rel="noreferrer"
              className="ml-2 text-yellow-400 hover:text-yellow-300 font-semibold"
            >
              @serranoartcamp
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PricingAndActivities;
