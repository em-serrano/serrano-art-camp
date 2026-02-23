import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-purple-900 via-blue-900 to-indigo-900 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Brand & Description */}
        <div>
          <h2 className="text-xl font-bold mb-3">Serrano Art Camp</h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Creative art exploration for rising 2nd-5th graders with Mrs. Molly Serrano.
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-yellow-400">Contact</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li className="flex items-center">
              <FaEnvelope className="mr-2 text-yellow-400 text-xs" />
              <a 
                href="mailto:serranoartcamp@gmail.com" 
                className="hover:text-yellow-400 transition-colors"
              >
                serranoartcamp@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2 text-yellow-400 text-xs" />
              <a 
                href="tel:+13108715657" 
                className="hover:text-yellow-400 transition-colors"
              >
                (310) 871-5657
              </a>
            </li>
            <li className="flex items-start">
              <FaMapMarkerAlt className="mr-2 text-yellow-400 text-xs mt-0.5" />
              <a 
                // href="https://maps.app.goo.gl/jShJ2ERgPSQnTXFJ9"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition-colors"
              >
                TBD<br />
                {/* 6301 Woodrow Ave. */}
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-yellow-400">Quick Links</h3>
          <nav className="space-y-2 text-white/80 text-sm">
            <a href="#home" className="block hover:text-yellow-400 transition-colors">Home</a>
            <a href="#gallery" className="block hover:text-yellow-400 transition-colors">Gallery</a>
            <a href="#about" className="block hover:text-yellow-400 transition-colors">About & Pricing</a>
            <a href="#registration" className="block hover:text-yellow-400 transition-colors">Register</a>
          </nav>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-yellow-400">Follow Us</h3>
          <div className="flex space-x-3">
            <a 
              href="#" 
              className="text-white/80 hover:text-yellow-400 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="text-lg" />
            </a>
            <a 
              href="#" 
              className="text-white/80 hover:text-yellow-400 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook className="text-lg" />
            </a>
            <a 
              href="#" 
              className="text-white/80 hover:text-yellow-400 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter className="text-lg" />
            </a>
          </div>
          <div className="mt-4 text-xs text-white/60">
            <p>Session pricing coming soon!</p>
            {/* <p>$450 for both sessions</p>
            <p>Limited to 15 artists</p> */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-6 pt-4 text-center">
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} Serrano Art Camp with Mrs. Molly Serrano. All rights reserved.
        </p>
        <p className="text-xs text-white/50 mt-1">
          Inspiring young artists • Building creativity • Making memories
        </p>
      </div>
    </footer>
  );
}