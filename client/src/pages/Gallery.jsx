import React, { useState, useRef, useEffect } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Nav";
import {
  FaCameraRetro,
  FaInstagram,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Images (keep your existing imports)
import image1 from "../assets/Week1/SunPrints.jpeg";
import image2 from "../assets/Week1/LeafPlates.jpeg";
import image3 from "../assets/Week1/WorkingOnOceans.jpeg";
import image4 from "../assets/Week1/WorkingOnPaperMach.jpeg";
import image5 from "../assets/Week1/WorkingOnFlowers.jpeg";
import image6 from "../assets/Week1/Week1Show.jpeg";

//WEEK 2 Images
import imageW2_1 from "../assets/Week2/DotsAndLines.jpeg";
import imageW2_2 from "../assets/Week2/TreasureMap.jpeg";
import imageW2_3 from "../assets/Week2/DotWolf.jpeg";
import imageW2_4 from "../assets/Week2/DotSnake.jpeg";
import imageW2_5 from "../assets/Week2/TeachingClay.jpeg";
import imageW2_6 from "../assets/Week2/Week2Show.jpeg";

const SectionHeader = ({ icon, title, description, style }) => (
  <div className="text-center mb-12">
    <h2
      className="flex items-center justify-center text-3xl font-bold mb-4"
      style={style}
    >
      <span className="mr-3 text-4xl">{icon}</span>
      {title}
    </h2>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
  </div>
);

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

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, loaded]);

  return (
    <img
      ref={imgRef}
      alt={alt}
      className={`${className} transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClick}
    />
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("week1");
  const [preloadedImages, setPreloadedImages] = useState([]);
  const modalRef = useRef();

  const galleryImages = {
    week1: [
        {
        id: 1,
        src: image1,
        alt: "Georgia O'Keefe inspired floral painting",
        title: "Floral Masterpieces",
        description:
          "Students created beautiful floral paintings inspired by Georgia O'Keefe",
      },
      {
        id: 2,
        src: image2,
        alt: "Ocean silhouette painting",
        title: "Ocean Silhouettes",
        description: "Beautiful ocean scenes with dramatic silhouettes",
      },
      {
        id: 3,
        src: image3,
        alt: "Papier mache animal sculpture",
        title: "Animal Sculptures",
        description: "Creative papier mache animal sculptures",
      },
      {
        id: 4,
        src: image4,
        alt: "Cyanotype sun prints",
        title: "Sun Prints",
        description: "Amazing cyanotype creations using natural elements",
      },
      {
        id: 5,
        src: image5,
        alt: "Clay dishes",
        title: "Clay Creations",
        description: "Handmade clay dishes and pottery",
      },
      {
        id: 6,
        src: image6,
        alt: "Art show presentation",
        title: "Art Show",
        description: "Students proudly presenting their artwork",
      },
    ],
    week2: [
       {
        id: 7,
        src: imageW2_1,
        alt: "Alma Woodsey Thomas inspired landscape",
        title: "Colorful Landscapes",
        description: "Vibrant landscapes inspired by Alma Woodsey Thomas",
      },
      {
        id: 8,
        src: imageW2_2,
        alt: "Aboriginal style animal painting",
        title: "Aboriginal Art",
        description: "Beautiful animal paintings in Aboriginal style",
      },
      {
        id: 9,
        src: imageW2_3,
        alt: "Seed mosaic artwork",
        title: "Seed Mosaics",
        description: "Intricate mosaics created with various seeds",
      },
      {
        id: 10,
        src: imageW2_4,
        alt: "Lego printmaking",
        title: "Lego Prints",
        description: "Creative printmaking using Lego blocks",
      },
      {
        id: 11,
        src: imageW2_5,
        alt: "Chalk pastel drawings",
        title: "Chalk Pastels",
        description: "Expressive chalk pastel and glue line drawings",
      },
      {
        id: 12,
        src: imageW2_6,
        alt: "Week 2 art show",
        title: "Final Showcase",
        description: "Week 2 art show with amazing creations",
      },
    ]
  };

  // Preload images for the active tab
  useEffect(() => {
    const preload = async () => {
      const images = galleryImages[activeTab].map((img) => {
        const image = new Image();
        image.src = img.src;
        return image;
      });
      setPreloadedImages(images);
    };
    preload();
  }, [activeTab]);

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (e) => {
    if (!modalRef.current || modalRef.current.contains(e.target)) return;
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction) => {
    const currentImages = galleryImages[activeTab];
    const currentIndex = currentImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % currentImages.length;
    } else {
      newIndex =
        (currentIndex - 1 + currentImages.length) % currentImages.length;
    }

    setSelectedImage(currentImages[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeModal(e);
    if (e.key === "ArrowRight") navigateImage("next");
    if (e.key === "ArrowLeft") navigateImage("prev");
  };

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", closeModal);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", closeModal);
      };
    }
  }, [selectedImage]);

  return (
    <>
        <div className="absolute top-0 left-0 right-0 z-20">
          <Navigation />
        </div>
      <section className="relative font-sans text-white bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_80%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="max-w-7xl mx-auto py-10">
          <SectionHeader
            icon={<FaCameraRetro />}
            title="Camp Gallery"
            style={{ color: "var(--secondary-color, #16a085)" }}
            description="Photos from Serrano Art Camp, Summer 2025"
          />

          {/* Tab Navigation */}
          <div className="flex justify-center text-center mb-8">
            <div className="bg-green-400 rounded-lg p-1 shadow-md">
              <button
                onClick={() => setActiveTab("week1")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === "week1"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Week 1: "Back to Nature"
              </button>
              <button
                onClick={() => setActiveTab("week2")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === "week2"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Week 2: "Dots and Lines"
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {galleryImages[activeTab].map((image) => (
              <div
                key={image.id}
                className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => openModal(image)}
              >
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  <LazyImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <FaCameraRetro className="text-blue-600 text-xl" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram Follow Section */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left">
              <FaInstagram className="text-pink-600 text-3xl mb-4 md:mb-0 md:mr-4" />
              <div>
                <p className="text-gray-700 text-lg">
                  Follow us on Instagram{" "}
                  <a
                    href="https://instagram.com/serranoartcamp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 font-bold hover:text-pink-700 transition-colors duration-200 hover:underline"
                  >
                    @serranoartcamp
                  </a>{" "}
                  for daily updates and behind-the-scenes photos!
                </p>
              </div>
            </div>
          </div>

          {/* Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
              <div className="relative max-w-4xl w-full max-h-full" ref={modalRef}>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10 bg-black/50 rounded-full p-2"
                  aria-label="Close modal"
                >
                  <FaTimes className="text-2xl" />
                </button>

                <button
                  onClick={() => navigateImage("prev")}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10 bg-black/50 rounded-full p-2"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="text-3xl" />
                </button>
                <button
                  onClick={() => navigateImage("next")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10 bg-black/50 rounded-full p-2"
                  aria-label="Next image"
                >
                  <FaChevronRight className="text-3xl" />
                </button>

                <div className="flex items-center justify-center h-full">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-w-full max-h-[90vh] object-contain"
                    loading="eager"
                  />
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