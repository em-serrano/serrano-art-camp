import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';


export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <section 
        id="contact-section"
        className="relative min-h-screen w-full overflow-hidden"
      >
        {/* Grid Background */}
        <div className="absolute inset-0 -z-10 grid-background">
          <style jsx>{`
            .grid-background {
              background-image: 
                linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px);
              background-size: 40px 40px;
              height: 100%;
            }
            
            @media (max-width: 768px) {
              .grid-background {
                background-size: 20px 20px;
              }
            }
            
            .grid-background::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: radial-gradient(circle at center, transparent 0%, transparent 30%, rgba(255, 255, 255, 0.2) 60%, rgba(255, 255, 255, 0.7) 80%, white 100%);
              pointer-events: none;
            }
          `}</style>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/30 to-transparent" />
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <NavBar />
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-4xl">
            
            {/* Header Section */}
            {/* <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className={`transform transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'
              }`}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-xl">
                  Get In Touch
                </h1>
              </div>
              
              <div className={`transform transition-all duration-1000 delay-300 ${
                isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'
              }`}>
                <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
                  Ready to bring your vision to life? Contact us today for a consultation.
                </p>
              </div>
            </div> */}

            {/* Contact Information Card */}
            <div className={`transform transition-all duration-1000 delay-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'
            }`}>
              <div className=" backdrop-blur-sm p-8 sm:p-10 lg:p-12 rounded-2xl shadow-2xl max-w-3xl mx-auto">
                
                {/* Brand Section */}
                <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                  <Brand />
                </div>

                {/* Contact Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                  
                  {/* Phone */}
                  <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="bg-blue-100 p-4 sm:p-5 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-blue-200 transition-colors">
                      <Phone size={24} className="text-blue-700 sm:w-7 sm:h-7" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2 sm:mb-3">Phone</h3>
                    <p className="text-gray-700 font-medium text-base sm:text-lg mb-1">
                      (555) 123-4567
                    </p>
                    <p className="text-gray-500 text-sm sm:text-base">
                      Call us directly
                    </p>
                  </div>

                  {/* Email */}
                  <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="bg-blue-100 p-4 sm:p-5 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-blue-200 transition-colors">
                      <Mail size={24} className="text-blue-700 sm:w-7 sm:h-7" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2 sm:mb-3">Email</h3>
                    <p className="text-gray-700 font-medium text-base sm:text-lg mb-1">
                      info@modernmillworks.com
                    </p>
                    <p className="text-gray-500 text-sm sm:text-base">
                      24-hour response
                    </p>
                  </div>

                  {/* Business Hours */}
                  <div className="text-center group hover:scale-105 transition-transform duration-300 sm:col-span-2 lg:col-span-1">
                    <div className="bg-blue-100 p-4 sm:p-5 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-blue-200 transition-colors">
                      <Clock size={24} className="text-blue-700 sm:w-7 sm:h-7" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2 sm:mb-3">Business Hours</h3>
                    <div className="text-gray-700 font-medium text-base sm:text-lg space-y-1">
                      <p>Monday - Friday</p>
                      <p>9:00 AM - 5:00 PM EST</p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mt-8 sm:mt-10 lg:mt-12 p-4 sm:p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4 text-center">
                    Why Choose Modern Millworks?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-700 text-sm sm:text-base">Free consultations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-700 text-sm sm:text-base">10-year warranty</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-700 text-sm sm:text-base">European craftsmanship</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-700 text-sm sm:text-base">Premium materials</span>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 sm:mt-10 text-center">
                  <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">
                    Ready to transform your space? We'd love to hear from you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="tel:555-123-4567"
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-blue-900 text-white font-medium text-sm sm:text-base rounded-lg hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl"
                    >
                      <Phone size={18} />
                      Call Now
                    </a>
                    <a
                      href="mailto:info@modernmillworks.com"
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-blue-900 text-blue-900 font-medium text-sm sm:text-base rounded-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
                    >
                      <Mail size={18} />
                      Send Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}