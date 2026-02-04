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
  const [activeStep, setActiveStep] = useState(0);
  useScrollObserver();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 1,
      title: "You Search & Book",
      desc: "Select your hotel and enter your details. It looks just like any other booking site.",
      icon: "touch_app",
      color: "blue"
    },
    {
      id: 2,
      title: "AI Analyzes in Background",
      desc: "While you submit, our model calculates a risk score based on booking value, timing, and location.",
      icon: "psychology",
      color: "purple"
    },
    {
      id: 3,
      title: "Instant Decision",
      desc: "Low Risk? Approved immediately. High Risk? Blocked to protect the hotel.",
      icon: "verified_user",
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative min-h-[600px] h-auto md:h-[650px] w-full flex flex-col justify-center" id="hero-search">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <picture>
             <source media="(max-width: 768px)" srcSet="/hotel-images/hotel-7.jpg" />
             <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxM6xoR24C0Q6wYiUkJPxIuf1ppy3LCdi6CCA-CzlJ6MtDRdSNCKfAQSZobvjjN6KdZjAXGApMvw8DD-1T9egYeB_Vro1uN_C-TKNtXHmhsrPFG17ztuaGqurZTKLETl5ogh9_wohUbWNOW2qQ3jhnPMooU5ZE9w0RDuIWhsKePMf0kS9G2gZceL4v41KemXtF66MfaPWg918n-ryXlEziXPzKQxhEDk8HrDGmvGVXq1pLnezDTMiWr1Y-9w1fGDkXlxVGPScyo2xw" 
              alt="Luxury Hotel" 
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/80 to-blue-900/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-0">
          <div className="max-w-3xl mb-10 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-on-scroll">
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
              Stay Secure.<br/> Book Smarter.
            </h1>
            <p className="text-lg md:text-2xl text-blue-100 leading-relaxed max-w-2xl drop-shadow-md">
              The first hotel booking platform that validates reservations in real-time using AI. No logins. No hassle. Just pure security.
            </p>
          </div>

          {/* Glassmorphism Search Bar */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-white/20 max-w-4xl opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-out animate-on-scroll">
            <form className="grid grid-cols-1 md:grid-cols-12 gap-2 bg-white rounded-xl p-1">
              <div className="md:col-span-4 bg-transparent p-3 flex items-center gap-3 border-b md:border-b-0 md:border-r border-gray-100">
                <span className="material-symbols-outlined text-blue-600">bed</span>
                <div className="flex flex-col w-full">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Location</label>
                  <input 
                    type="text" 
                    placeholder="Where are you going?" 
                    className="w-full outline-none text-gray-900 font-semibold placeholder-gray-400 bg-transparent"
                  />
                </div>
              </div>
              <div className="md:col-span-3 bg-transparent p-3 flex items-center gap-3 border-b md:border-b-0 md:border-r border-gray-100">
                <span className="material-symbols-outlined text-blue-600">calendar_month</span>
                <div className="flex flex-col w-full">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Dates</label>
                  <input 
                    type="text" 
                    placeholder="Check-in — Check-out" 
                    className="w-full outline-none text-gray-900 font-semibold placeholder-gray-400 bg-transparent"
                  />
                </div>
              </div>
              <div className="md:col-span-3 bg-transparent p-3 flex items-center gap-3">
                 <span className="material-symbols-outlined text-blue-600">person</span>
                 <div className="flex flex-col w-full">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Guests</label>
                  <input 
                    type="text" 
                    placeholder="2 guests, 1 room" 
                    className="w-full outline-none text-gray-900 font-semibold placeholder-gray-400 bg-transparent"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <button type="button" className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 py-4 md:py-0">
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Why SecureStay Section */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 opacity-0 translate-y-10 transition-all duration-700 ease-out animate-on-scroll">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm bg-blue-50 px-4 py-1.5 rounded-full">Secure Architecture</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6 mb-6">Hotel Booking Reimagined</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We solve the problem of fake bookings and automated abuse without adding friction to your experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: 'bolt', title: 'Real-Time Detection', desc: 'Checks keywords, patterns, and timing instantly.', delay: 'delay-0' },
              { icon: 'no_accounts', title: 'Guest-First Experience', desc: 'No sign-ups. No passwords. No profiles.', delay: 'delay-150' },
              { icon: 'psychology_alt', title: 'Explainable AI', desc: 'Transparent risk scoring based on behavior.', delay: 'delay-300' }
            ].map((feature, idx) => (
              <div key={idx} className={`bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100 group opacity-0 translate-y-10 animate-on-scroll ${feature.delay}`}>
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (Step by Step Animation) */}
      <section id="how-it-works" className="py-24 bg-gray-900 text-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
               
               {/* Left Content - Changing Steps */}
               <div className="space-y-12 opacity-0 translate-y-10 transition-all duration-700 ease-out animate-on-scroll">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8">How Protection Works</h2>
                  
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-800"></div>

                    <div className="space-y-8 relative z-10">
                      {steps.map((step, index) => (
                        <div 
                          key={step.id}
                          className={`flex gap-6 transition-all duration-500 ${
                            index === activeStep 
                              ? 'opacity-100 translate-x-2' 
                              : 'opacity-40 grayscale hover:opacity-70 cursor-pointer'
                          }`}
                          onClick={() => setActiveStep(index)}
                        >
                          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-colors duration-300 bg-gray-900 ${
                            index === activeStep ? 'border-blue-500 text-blue-400' : 'border-gray-700 text-gray-600'
                          }`}>
                            {step.id}
                          </div>
                          <div>
                            <h4 className={`text-xl font-bold mb-2 ${index === activeStep ? 'text-white' : 'text-gray-400'}`}>
                              {step.title}
                            </h4>
                            <p className="text-gray-400 max-w-sm leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
               
               {/* Right Visual - Animated Mockup Changing based on Step */}
               <div className="relative h-auto min-h-[400px] md:h-[500px] w-full flex items-center justify-center opacity-0 translate-y-10 transition-all duration-700 delay-300 ease-out animate-on-scroll">
                  <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full"></div>
                  
                  <div className="relative bg-white text-gray-900 p-4 sm:p-8 rounded-3xl shadow-2xl border-2 sm:border-4 border-gray-800 w-full max-w-md overflow-hidden min-h-[400px]">
                      {/* Step 1 Visual */}
                      <div className={`transition-all duration-700 absolute inset-0 flex flex-col items-center justify-center p-8 ${activeStep === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <span className="material-symbols-outlined text-5xl text-blue-600">touch_app</span>
                          </div>
                          <h3 className="text-2xl font-bold text-center mb-2">User Booking</h3>
                          <div className="w-full bg-gray-100 p-3 rounded-lg mt-4 space-y-2">
                             <div className="h-2 w-3/4 bg-gray-300 rounded"></div>
                             <div className="h-2 w-1/2 bg-gray-300 rounded"></div>
                          </div>
                      </div>

                      {/* Step 2 Visual */}
                      <div className={`transition-all duration-700 absolute inset-0 flex flex-col items-center justify-center p-8 bg-blue-600 text-white ${activeStep === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                          <div className="relative mb-6">
                            <span className="material-symbols-outlined text-6xl animate-spin-slow">settings</span>
                            <span className="material-symbols-outlined text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">psychology</span>
                          </div>
                          <h3 className="text-2xl font-bold text-center mb-2">AI Analysis</h3>
                          <div className="font-mono text-xs bg-blue-800/50 p-4 rounded-lg mt-4 w-full">
                             <p className="flex justify-between"><span className="opacity-50">RISK_SCORE:</span> <span className="text-green-300">CALCULATING...</span></p>
                             <p className="flex justify-between mt-1"><span className="opacity-50">LOCATION:</span> <span className="text-yellow-300">CHECKING</span></p>
                          </div>
                      </div>

                       {/* Step 3 Visual */}
                      <div className={`transition-all duration-700 absolute inset-0 flex flex-col items-center justify-center p-8 ${activeStep === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 scale-110">
                            <span className="material-symbols-outlined text-5xl text-green-600">check_circle</span>
                          </div>
                          <h3 className="text-2xl font-bold text-center mb-2 text-green-700">Booking Approved</h3>
                          <p className="text-center text-gray-500">Transaction verified securely.</p>
                      </div>

                      {/* Progress Bar Bottom */}
                      <div className="absolute bottom-6 left-8 right-8 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 transition-all duration-300 ease-linear" style={{ width: `${((activeStep + 1) / 3) * 100}%` }}></div>
                      </div>
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
