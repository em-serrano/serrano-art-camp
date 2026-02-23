import React, { useEffect, useState } from "react";
import Navigation from "../components/Nav";
import Footer from "../components/Footer";
import "../styles/Hero.css"; // Assuming you have styles for the hero section

//images for bg
import image1 from "../assets/Week2/TeachingClay.jpeg";
import image2 from "../assets/Week2/TreasureMap.jpeg";
import image3 from "../assets/Week1/WorkingOnOceans1.jpeg";
import image4 from "../assets/Week1/WorkingOnFlowers.jpeg";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock images for demo - replace with your actual images
  const images = [image1, image2, image3, image4];

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      const hero = document.querySelector("#hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setScrollProgress(Math.min(1, -rect.top / (window.innerHeight * 0.5)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <section
        id="hero"
        className="relative h-screen w-full overflow-hidden font-sans"
      >
        {/* Background Slideshow */}
        <div className="absolute inset-0 w-full h-full">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Hero background ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Enhanced Gradient Overlay matching nav/footer theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/90 via-blue-900/70 to-transparent" />

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <Navigation />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center max-w-4xl mx-auto w-full px-4">
            <div
              className={`transform transition-all duration-1000 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-16 opacity-0"
              }`}
            >
              <div className="flex justify-center mb-8">
                <div className="text-center">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-4 drop-shadow-2xl">
                    Serrano Art Camp
                  </h1>
                  {/* <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-yellow-400 mb-2 drop-shadow-lg">
                    Serrano Art Camp
                  </h2> */}
                  <div className="w-60 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-16 opacity-0"
              }`}
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-white font-light mb-4 drop-shadow-lg">
                Creative Summer Adventure for Rising 2nd-5th Graders
              </p>
              {/* <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md">
                Join Mrs. Molly Serrano at Grace + Peace Church in Austin, TX
              </p> */}
            </div>

            <div
              className={`transform transition-all duration-1000 delay-500 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-16 opacity-0"
              }`}
            >
              {/* <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                  <div className="text-center">
                    <h3 className="text-yellow-400 font-semibold mb-2">
                      Week 1: "Back to Nature"
                    </h3>
                    <p className="text-sm mb-1">June 9-13, 2025</p>
                    <p className="text-xs text-white/80">
                      9:00am - 12:30pm daily
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-yellow-400 font-semibold mb-2">
                      Week 2: "Dots and Lines"
                    </h3>
                    <p className="text-sm mb-1">July 7-11, 2025</p>
                    <p className="text-xs text-white/80">
                      9:00am - 12:30pm daily
                    </p>
                  </div>
                </div>
              </div> */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
  <div className="text-center text-white">
    <h3 className="text-yellow-400 font-semibold text-2xl mb-3">
      🎨 Summer 2026 Sessions:
    </h3>
    <p className="text-lg mb-2">
      Serrano Art Camp 2026 themes, dates, and details are coming soon!
    </p>
    <p className="text-sm text-white/80">
      Join the mail list for camp updates!
    </p>
  </div>
</div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-700 flex flex-col sm:flex-row gap-4 justify-center ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-16 opacity-0"
              }`}
            >
              {/* <a
                href="/registration"
                className="inline-block px-8 py-4 bg-yellow-400 text-purple-900 font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
              >
                Register Now - $250/week
              </a> */}
              <a
                href="https://forms.gle/r6o7VPQYToFi8fUV7"
                className="inline-block px-8 py-4 bg-yellow-400 text-purple-900 font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
              >
                Join Our Mail List
              </a>
              <a
                href="/gallery"
                className="inline-block px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold rounded-lg hover:bg-yellow-400/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
              >
                View Gallery
              </a>
            </div>
          </div>
        </div>

        {/* Slideshow Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-yellow-400 scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Floating art elements */}
        <div className="absolute top-1/4 left-10 text-yellow-400/30 animate-pulse">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div className="absolute bottom-1/4 right-10 text-yellow-400/30 animate-pulse delay-1000">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      </section>
      <Footer />
    </>
  );
}
