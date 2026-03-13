import React from "react";
import Navigation from "../components/Nav";
import Footer from "../components/Footer";
import { FaPalette, FaClock, FaMapMarkerAlt } from "react-icons/fa";

export default function GoogleRegistration() {
  return (
    <>
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navigation />
      </div>

      <section className="bg-[#fefaf0] text-[#5c524e] pt-32 pb-20 px-6 font-sans">
        <div className="max-w-6xl mx-auto">

          {/* Page Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-black text-[#453c39] mb-4">
              2026 Summer Registration
            </h1>

            <div className="w-24 h-1.5 bg-[#f9c89e] mx-auto rounded-full mb-6"></div>

            <p className="max-w-2xl mx-auto text-[#786c67] text-lg">
              Reserve your child’s spot in Serrano Art Camp! Each session is
              limited to <span className="font-bold text-[#453c39]">15 artists</span>.
              Complete the registration form below and we’ll follow up with
              payment details.
            </p>
          </div>

          {/* Camp Info */}
          {/* <div className="bg-white rounded-3xl border border-[#f5e6d3] p-8 mb-12 shadow-sm max-w-4xl mx-auto">

            <h2 className="text-2xl font-black text-[#453c39] mb-6 flex items-center justify-center gap-2">
              <FaPalette className="text-[#f9c89e]" />
              Camp Details
            </h2>

            <div className="space-y-3 text-center text-[#5c524e]">

              <p>
                <strong>Session 1:</strong> June 15 – June 19
              </p>

              <p>
                <strong>Session 2:</strong> June 29 – July 3
              </p>

              <p>
                <strong>Session 3:</strong> July 20 – July 24
              </p>

              <div className="flex justify-center gap-8 pt-4 text-[#786c67] text-sm font-semibold">

                <span className="flex items-center gap-2">
                  <FaClock className="text-[#f9c89e]" />
                  9:00am – 12:35pm
                </span>

                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#f9c89e]" />
                  Valor North Austin
                </span>

              </div>

              <div className="pt-6 text-lg font-bold text-[#453c39]">
                $250 per session
              </div>

              <p className="text-sm text-[#786c67]">
                Discounts available for multi-session registration.
              </p>

            </div>
          </div> */}

          {/* Embedded Form */}
          <div className="bg-white border border-[#f5e6d3] rounded-3xl shadow-sm p-4 md:p-6">

            {/* Replace src with your form later */}
            <iframe
              title="Serrano Art Camp Registration"
              src="https://forms.gle/yiweRHFsRpSNL3xo7"
              width="100%"
              height="1100"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              className="rounded-xl"
            >
              Loading…
            </iframe>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}