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

const LazyImage = ({ src, alt, className, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loaded) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              if (imgRef.current) {
                imgRef.current.src = src;
                setLoaded(true);
              }
            };
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px" }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, [src, loaded]);

  return (
    <img
      ref={imgRef}
      alt={alt}
      className={`${className} transition-opacity duration-700 ease-in-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClick}
    />
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("week1");
  const modalRef = useRef();

  const galleryImages = {
    week1: [
      { id: 1, src: image5, alt: "Flower Painting", title: "Floral Masterpieces", description: "Georgia O'Keefe inspired floral painting" },
      { id: 2, src: image3, alt: "Ocena Painting", title: "Ocean Silhouettes", description: "Dramatic ocean scenes with silhouettes" },
      { id: 3, src: image4, alt: "Paper Mache", title: "Animal Sculptures", description: "Creative papier mache animal sculptures" },
      { id: 4, src: image1, alt: "Cyanotype", title: "Sun Prints", description: "Cyanotype creations using natural elements" },
      { id: 5, src: image2, alt: "Leaf Plates", title: "Clay Creations", description: "Handmade clay dishes and pottery" },
      { id: 6, src: image6, alt: "Art Show", title: "Art Show", description: "Students proudly presenting their artwork" },
    ],
    week2: [
      { id: 7, src: imageW2_1, alt: "Dot Landscape", title: "Colorful Landscapes", description: "Vibrant landscapes inspired by Alma Thomas" },
      { id: 8, src: imageW2_2, alt: "Map", title: "Treasure Map", description: "Aged treasure map using rice and coffee" },
      { id: 9, src: imageW2_3, alt: "Seed Mosaics", title: "Seed Mosaics", description: "Intricate snake mosaic created with various seeds" },
      { id: 10, src: imageW2_5, alt: "Lego Prints", title: "Lego Prints", description: "Creative printmaking using Lego blocks" },
      { id: 11, src: imageW2_4, alt: "Chalk and Glue", title: "Chalk Pastels", description: "Expressive chalk pastel and glue line drawings" },
      { id: 12, src: imageW2_6, alt: "Art Show 2", title: "Final Showcase", description: "Week 2 art show with amazing creations" },
    ]
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
    const currentImages = galleryImages[activeTab];
    const currentIndex = currentImages.findIndex((img) => img.id === selectedImage.id);
    let newIndex = direction === "next" 
      ? (currentIndex + 1) % currentImages.length 
      : (currentIndex - 1 + currentImages.length) % currentImages.length;
    setSelectedImage(currentImages[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "ArrowLeft") navigateImage("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navigation />
      </div>

      <section className="relative font-sans text-slate-800 bg-slate-50 py-24 px-4 overflow-hidden min-h-screen">
        {/* Ambient Background Pattern */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_80%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto py-10">
          {/* Header */}
          <div className="text-center mb-16">
           <h2 className="text-5xl md:text-7xl font-black text-[#453c39] mb-6 tracking-tighter">
              Camp Gallery
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Explore the colorful highlights from Serrano Art Camp 2025.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 inline-flex gap-1">
              {["week1", "week2"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-sky-600 text-white shadow-lg shadow-sky-200"
                      : "text-slate-500 hover:bg-slate-50 hover:text-sky-600"
                  }`}
                >
                  {tab === "week1" ? 'Week 1: "Back to Nature"' : 'Week 2: "Dots and Lines"'}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {galleryImages[activeTab].map((image) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:border-sky-200 transition-all duration-500 cursor-pointer"
                onClick={() => openModal(image)}
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-200">
                  <LazyImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-sky-600 transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram Footer Card */}
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-5 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10">
                  <FaInstagram className="text-sky-400 text-4xl" />
                </div>
                <div>
                  <h4 className="text-white text-2xl font-bold">Follow the Journey</h4>
                  <p className="text-slate-400 text-lg mt-1">Get daily updates and behind-the-scenes magic.</p>
                </div>
              </div>
              <a
                href="https://instagram.com/serranoartcamp"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 hover:bg-white hover:text-sky-900 text-white px-10 py-4 rounded-full font-black transition-all shadow-xl hover:-translate-y-1 active:scale-95 whitespace-nowrap"
              >
                @serranoartcamp
              </a>
            </div>
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div 
              className="fixed inset-0 bg-slate-950/95 flex items-center justify-center z-50 p-4 md:p-10 backdrop-blur-lg"
              onClick={closeModal}
            >
              <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={closeModal}
                  className="absolute -top-12 right-0 md:top-0 md:-right-12 text-white/50 hover:text-white transition-colors p-2"
                >
                  <FaTimes className="text-3xl" />
                </button>

                <div className="relative w-full h-full flex items-center justify-center">
                  <button
                    onClick={() => navigateImage("prev")}
                    className="absolute left-0 md:-left-16 p-4 text-white/30 hover:text-white transition-all hover:bg-white/10 rounded-full"
                  >
                    <FaChevronLeft className="text-4xl" />
                  </button>
                  
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />

                  <button
                    onClick={() => navigateImage("next")}
                    className="absolute right-0 md:-right-16 p-4 text-white/30 hover:text-white transition-all hover:bg-white/10 rounded-full"
                  >
                    <FaChevronRight className="text-4xl" />
                  </button>
                </div>
                
                <div className="mt-6 text-center">
                  <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
                  <p className="text-white/60 mt-1">{selectedImage.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Gallery;