import React from 'react';
import { FaPalette, FaCameraRetro, FaInstagram } from 'react-icons/fa';
import { SectionHeader } from '../components/SectionHeader';
import "../styles/SoldOut.css";

const PricingAndActivities = () => {
  // Set these to true when the week is full
  const week1Full = false;
  const week2Full = false;
  const showGalleryComingSoon = true;
  
  return (
    <section className="preference-section">
      <SectionHeader
        icon={<FaPalette />}
        title=" Featured Artists & Inspiration"
        style={{
          color: "var(--primary-color)"
        }}
        description="Each session focuses on a different renowned artist's style and techniques.
        Here's a preview of what campers will be inspired by:"
      />

      <div className="activities-content">
        {/* Pricing Cards with Artist Examples */}
        <div className="pricing-cards">
          {/* Week 1 Card */}
          <div className={`pricing-card with-artist-example ${week1Full ? 'session-full' : ''}`}>
            <div className="artist-example-banner">
              {week1Full && (
                <div className="session-full-banner">
                  <span>SESSION FULL</span>
                </div>
              )}
              <img 
                src="https://www.neh.gov/sites/default/files/2018-07/2018_3-Summer_OKeeffe_Hawaii_05.jpg" 
                alt="Georgia O'Keefe inspired artwork" 
                className="artist-example-img"
              />
              <div className="artist-overlay">
                <span>Hibiscus with Plumeria by Georgia O'Keefe</span>
              </div>
            </div>
            <div className="card-content">
              <h3 className={week1Full ? 'full-session-title' : ''}>Week 1: "Back to Nature"</h3>
              <div className="price">$250<span>/week (includes art supplies, materials, and snack)</span></div>
              <p>June 9 - 13, 9am - 12:30pm</p>
              <ul>
                <li>Georgia O'Keefe inspired floral painting</li>
                <li>Ocean silhouette painting</li>
                <li>Papier mache animal sculpture</li>
                <li>Cyanotype (sun prints)</li>
                <li>Clay dishes</li>
              </ul>
              {week1Full && (
                <p className="waitlist-text">Join our waitlist by emailing us at <strong>info@serranoartcamp.com</strong></p>
              )}
            </div>
          </div>
          
          {/* Week 2 Card */}
          <div className={`pricing-card with-artist-example ${week2Full ? 'session-full' : ''}`}>
            <div className="artist-example-banner">
              {week2Full && (
                <div className="session-full-banner">
                  <span>SESSION FULL</span>
                </div>
              )}
              <img 
                src="https://www.phillipscollection.org/sites/default/files/collection/1951.jpg" 
                alt="Alma Woodsey inspired artwork" 
                className="artist-example-img"
              />
              <div className="artist-overlay">
                <span>Breeze Rustling Through Fall Flowers by Alma Woodsey Thomas</span>
              </div>
            </div>
            <div className="card-content">
              <h3 className={week2Full ? 'full-session-title' : ''}>Week 2: "Dots and Lines"</h3>
              <div className="price">$250<span>/week (includes art supplies, materials, and snack)</span></div>
              <p>July 7 - 11, 9am - 12:30pm</p>
              <ul>
                <li>Alma Woodsey Thomas inspired landscape</li>
                <li>Aboriginal Style Animal Painting</li>
                <li>Seed Mosaic</li>
                <li>Lego Printmaking</li>
                <li>Chalk Pastel & Glue Line Drawing</li>
              </ul>
              {week2Full && (
                <p className="waitlist-text">Join our waitlist by emailing us at <strong>info@serranoartcamp.com</strong></p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Art Show Information */}
      <div className="form-section camp--details">
        <h3>Serrano Art Camp Details</h3>
        <ul>
          <h4>Fees: $250/week (*$450 for campers attending both weeks)</h4> 
          <li>Cost includes all materials/supplies and a snack</li>
          <li>Students will hold an art show at 12:10pm on Friday of each week</li>
          <li>Weekly sessions are limited to 15 artists - first come first serve basis</li>
          <li>For Rising 2nd - 5th Graders (Fall 2025)</li>
        </ul>
      </div>

      {/* Gallery Coming Soon Banner */}
      {showGalleryComingSoon && (
        <div className="gallery-coming-soon">
          <SectionHeader
            icon={<FaCameraRetro />}
            title=" Camp Gallery"
            style={{
              color: "var(--secondary-color)"
            }}
            description="Photos from Serrano Art Camp, Summer 2025"
          />
          <div className="coming-soon-placeholder">
            <div className="coming-soon-content">
                <h3>Coming Soon!</h3>
              <div className="polaroid-stack">
                <div className="polaroid"></div>
                <div className="polaroid"></div>
                <div className="polaroid"></div>
              </div>
              <p>Check back after our first session to see photos of our campers' amazing artwork and creative process!</p>
              <div className="instagram-follow">
                <FaInstagram className="instagram-icon" />
                <p>Follow us on Instagram <a href="https://instagram.com/serranoartcamp" target="_blank" rel="noopener noreferrer">@serranoartcamp</a> for daily updates and behind-the-scenes photos!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PricingAndActivities;