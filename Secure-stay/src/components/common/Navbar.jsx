import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Offset for sticky navbar
      const offset = 100;
      const sections = ['hero-search', 'how-it-works', 'features', 'destinations'];
      
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.getBoundingClientRect().top;
          // If the top of the section is within the viewport (or slightly above/below)
          if (top < window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = (sectionId) => `
    text-sm font-medium transition-all duration-300 relative group
    ${activeSection === sectionId ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}
  `;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={() => window.location.href = '/'}>
            <img 
              src="/icon.png" 
              alt="SecureStay Logo" 
              className="h-10 w-auto group-hover:scale-105 transition-transform"
            />
            <span className="font-bold text-xl text-blue-900 tracking-tight">
              SecureStay
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#how-it-works" className={navLinkClass('how-it-works')}>
              How It Works
              <span className={`absolute bottom-[-24px] left-0 w-full h-[3px] bg-blue-600 transition-transform duration-300 origin-left ${activeSection === 'how-it-works' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
            <a href="#features" className={navLinkClass('features')}>
              Why SecureStay
               <span className={`absolute bottom-[-24px] left-0 w-full h-[3px] bg-blue-600 transition-transform duration-300 origin-left ${activeSection === 'features' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
            <a href="#destinations" className={navLinkClass('destinations')}>
              Destinations
               <span className={`absolute bottom-[-24px] left-0 w-full h-[3px] bg-blue-600 transition-transform duration-300 origin-left ${activeSection === 'destinations' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
          </div>

          {/* Right Action Section */}
          <div className="flex items-center space-x-4">
            <a 
              href="#hero-search" 
              className="px-6 py-2.5 rounded-md text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
            >
              <span className="block sm:hidden">Book Now</span>
              <span className="hidden sm:block">Book a Room Now</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
