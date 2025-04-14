import React from 'react';
import { FaPalette } from 'react-icons/fa';
import { SectionHeader } from '../components/SectionHeader';
import "../styles/PricingCrdImgFront.css"

const PricingAndActivities = () => {
  
  const artistExamples = {
    okeefe: "./src/assets/GOKeefe.jpg",
    woodsey: "./src/assets/AWoodsey.jpg"
  };

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
              <div className="pricing-card with-artist-example">
                <div className="artist-example-banner">
                  <img 
                    src={artistExamples.okeefe} 
                    alt="Georgia O'Keefe inspired artwork" 
                    className="artist-example-img"
                  />
                  <div className="artist-overlay">
                    <span>Hibiscus with Plumeria by Georgia O'Keefe</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3>Week 1: "Back to Nature"</h3>
                  <div className="price">$250<span>/week (includes art supplies, materials, and snack)</span></div>
                  <p>June 9 - 13, 9am - 12:30pm</p>
                  <ul>
                    <li>Georgia O'Keefe inspired floral painting</li>
                    <li>Ocean silhouette painting</li>
                    <li>Papier mache animal sculpture</li>
                    <li>Cyanotype (sun prints)</li>
                    <li>Clay dishes</li>
                  </ul>
                </div>
              </div>
              
              <div className="pricing-card with-artist-example">
                <div className="artist-example-banner">
                  <img 
                    src={artistExamples.woodsey} 
                    alt="Alma Woodsey inspired artwork" 
                    className="artist-example-img"
                  />
                  <div className="artist-overlay">
                    <span>Breeze Rustling Through Fall Flowers by Alma Woodsey Thomas</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3>Week 2: "Dots and Lines"</h3>
                  <div className="price">$250<span>/week (includes art supplies, materials, and snack)</span></div>
                  <p>July 7 - 11, 9am - 12:30pm</p>
                  <ul>
                    <li>Alma Woodsey Thomas inspired landscape </li>
                    <li>Aboriginal Style Animal Painting</li>
                    <li>Seed Mosaic</li>
                    <li>Lego Printmaking</li>
                    <li>Chalk Pastel & Glue Line Drawing</li>
                
                  </ul>
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
    </section>
  );
}

export default PricingAndActivities;