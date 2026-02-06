import React, { useState, useEffect } from 'react';

// Simple Hook for scroll animations without external libraries
const useScrollObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, []);
};

const LandingPage = () => {
  useScrollObserver();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Hero Section - REDESIGNED: Reduced top space on desktop, centralized on mobile */}
      <div className="relative min-h-[750px] md:min-h-[700px] w-full flex flex-col justify-center md:justify-start pt-0 md:pt-32 lg:pt-36 items-center overflow-hidden" id="hero-search">
        {/* Background Image with Parallax & Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <picture>
             <source media="(max-width: 768px)" srcSet="/hotel-images/hotel-7.jpg" />
             <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxM6xoR24C0Q6wYiUkJPxIuf1ppy3LCdi6CCA-CzlJ6MtDRdSNCKfAQSZobvjjN6KdZjAXGApMvw8DD-1T9egYeB_Vro1uN_C-TKNtXHmhsrPFG17ztuaGqurZTKLETl5ogh9_wohUbWNOW2qQ3jhnPMooU5ZE9w0RDuIWhsKePMf0kS9G2gZceL4v41KemXtF66MfaPWg918n-ryXlEziXPzKQxhEDk8HrDGmvGVXq1pLnezDTMiWr1Y-9w1fGDkXlxVGPScyo2xw" 
              alt="Luxury Hotel" 
              className="w-full h-full object-cover animate-pan-slow opacity-80"
            />
          </picture>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-blue-900/40 to-slate-900/90"></div>
          {/* Subtle animated pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-fade-in"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-6 lg:px-6 w-full flex flex-col items-center text-center">

            <div className="opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-on-scroll flex flex-col items-center">
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
                Sleep Soundly. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Book Securely.</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-gray-100 leading-relaxed max-w-3xl mb-10 font-light drop-shadow-md">
                The world's first hospitality platform that actively detects fraud before you checkout.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                  <a href="#destinations" className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-xl shadow-blue-900/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg group">
                    Find a Hotel
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </a>
                  <button onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-full border border-white/20 transition-all flex items-center justify-center gap-3 text-lg">
                    <span className="material-symbols-outlined">play_circle</span>
                    How it Works
                  </button>
              </div>
            </div>

        </div>

        {/* Stats Bar REMOVED */}
        
        {/* CSS for Slow Pan Animation */}
        <style>{`
            @keyframes pan-slow {
                0% { transform: scale(1.1); }
                50% { transform: scale(1.15); }
                100% { transform: scale(1.1); }
            }
            .animate-pan-slow {
                animation: pan-slow 20s ease-in-out infinite;
            }
        `}</style>
      </div>

      {/* Trust Indicators / Infinite Logo Scroll */}
      <div className="bg-white py-12 border-b border-gray-100 overflow-hidden">
        <div className="relative flex overflow-x-hidden group">
            {/* Increased spacing and ensured content width is sufficient */}
            <div className="animate-marquee flex whitespace-nowrap gap-32 items-center pr-32">
                 {/* Set 1 */}
                 {['Hilton', 'Marriott', 'Radisson', 'InterContinental', 'Sheraton', 'Four Points', 'Eko Hotel', 'Transcorp'].map((brand, i) => (
                    <span key={i} className="text-2xl font-serif font-bold hover:text-blue-600 transition-colors cursor-default text-gray-400">{brand}</span>
                 ))}
                 {/* Set 2 - Ensure seamless loop */}
                 {['Hilton', 'Marriott', 'Radisson', 'InterContinental', 'Sheraton', 'Four Points', 'Eko Hotel', 'Transcorp'].map((brand, i) => (
                    <span key={`dup-${i}`} className="text-2xl font-serif font-bold hover:text-blue-600 transition-colors cursor-default text-gray-400">{brand}</span>
                 ))}
            </div>
            
            <div className="absolute top-0 animate-marquee2 flex whitespace-nowrap gap-32 items-center pr-32" aria-hidden="true">
                 {/* Matching Set 1 */}
                 {['Hilton', 'Marriott', 'Radisson', 'InterContinental', 'Sheraton', 'Four Points', 'Eko Hotel', 'Transcorp'].map((brand, i) => (
                    <span key={`dup2-${i}`} className="text-2xl font-serif font-bold hover:text-blue-600 transition-colors cursor-default text-gray-400">{brand}</span>
                 ))}
                 {/* Matching Set 2 */}
                 {['Hilton', 'Marriott', 'Radisson', 'InterContinental', 'Sheraton', 'Four Points', 'Eko Hotel', 'Transcorp'].map((brand, i) => (
                    <span key={`dup2-dup-${i}`} className="text-2xl font-serif font-bold hover:text-blue-600 transition-colors cursor-default text-gray-400">{brand}</span>
                 ))}
            </div>
        </div>
        <style>{`
            @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-100%); }
            }
            @keyframes marquee2 {
                0% { transform: translateX(100%); }
                100% { transform: translateX(0%); }
            }
            .animate-marquee {
                animation: marquee 60s linear infinite;
            }
            .animate-marquee2 {
                animation: marquee2 60s linear infinite;
            }
        `}</style>
      </div>

      {/* Why SecureStay Section - REDESIGNED */}
      <section id="features" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-700 ease-out animate-on-scroll">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">Security Meets Simplicity.</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Advanced fraud protection that happens completely in the background.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Feature 1 */}
             <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group opacity-0 translate-y-10 animate-on-scroll delay-0">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-3xl">bolt</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Real-Time Detection</h3>
                <p className="text-gray-500 leading-relaxed">
                    Our AI analyzes 50+ data points in under 2 seconds, checking for disposable emails, proxy IPs, and unusual patterns instantly.
                </p>
             </div>

             {/* Feature 2 */}
             <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group opacity-0 translate-y-10 animate-on-scroll delay-100">
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-3xl">no_accounts</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Frictionless Experience</h3>
                <p className="text-gray-500 leading-relaxed">
                    Legitimate guests never see a CAPTCHA or extra verification step. Security that feels invisible to your best customers.
                </p>
             </div>

             {/* Feature 3 */}
             <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group opacity-0 translate-y-10 animate-on-scroll delay-200">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-3xl">shield</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Guaranteed Safety</h3>
                <p className="text-gray-500 leading-relaxed">
                    We automatically block high-risk attempts, ensuring zero chargebacks and protecting your inventory from fake reservations.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* How It Works - REDESIGNED: Centralized Horizontal Process Flow */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white overflow-hidden relative">
         {/* Background Decoration */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
             <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20 opacity-0 translate-y-10 transition-all duration-700 ease-out animate-on-scroll">
               <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
               <p className="text-gray-400 max-w-2xl mx-auto text-lg">Three simple steps to a secure booking.</p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
               {/* Connecting Line (Desktop) */}
               <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 z-0"></div>

               {/* Step 1 */}
               <div className="relative z-10 flex flex-col items-center text-center opacity-0 translate-y-10 transition-all duration-700 ease-out animate-on-scroll delay-0 group">
                  <div className="w-24 h-24 bg-slate-800 border-4 border-slate-700 group-hover:border-blue-500 rounded-full flex items-center justify-center mb-8 transition-colors duration-300 shadow-2xl">
                     <span className="material-symbols-outlined text-4xl text-blue-400">search</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">1. You Search</h3>
                  <p className="text-gray-400 leading-relaxed px-4">
                     Browse our curated list of verified hotels and select your dates.
                  </p>
               </div>

               {/* Step 2 */}
               <div className="relative z-10 flex flex-col items-center text-center opacity-0 translate-y-10 transition-all duration-700 ease-out animate-on-scroll delay-150 group">
                  <div className="w-24 h-24 bg-slate-800 border-4 border-slate-700 group-hover:border-purple-500 rounded-full flex items-center justify-center mb-8 transition-colors duration-300 shadow-2xl">
                     <span className="material-symbols-outlined text-4xl text-purple-400">psychology</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">2. AI Verifies</h3>
                  <p className="text-gray-400 leading-relaxed px-4">
                     Our system analyzes the booking signal in milliseconds without interrupting you.
                  </p>
               </div>

               {/* Step 3 */}
               <div className="relative z-10 flex flex-col items-center text-center opacity-0 translate-y-10 transition-all duration-700 ease-out animate-on-scroll delay-300 group">
                  <div className="w-24 h-24 bg-slate-800 border-4 border-slate-700 group-hover:border-green-500 rounded-full flex items-center justify-center mb-8 transition-colors duration-300 shadow-2xl">
                     <span className="material-symbols-outlined text-4xl text-green-400">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">3. Instant Confirmation</h3>
                  <p className="text-gray-400 leading-relaxed px-4">
                     Receive your confirmation instantly. Safe, secure, and ready for check-in.
                  </p>
               </div>
            </div>

            {/* Visual Indicator of "Invisible Security" */}
            <div className="mt-20 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-8 opacity-0 translate-y-10 transition-all duration-700 ease-out animate-on-scroll delay-500 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                        <span className="material-symbols-outlined text-green-400">security</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-white">Bank-Grade Encryption</h4>
                        <p className="text-sm text-gray-400">Your data is permanently protected.</p>
                    </div>
                </div>
                <div className="h-8 w-[1px] bg-slate-700 hidden md:block"></div>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                        <span className="material-symbols-outlined text-blue-400">visibility_off</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-white">Privacy First</h4>
                        <p className="text-sm text-gray-400">We never sell or share your personal info.</p>
                    </div>
                </div>
            </div>
         </div>
      </section>
      
      {/* Featured Destinations */}
      <section id="destinations" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-12 opacity-0 translate-y-10 transition-all duration-700 ease-out animate-on-scroll">
             <div>
               <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular destinations</h2>
               <p className="text-gray-500">Secure stays in top Nigerian cities.</p>
             </div>
             <a href="#" className="text-blue-600 font-semibold hover:underline hidden sm:block">View all</a>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Lagos', img: '/hotel-images/hotel-3.jpg', count: '1,204 properties', delay: 'delay-0' },
                { name: 'Abuja', img: '/hotel-images/hotel-4.jpg', count: '840 properties', delay: 'delay-100' },
                { name: 'Port Harcourt', img: '/hotel-images/hotel-5.jpg', count: '560 properties', delay: 'delay-200' },
                { name: 'Ibadan', img: '/hotel-images/hotel-6.jpg', count: '320 properties', delay: 'delay-300' }
              ].map((city, idx) => (
                 <div key={idx} className={`relative rounded-2xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-all opacity-0 translate-y-10 animate-on-scroll ${city.delay}`}>
                   <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                      <span className="text-white font-bold text-xl">{city.name}</span>
                      <span className="text-gray-300 text-sm">{city.count}</span>
                   </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Admin CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <img 
            src="/hotel-images/hotel-5.jpg" 
            alt="Admin Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/90 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center opacity-0 translate-y-10 transition-all duration-700 ease-out animate-on-scroll">
          <span className="inline-block py-1 px-3 rounded-md bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6">
            For Hotel Administrators
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Manage Fraud Detection
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Access the admin dashboard to review flagged bookings, adjust risk thresholds, and monitor system performance in real-time.
          </p>
          <div className="flex justify-center">
            <a 
              href="/admin" 
              className="bg-white text-blue-900 hover:bg-gray-50 font-bold py-4 px-10 rounded-full shadow-2xl transition-transform hover:-translate-y-1 flex items-center gap-3"
            >
              <span className="material-symbols-outlined">admin_panel_settings</span>
              Login to Admin Portal
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
