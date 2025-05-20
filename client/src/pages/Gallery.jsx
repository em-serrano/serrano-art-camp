import React from "react";
import { FaCameraRetro, FaInstagram } from "react-icons/fa";

import "../styles/Gallery.css";

const Gallery = ({ showGalleryComingSoon = true }) => {
  if (!showGalleryComingSoon) return null;

const SectionHeader = ({ icon, title, description }) => (
  // Content/Layout of the SectionHeader component
  <div className="section-header">
    <h2>
      <span className="header-icon">{icon}</span>
      {title}
    </h2>
    <p className="section-description">{description}</p>
  </div>
);

  return (
    <section className="gallery-section">
      <SectionHeader
        icon={<FaCameraRetro />}
        title=" Camp Gallery"
        style={{ color: "var(--secondary-color)" }}
        description="Photos from Serrano Art Camp, Summer 2025"
      />
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <h3>Coming Soon!</h3>
          <div className="polaroid-stack">
            <div className="polaroid"></div>
            <div className="polaroid"></div>
            <div className="polaroid"></div>
          </div>
          <p>
            Check back after our first session to see photos of our campers'
            amazing artwork and creative process!
          </p>
          <div className="instagram-follow">
            <FaInstagram className="instagram-icon" />
            <p>
              Follow us on Instagram{" "}
              <a
                href="https://instagram.com/serranoartcamp"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-link"
              >
                @serranoartcamp
              </a>{" "}
              for daily updates and behind-the-scenes photos!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;