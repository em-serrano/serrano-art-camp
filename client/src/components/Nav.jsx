import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '/paintbrush.svg';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="relative font-montserrat bg-gradient-to- from-purple-900/90 via-blue-900/70 to-transparent pb-1">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 md:py-5">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-10 w-10 mr-2" />
            <h3 className="text-2xl md:text-3xl text-teal-100 tracking-wide">
              Serrano Art Camp
            </h3>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-lg">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About & Pricing' },
              { to: '/gallery', label: 'Gallery' }
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`transition-all duration-300 px-2 py-1 rounded-md ${
                  isActive(to)
                    ? 'text-teal-300 underline underline-offset-4'
                    : 'text-teal-100 hover:text-teal-300 hover:underline'
                }`}
              >
                {label}
              </Link>
            ))}
            {/* <Link
              to="/registration"
              className="ml-2 px-4 py-2 bg-teal-100 text-indigo-900 font-medium rounded-lg hover:bg-white transition-all"
            >
              Register Here
            </Link> */}
                 <a
              href="https://forms.gle/r6o7VPQYToFi8fUV7"
              className="ml-2 px-4 py-2 bg-teal-100 text-indigo-900 font-medium rounded-lg hover:bg-white transition-all"
            >
              Join Our Mail List
            </a>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 w-10 h-10 flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
                <span
                  className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-white transition-opacity duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-gradient-to-b from-indigo-900 via-teal-800 to-transparent backdrop-blur-md transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-4 py-24">
          <div className="flex flex-col items-center space-y-8 text-xl text-teal-100">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/gallery', label: 'Gallery' }
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`transition-colors ${
                  isActive(to)
                    ? 'text-white font-semibold underline'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/registration"
              className="mt-8 px-8 py-3 bg-teal-100 text-indigo-900 text-lg rounded-lg hover:bg-white transition"
            >
              Register Here
            </Link>
          </div>
        </div>
      </div>

      {/* Fade Line Effect */}
      <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-b from-transparent to-white/0 pointer-events-none" />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');
      `}</style>
    </nav>
  );
};

export default Navigation;
