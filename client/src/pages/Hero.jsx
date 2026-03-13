import React, { useEffect, useState } from "react";
import Navigation from "../components/Nav";
import Footer from "../components/Footer";

// Note: Ensure your image imports are correct
import image1 from "../assets/Week2/TeachingClay.jpeg";
import image2 from "../assets/Week2/TreasureMap.jpeg";
import image3 from "../assets/Week1/WorkingOnOceans1.jpeg";
import image4 from "../assets/Week2/TeachingSeeds.jpeg";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2, image3, image4];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  const sessions = [
    { title: "Session 1", dates: "June 15 – June 19" },
    { title: "Session 2", dates: "June 29 – July 3" },
    { title: "Session 3", dates: "July 20 – July 24" },
  ];

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden font-sans text-[#5c524e] bg-[#fefaf0]">
        
        {/* Background Slideshow with Softer Overlay */}
        <div className="absolute inset-0 z-0">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Studio activity ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-50" : "opacity-0"
              }`}
            />
          ))}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-[#fefaf0]/60 via-[#fefaf0]/20 to-[#fefaf0]/80" /> */}
        </div>

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <Navigation />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 pt-20">
          <div className="text-center max-w-4xl w-full">
            
            {/* Hero Title */}
            <div className={`transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"}`}>
              <h1 className="text-5xl md:text-8xl text-[#453c39] mb-6 font-black italic tracking-tighter">
                Serrano <span className="font-light">Art Camp</span>
              </h1>
              <div className="w-40 h-1.5 bg-[#f9c89e] mx-auto rounded-full shadow-sm"></div>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[#f9c89e]] font-medium mt-8 mb-10">
              A Creative Summer Adventure for Rising 3rd–6th Graders
            </p>

            {/* Glass Box: Sessions + Pricing */}
            <div className={`bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 mb-10 border border-[#f5e6d3] shadow-sm`}>
              <h3 className="text-[#453c39] font-black text-2xl mb-6 flex items-center justify-center gap-2">
                🎨 Summer 2026 Sessions
              </h3>

              <div className="space-y-3 text-[#5c524e] text-lg mb-6">
                {sessions.map((s, i) => (
                  <p key={i}>
                    {s.title} — <span className="font-bold">{s.dates}</span> 
                    <span className="text-[#a87f5d] font-bold block md:inline md:ml-2">9:00am – 12:35pm</span>
                  </p>
                ))}
              </div>

              <div className="bg-[#f5e6d3]/50 rounded-2xl p-4 inline-block border border-[#f5e6d3]">
                <p className="text-[#453c39] font-bold">Registration: $250 / week</p>
                <p className="text-[#786c67] text-sm">Multi-session discounts available</p>
            <div className="flex flex-col sm:flex-row py-2 gap-4 justify-center">
              <a href="/registration" className="px-10 py-4 bg-[#453c39] text-[#fefaf0] font-black rounded-2xl hover:bg-[#a87f5d] transition-all shadow-md">
                Register Now
              </a>
              <a href="/about" className="px-10 py-4 bg-transparent border-2 border-[#a87f5d] text-[#a87f5d] font-black rounded-2xl hover:bg-[#a87f5d]/10 transition-all">
                Pricing & Details
              </a>
            </div>
              </div>
            </div>

            {/* Buttons */}
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 transition-all duration-500 rounded-full ${index === currentImageIndex ? "w-8 bg-[#a87f5d]" : "w-2 bg-[#d4a373]/30"}`}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}