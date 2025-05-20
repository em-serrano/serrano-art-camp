import React, { useEffect, useState } from 'react';
import '../styles/Hero.css'; // We'll create this for custom style
import PricingCards from '../components/SoldOutCard';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      const hero = document.querySelector('#hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setScrollProgress(Math.min(1, -rect.top / (window.innerHeight * 0.5)));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="hero"
      className="position-relative vh-100 w-100 overflow-hidden"
    >
      {/* 1. Background Image/Video */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-indigo-900">
        {/* Optional: Replace with video if you have one */}
        <div className="hero-background position-absolute top-0 start-0 w-100 h-100 opacity-50"></div>
      </div>
      
      {/* 2. Dual Gradient System */}
      <div className="position-absolute top-0 start-0 w-100 h-100 hero-top-gradient" />
      
      {/* Video-specific fade-out (bottom third) */}
      <div 
        className="position-absolute bottom-0 start-0 end-0 h-33 hero-bottom-fade"
        style={{ opacity: 1 - scrollProgress * 1.2 }}
      />
      
      {/* 3. Content with Staggered Animations */}
      <div className="position-relative z-3 d-flex align-items-center justify-content-center h-100 px-4">
        <div className="text-center mx-auto hero-content">
          <div className={`hero-animation ${isLoaded ? 'hero-visible' : 'hero-hidden'}`}>
            <h1 className="text-white fw-bold mb-4 hero-title">
              Serrano Art Camp 2025
            </h1>
          </div>
          
          <div className={`hero-animation delay-300 ${isLoaded ? 'hero-visible' : 'hero-hidden'}`}>
            <p className="text-white-90 mb-4 hero-subtitle">
              Join Mrs. Molly Serrano for a creative summer adventure at Grace + Peace Church in Austin, TX!
            </p>
          </div>

          <div className={`hero-animation delay-500 ${isLoaded ? 'hero-visible' : 'hero-hidden'}`}>
            <p className="text-white-80 mb-5 hero-description">
              We will explore new artists, techniques and a variety of mediums. Each week features different themes
              and focuses. Students will hold an art show on Friday at 12:10pm each week!
            </p>
          </div>
          
          <div className={`hero-animation delay-700 ${isLoaded ? 'hero-visible' : 'hero-hidden'}`}>
            <a
              href="/registration"
              className="btn btn-white text-indigo-900 fw-semibold px-5 py-3 rounded-3 me-3 hero-btn"
            >
              Register Now
            </a>
            <a
              href="/pricing"
              className="btn btn-outline-white text-white border-2 fw-semibold px-5 py-3 rounded-3 hero-btn"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
      <PricingCards />
    </section>
  );
}