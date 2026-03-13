import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-[#5c524e] bg-[#fdfaf0] py-6 px-6">
      {/* Decorative circle */}
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f9c89e]/10 rounded-full -ml-16 -mb-16 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10 text-sm">

        {/* Brand & Social */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-[#453c39] tracking-tight">
            Serrano <span className="text-[#a87f5d]">Art Camp</span>
          </h2>
          <div className="flex space-x-3 pt-1">
            <a 
              href="https://instagram.com/serranoartcamp" 
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-2xl bg-[#f5e6d3] flex items-center justify-center text-[#5c524e] hover:bg-[#f9c89e] transition-all"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            {/* <a 
              href="#" 
              className="w-10 h-10 rounded-2xl bg-[#f5e6d3] flex items-center justify-center text-[#5c524e] hover:bg-[#f9c89e] transition-all"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a> */}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-[#a87f5d]">Contact</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <FaEnvelope className="text-[#f9c89e] mr-3 text-xs" />
              <a href="mailto:serranoartcamp@gmail.com" className="hover:text-[#a87f5d] transition-colors">
                serranoartcamp@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <FaPhone className="text-[#f9c89e] mr-3 text-xs" />
              <a href="tel:+13108715657" className="hover:text-[#a87f5d] transition-colors">
                (310) 871-5657
              </a>
            </li>
            <li className="flex items-start">
              <FaMapMarkerAlt className="text-[#f9c89e] mr-3 text-xs mt-1" />
              <span className="leading-relaxed">
                Valor North Austin, Austin, TX<br />
                <span className="text-[#a87f5d]/60 text-[10px] italic">14200 N Interstate Hwy 35, Austin, TX 78728</span>
              </span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-[#a87f5d]">Explore</h3>
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="hover:text-[#a87f5d] transition-colors">Home</Link>
            <Link to="/gallery" className="hover:text-[#a87f5d] transition-colors">Camp Gallery</Link>
            <Link to="/about" className="hover:text-[#a87f5d] transition-colors">Pricing & Details</Link>
            <a href="https://forms.gle/r6o7VPQYToFi8fUV7" className="hover:text-[#a87f5d] font-bold text-[#a87f5d] transition-colors">Join Mail List</a>
          </nav>
        </div>

        {/* Summer 2026 Sessions */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-[#a87f5d]">Summer 2026</h3>
          <div className="bg-[#f5e6d3]/50 border border-[#f5e6d3] rounded-2xl p-4">
            <p className="text-[#5c524e] text-[13px] leading-relaxed italic">
              Registration is on first come first serve basis, limited to 15 artists per week. Sign up for our mailing list to stay notified!
            </p>
            <div className="mt-3 flex items-center text-[10px] font-black text-[#a87f5d] uppercase tracking-widest">
             
            </div>
          </div>
        </div>
      </div>
        <p>© {new Date().getFullYear()} Serrano Art Camp</p>
        {/* <div className="flex gap-6 uppercase tracking-widest">
          <span>Inspiring Young Artists</span>
          <span className="underline decoration-[#f9c89e] underline-offset-4">Austin, TX</span>

      <div className="max-w-7xl mx-auto border-t border-[#f5e6d3] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-[#a87f5d]/60">
        </div>
      </div> */}
    </footer>
  );
}