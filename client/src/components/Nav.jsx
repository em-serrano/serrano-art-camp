import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '/paintbrush.svg';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const handleMenuToggle = () => {
    if (!isMenuOpen) window.scrollTo({ top: 0, behavior: 'instant' });
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#fefaf0]/80 backdrop-blur-lg shadow-sm border-b border-[#f5e6d3]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center group">
              <div className="bg-[#f9c89e]/20 p-2 rounded-xl group-hover:bg-[#f9c89e] transition-colors duration-300">
                <img src={Logo} alt="Logo" className="h-7 w-7" />
              </div>
              <h3 className={`ml-3 text-xl md:text-2xl font-black tracking-tight transition-colors duration-300 ${
                scrolled || location.pathname !== '/' ? 'text-[#453c39]' : 'text-white'
              }`}>
                Serrano <span className="font-light">Art Camp</span>
              </h3>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'Pricing & Details' },
                { to: '/gallery', label: 'Camp Gallery' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                    isActive(to)
                      ? scrolled || location.pathname !== '/'
                        ? 'bg-[#f9c89e] text-[#453c39] shadow-sm'
                        : 'bg-[#fefaf0] text-[#453c39] shadow-xl'
                      : scrolled || location.pathname !== '/'
                      ? 'text-[#786c67] hover:text-[#a87f5d] hover:bg-[#f5e6d3]'
                      : 'text-[#bc712f] hover:text-[#fefaf0] hover:bg-white/10'
                  }`}
                >
                  {label}
                </Link>
              ))}

              <Link
                to="/registration"
                className={`ml-4 px-6 py-2.5 rounded-full font-black text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-lg ${
                  scrolled || location.pathname !== '/'
                    ? 'bg-[#f9c89e] text-[#453c39] hover:bg-[#453c39] hover:text-[#fefaf0]'
                    : 'bg-[#fefaf0] text-[#453c39] hover:bg-[#f9c89e]'
                }`}
              >
                Register Now
              </Link>
            </div>

            <div className="md:hidden relative z-[110]">
              <button
                onClick={handleMenuToggle}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className={`p-2 rounded-xl transition-colors ${
                  isMenuOpen
                    ? 'text-[#453c39] bg-[#f9c89e]/20'
                    : scrolled || location.pathname !== '/'
                    ? 'text-[#453c39] bg-[#f5e6d3]'
                    : 'text-white bg-white/10'
                }`}
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-current transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
                  <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-current transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[105] bg-[#fefaf0] flex flex-col items-center justify-center space-y-8 transition-all duration-500 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onTouchMove={(e) => e.preventDefault()}
      >
        {[
          { to: '/', label: 'Home' },
          { to: '/about', label: 'Pricing & Details' },
          { to: '/gallery', label: 'Camp Gallery' },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`text-3xl font-black transition-colors ${isActive(to) ? 'text-[#a87f5d]' : 'text-[#453c39] hover:text-[#a87f5d]'}`}
          >
            {label}
          </Link>
        ))}
        <Link
          to="/registration"
          className="px-10 py-4 bg-[#f9c89e] text-[#453c39] text-xl font-black rounded-2xl shadow-lg"
        >
          Register Now
        </Link>
      </div>
    </>
  );
};

export default Navigation;