import React, { useState, useRef, useEffect } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Nav";
import {
  FaInstagram,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Images
import image1 from "../assets/Week1/SunPrints.jpeg";
import image2 from "../assets/Week1/LeafPlates.jpeg";
import image3 from "../assets/Week1/WorkingOnOceans.jpeg";
import image4 from "../assets/Week2/CatSculpture.jpeg";
import image5 from "../assets/Week1/WorkingOnFlowers.jpeg";
import image6 from "../assets/Week1/Week1Show.jpeg";
import imageW2_1 from "../assets/Week2/DotsAndLines.jpeg";
import imageW2_2 from "../assets/Week2/TreasureMap.jpeg";
import imageW2_3 from "../assets/Week2/SeedMosaic.jpeg";
import imageW2_4 from "../assets/Week2/GlueandChalk.jpeg";
import imageW2_5 from "../assets/Week2/LegoPrints.jpeg";
import imageW2_6 from "../assets/Week2/Week2Show.jpeg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("week1");
  const [touchStart, setTouchStart] = useState(null);

  const galleryImages = {
    week1: [
      { id: 1, src: image5, title: "Floral Masterpieces", description: "Georgia O'Keefe inspired floral painting" },
      { id: 2, src: image3, title: "Ocean Silhouettes", description: "Dramatic ocean scenes with silhouettes" },
      { id: 3, src: image4, title: "Animal Sculptures", description: "Creative papier mache animal sculptures" },
      { id: 4, src: image1, title: "Sun Prints", description: "Cyanotype creations using natural elements" },
      { id: 5, src: image2, title: "Clay Creations", description: "Handmade clay dishes and pottery" },
      { id: 6, src: image6, title: "Art Show", description: "Artists proudly presenting their artwork" },
    ],
    week2: [
      { id: 7, src: imageW2_1, title: "Colorful Landscapes", description: "Inspired by Alma Thomas" },
      { id: 8, src: imageW2_2, title: "Treasure Map", description: "Coffee aged treasure maps" },
      { id: 9, src: imageW2_3, title: "Seed Mosaics", description: "Snake mosaic using natural seeds" },
      { id: 10, src: imageW2_5, title: "Lego Prints", description: "Creative printmaking with Legos" },
      { id: 11, src: imageW2_4, title: "Chalk Drawings", description: "Glue resist chalk art" },
      { id: 12, src: imageW2_6, title: "Final Showcase", description: "Week 2 Art Exhibition" },
    ],
  };

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction) => {
    const images = galleryImages[activeTab];
    const index = images.findIndex((img) => img.id === selectedImage.id);

    const newIndex =
      direction === "next"
        ? (index + 1) % images.length
        : (index - 1 + images.length) % images.length;

    const nextImage = images[newIndex];

    // preload next image
    const preload = new Image();
    preload.src = nextImage.src;

    setSelectedImage(nextImage);
  };

  // keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!selectedImage) return;

      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "ArrowLeft") navigateImage("prev");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage]);

  // swipe navigation
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;

    const diff = touchStart - e.changedTouches[0].clientX;

    if (diff > 50) navigateImage("next");
    if (diff < -50) navigateImage("prev");

    setTouchStart(null);
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navigation />
      </div>

      <section className="relative font-sans text-[#5c524e] bg-[#fefaf0] py-24 px-4 overflow-hidden min-h-screen">

        {/* Soft background glow */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#f9c89e]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#b8c5d6]/20 blur-[120px] rounded-full" />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-[#453c39] mb-6 tracking-tighter">
              Camp Gallery
            </h2>

            <p className="text-lg text-[#786c67] max-w-2xl mx-auto font-medium leading-relaxed">
              Explore highlights from past sessions of Serrano Art Camp.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-[#f5e6d3] flex gap-1">
              {["week1", "week2"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-bold transition ${
                    activeTab === tab
                      ? "bg-[#a87f5d] text-white shadow"
                      : "text-[#786c67] hover:bg-[#f5e6d3]"
                  }`}
                >
                  {tab === "week1" ? "2025 Week 1" : "2025 Week 2"}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 mb-20">
            {galleryImages[activeTab].map((image) => (
              <div
                key={image.id}
                className="mb-8 break-inside-avoid cursor-pointer group"
                onClick={() => openModal(image)}
              >
                <div className="rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                <div className="mt-3 px-2">
                  <h3 className="font-bold text-[#453c39]">
                    {image.title}
                  </h3>
                  <p className="text-sm text-[#786c67]">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram Card */}
          <div className="bg-[#453c39] rounded-[3rem] p-10 text-center text-white shadow-xl">
            <FaInstagram className="text-4xl mx-auto mb-4 text-[#f9c89e]" />
            <h4 className="text-2xl font-bold mb-2">
              Follow Our Camp Journey
            </h4>
            <p className="text-[#e7dfdc] mb-6">
              See daily updates and student artwork on Instagram.
            </p>

            <a
              href="https://instagram.com/serranoartcamp"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[#f9c89e] text-[#453c39] px-8 py-4 rounded-2xl font-black hover:bg-[#fce5cf] transition"
            >
              @serranoartcamp
            </a>
          </div>

        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
          onClick={closeModal}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-3xl"
            >
              <FaTimes />
            </button>

            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full rounded-lg shadow-2xl"
            />

            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-3xl p-4"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={() => navigateImage("next")}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-3xl p-4"
            >
              <FaChevronRight />
            </button>

            <div className="text-center text-white mt-6">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <p className="text-white/70">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Gallery;