import React, { useState, useEffect } from 'react';
import { useScrollObserver } from '../../hooks/useScrollObserver';

const GuestFormPage = () => {
  useScrollObserver();
  
  const [step, setStep] = useState(1);
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, review, success
  const [bookingRef, setBookingRef] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    country: 'Nigeria',
    phone: '',
    idType: 'passport',
    idNumber: '',
    floorPref: 'none',
    bedPref: 'king',
    specialRequests: '',
    paymentType: 'paystack',
    cardNumber: '',
    expiry: '',
    cvc: '',
    billingCountry: 'Nigeria' 
  });

  // Calculate Fraud Signals
  useEffect(() => {
    // 1. Get IP
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIpAddress(data.ip))
      .catch(() => setIpAddress('0.0.0.0'));

    // 2. Device ID Check
    if (!localStorage.getItem('securestay_device_id')) {
        localStorage.setItem('securestay_device_id', Math.random().toString(36).substring(7));
    }
  }, []);

  const getFraudSignals = () => {
     // High Value: Room Price = 985,000. Threshold = 500,000
     const high_value_booking = 1;

     // Odd Hour: Between 11PM (23) and 6AM (6)
     const hour = new Date().getHours();
     const odd_hour = (hour >= 23 || hour <= 6) ? 1 : 0;

     // Rapid Attempts: Check if last attempt was < 10 mins ago
     const lastAttempt = localStorage.getItem('last_booking_attempt');
     let rapid_attempts = 0;
     if (lastAttempt) {
        const diff = Date.now() - parseInt(lastAttempt);
        if (diff < 10 * 60 * 1000) rapid_attempts = 1; 
     }

     // Device Change: (Simulated) - In real app, check fingerprint vs user history
     // Here checking if deviceId was just created (this session) could be a proxy, 
     // but simplest is just randomly assigning or assuming 0 for verified device.
     // Let's assume 1 if no history found.
     const device_change = 0; 

     // IP Risk: Mock check (e.g. if IP is not from expected region)
     const ip_risk = 0; 
     
     return {
         country_mismatch: formData.country !== formData.billingCountry ? 1 : 0,
         rapid_attempts,
         odd_hour,
         high_value_booking,
         device_change,
         ip_risk
     };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    // Basic validation could go here
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Capture current attempt time
    localStorage.setItem('last_booking_attempt', Date.now().toString());

    // Generate Reference
    const ref = "REF-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setBookingStatus('review');

    const fraudSignals = getFraudSignals();
    
    console.log("Booking Under Review", {
      ref,
      ...formData,
      ip_address: ipAddress,
      timestamp: new Date().toISOString(),
      fraud_prediction_input: fraudSignals
    });

    // Simulate AI Microservice Analysis Delay
    setTimeout(() => {
        setBookingStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 4000); 
  };

  if (bookingStatus === 'review') {
    return (
      <div className="bg-background-light text-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
        
         <div className="max-w-4xl w-full space-y-8 mt-16 md:mt-0">
            <div className="bg-surface-light shadow-xl rounded-lg overflow-hidden border border-gray-100">
               <div className="p-8 sm:p-10">
                   <div className="text-center mb-10">
                       <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-amber-100 mb-6">
                           <span className="material-icons-outlined text-amber-500 text-5xl">gpp_maybe</span>
                       </div>
                       <h1 className="text-3xl font-bold text-gray-900 mb-3">Your booking is under review</h1>
                       <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                           For your safety, we are currently performing a standard security verification on your reservation.
                       </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                       {/* Left Column: Summary */}
                       <div className="space-y-6">
                           <h2 className="text-sm uppercase tracking-wide text-gray-500 font-semibold border-b border-gray-200 pb-2 mb-4">
                               Booking Summary
                           </h2>
                           <div className="flex items-start space-x-4">
                               <div className="flex-shrink-0">
                                   <img 
                                        alt="Hotel exterior" 
                                        className="h-24 w-32 object-cover rounded-md shadow-sm" 
                                        src="/Rooms/Room-1.jpg"
                                        onError={(e) => {e.target.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuDg8_4E15ot6BLCvN4x38UJLWVmDC7p_GmIo_wj1v3xwEV6VS_TLwjAYyzU2zp_dZGLhgAn-SVp3IHQ_uShK2gtQCV-0a42LMxGcTR3Nqak9K48YNt6sbCUYTkaxGxwEfrCWAHbzhCPE9ljCGyucW8SOPqZp0kKrMLDRAUbWp4W11gCclNT2javqdkNmt5DgdoLRelX0PNHq_Nih1MVRW8suuuEFAIu9F2FFhtLbr5up9leyfxsMK26jyn5eXd8XlbhaCvjJ9sCYgUr"}}
                                    />
                               </div>
                               <div>
                                   <h3 className="text-lg font-medium text-gray-900">Grand Horizon Suite</h3>
                                   <p className="text-sm text-gray-500">Victoria Island, Lagos</p>
                                   <p className="text-sm text-gray-500 mt-1 flex items-center">
                                       <span className="material-icons-outlined text-xs mr-1">location_on</span>
                                       123 Coastal Highway
                                   </p>
                               </div>
                           </div>
                           
                           <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                               <div className="flex justify-between text-sm">
                                   <span className="text-gray-500">Check-in</span>
                                   <span className="font-medium text-gray-900">Today</span>
                               </div>
                               <div className="flex justify-between text-sm">
                                   <span className="text-gray-500">Guests</span>
                                   <span className="font-medium text-gray-900">2 Adults</span>
                               </div>
                               <div className="border-t border-gray-200 pt-3 flex justify-between text-sm">
                                   <span className="text-gray-500">Total</span>
                                   <span className="font-bold text-gray-900">₦985,000</span>
                               </div>
                           </div>
                           
                           <div className="text-xs text-gray-400 text-center">
                               Booking Reference: <span className="font-mono text-gray-600">{bookingRef}</span>
                           </div>
                       </div>

                       {/* Right Column: Explanation */}
                       <div className="flex flex-col justify-center">
                           <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 relative">
                               <div className="absolute -top-3 left-6 bg-blue-100 text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                                   AI Security Check
                               </div>
                               <h3 className="text-lg font-semibold text-primary mb-4 mt-2">What is happening?</h3>
                               <ul className="space-y-4">
                                   <li className="flex items-start">
                                       <span className="material-icons-outlined text-primary mr-3 mt-0.5 text-xl">verified_user</span>
                                       <div>
                                           <p className="text-sm font-medium text-gray-900">Protecting your identity</p>
                                           <p className="text-xs text-gray-600 mt-0.5">Our AI is verifying that this booking was made by you to prevent unauthorized use of your account.</p>
                                       </div>
                                   </li>
                                   <li className="flex items-start">
                                       <span className="material-icons-outlined text-primary mr-3 mt-0.5 text-xl">payments</span>
                                       <div>
                                           <p className="text-sm font-medium text-gray-900">Securing the transaction</p>
                                           <p className="text-xs text-gray-600 mt-0.5">We analyze payment patterns to ensure your financial data remains safe.</p>
                                       </div>
                                   </li>
                                   <li className="flex items-start">
                                       <span className="material-icons-outlined text-primary mr-3 mt-0.5 text-xl">schedule</span>
                                       <div>
                                           <p className="text-sm font-medium text-gray-900">Quick Resolution</p>
                                           <p className="text-xs text-gray-600 mt-0.5">Most reviews are completed within seconds. You will receive an confirmation shortly.</p>
                                       </div>
                                   </li>
                               </ul>
                           </div>
                           
                           <div className="mt-8 text-center">
                               <p className="text-sm text-gray-500 mb-4">Need immediate assistance?</p>
                               <button className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                                   Contact Support
                               </button>
                           </div>
                       </div>
                   </div>
               </div>
               
               <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                   <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-semibold text-amber-600 uppercase">Review In Progress</span>
                       <span className="text-xs text-gray-500">Estimated remaining time: &lt; 1 min</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                       <div className="bg-amber-500 h-2.5 rounded-full animate-pulse" style={{width: '65%'}}></div>
                   </div>
               </div>
            </div>
            
            <p className="text-center text-sm text-gray-400">
                © 2026 SecureStay Inc. All rights reserved.
            </p>
         </div>
      </div>
    );
  }

  if (bookingStatus === 'success') {
      return (
        <div className="bg-background-light text-gray-900 min-h-screen flex flex-col items-center justify-start pb-16">
            
             <div className="w-full max-w-3xl flex flex-col gap-8 mt-8 px-4 sm:px-6 animate-fade-in-up print:mt-0 print:px-0 print:max-w-none">
                
                {/* Success Header */}
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                        <span className="material-icons-outlined text-5xl">check_circle</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Booking Confirmed!</h1>
                        <p className="text-gray-500 text-lg">Your reservation at Grand Horizon Hotel is secured.</p>
                    </div>
                </div>

                {/* AI Security Badge */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm relative overflow-hidden print:hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                         <span className="material-icons-outlined text-9xl">security</span>
                    </div>
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary z-10">
                        <span className="material-icons-outlined text-2xl">security</span>
                    </div>
                    <div className="flex-1 z-10">
                        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                            AI Security Verification
                            <span className="material-icons-outlined text-green-500 text-sm">verified</span>
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            This transaction has been analyzed and verified by our fraud detection system. Your payment is secure.
                        </p>
                    </div>
                </div>

                {/* Booking Summary Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden print:shadow-none print:border-none">
                    <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50 print:bg-white print:border-b-2 print:border-black">
                        <h3 className="text-lg font-bold text-gray-900">Booking Summary</h3>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 print:border print:border-black">
                            Confirmed
                        </span>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Hotel Info */}
                            <div className="col-span-1 md:col-span-2 flex items-start gap-4 pb-4 border-b border-gray-100 md:pb-6 print:border-black">
                                <div className="w-20 h-20 bg-cover bg-center rounded-lg shrink-0 bg-gray-200 print:hidden" style={{backgroundImage: "url('/Rooms/Room-1.jpg')"}}></div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Hotel</p>
                                    <p className="text-lg font-bold text-gray-900 leading-tight">Grand Horizon Hotel</p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                        <span className="material-icons-outlined text-sm">location_on</span>
                                        Victoria Island, Lagos
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium text-gray-500">Check-in</p>
                                <p className="text-base font-semibold text-gray-900">Oct 24, 2026</p>
                                <p className="text-xs text-gray-500">After 2:00 PM</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium text-gray-500">Check-out</p>
                                <p className="text-base font-semibold text-gray-900">Oct 28, 2026</p>
                                <p className="text-xs text-gray-500">Before 11:00 AM</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium text-gray-500">Guests</p>
                                <p className="text-base font-semibold text-gray-900">2 Adults</p>
                                <p className="text-xs text-gray-500">{formData.fullname}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium text-gray-500">Booking Reference</p>
                                <p className="text-base font-mono font-semibold text-gray-900">{bookingRef}</p>
                            </div>

                            <div className="flex flex-col gap-1 pt-4 border-t border-gray-100 md:border-none md:pt-0 print:border-black">
                                <p className="text-sm font-medium text-gray-500">Payment Method</p>
                                <div className="flex items-center gap-2">
                                    <span className="material-icons-outlined text-gray-400">credit_card</span>
                                    <p className="text-base font-semibold text-gray-900 capitalize">{formData.paymentType} ending in {formData.cardNumber.slice(-4) || '****'}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 pt-4 border-t border-gray-100 md:border-none md:pt-0 print:border-black">
                                <p className="text-sm font-medium text-gray-500">Total Price</p>
                                <p className="text-2xl font-bold text-primary">₦985,000</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 print:hidden">
                    <button 
                        onClick={() => window.print()}
                        className="flex-1 sm:flex-initial h-12 px-8 bg-primary hover:bg-secondary text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-200"
                    >
                        <span className="material-icons-outlined">download</span>
                        <span>Download Receipt</span>
                    </button>
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="flex-1 sm:flex-initial h-12 px-8 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <span className="material-icons-outlined">home</span>
                        <span>Return to Home</span>
                    </button>
                </div>
                
                {/* Print Only Footer */}
                <div className="hidden print:block text-center mt-8 text-sm text-gray-500 border-t pt-4">
                    <p>© 2026 SecureStay. Automated Receipt.</p>
                </div>
             </div>
        </div>
      );
  }

  return (
    <div className="bg-background-light text-gray-900 min-h-screen flex flex-col">
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span className="mx-2 material-icons-outlined text-base">chevron_right</span>
            <a href="/hotels" className="hover:text-primary transition-colors">Hotels</a>
            <span className="mx-2 material-icons-outlined text-base">chevron_right</span>
             <span className="whitespace-nowrap">Grand Horizon</span>
             <span className="mx-2 material-icons-outlined text-base">chevron_right</span>
             <span className="whitespace-nowrap">Select Room</span>
            <span className="mx-2 material-icons-outlined text-base">chevron_right</span>
            <span className="text-primary font-bold">Secure Checkout</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Room Summary Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1 opacity-0 translate-y-10 animate-on-scroll delay-100">
            <div className="bg-surface-light rounded-xl shadow-lg overflow-hidden border border-gray-100 sticky top-24">
              <div className="relative h-48">
                <img 
                  alt="Luxury Hotel Room" 
                  className="w-full h-full object-cover" 
                  src="/Rooms/Room-1.jpg" 
                  onError={(e) => {e.target.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuDg8_4E15ot6BLCvN4x38UJLWVmDC7p_GmIo_wj1v3xwEV6VS_TLwjAYyzU2zp_dZGLhgAn-SVp3IHQ_uShK2gtQCV-0a42LMxGcTR3Nqak9K48YNt6sbCUYTkaxGxwEfrCWAHbzhCPE9ljCGyucW8SOPqZp0kKrMLDRAUbWp4W11gCclNT2javqdkNmt5DgdoLRelX0PNHq_Nih1MVRW8suuuEFAIu9F2FFhtLbr5up9leyfxsMK26jyn5eXd8XlbhaCvjJ9sCYgUr"}}
                />
                <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 m-4 rounded-full">
                  Verified Safe
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Grand Horizon Suite</h3>
                <p className="text-sm text-gray-500 mb-4">Victoria Island, Lagos</p>
                
                <div className="border-t border-gray-200 py-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Check-in</span>
                    <span className="font-medium text-gray-900">Oct 24, 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Check-out</span>
                    <span className="font-medium text-gray-900">Oct 28, 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Guests</span>
                    <span className="font-medium text-gray-900">2 Adults</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total</span>
                    <span className="text-2xl font-bold text-primary">₦985,000</span>
                  </div>
                  <div className="text-xs text-gray-400">Includes VAT and consumption tax</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 order-1 lg:order-2 opacity-0 translate-y-10 animate-on-scroll">
            <div className="bg-surface-light rounded-xl shadow-lg p-8 border border-gray-100">
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Secure Booking</h1>
                  <p className="text-sm text-gray-500 mt-1">Please fill in your details below.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step {step} of 2</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${step === 1 ? '50%' : '100%'}` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 flex items-start gap-3">
                <span className="material-icons-outlined text-primary mt-0.5">verified_user</span>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">AI-Powered Verification</h4>
                  <p className="text-sm text-gray-600">Your booking is monitored by SecureStay AI to prevent fraud and ensure secure Naira transactions.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step 1: Guest Information */}
                {step === 1 && (
                  <div className="animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullname">Full Name</label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-icons-outlined text-gray-400 text-lg">person</span>
                          </div>
                          <input 
                            type="text" 
                            name="fullname" 
                            id="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            className="block w-full pl-10 sm:text-sm border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-primary focus:border-primary py-3"
                            placeholder="Chinedu Okafor"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-icons-outlined text-gray-400 text-lg">email</span>
                          </div>
                          <input 
                            type="email" 
                            name="email" 
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full pl-10 sm:text-sm border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-primary focus:border-primary py-3"
                            placeholder="c.okafor@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="country">Country of Residence</label>
                        <select 
                          id="country" 
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-white text-gray-900"
                        >
                          <option>Nigeria</option>
                          <option>Ghana</option>
                          <option>Kenya</option>
                          <option>United Kingdom</option>
                          <option>United States</option>
                          <option>Canada</option>
                        </select>
                      </div>

                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full sm:text-sm border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-primary focus:border-primary py-3"
                          placeholder="+234 801 234 5678"
                          required
                        />
                      </div>
                      
                      {/* Added ID Verification Field for Fraud Check Completeness */}
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="idType">ID Type</label>
                        <select 
                          id="idType" 
                          name="idType"
                          value={formData.idType}
                          onChange={handleChange}
                          className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-white text-gray-900"
                        >
                          <option value="passport">International Passport</option>
                          <option value="nin">NIN (National ID)</option>
                          <option value="drivers_license">Driver's License</option>
                        </select>
                      </div>
                      
                       <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="idNumber">ID Number</label>
                        <input 
                          type="text" 
                          name="idNumber" 
                          id="idNumber"
                          value={formData.idNumber}
                          onChange={handleChange}
                          className="block w-full sm:text-sm border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-primary focus:border-primary py-3"
                          placeholder="A01234567"
                          required
                        />
                      </div>

                    </div>

                    <div className="pt-6 border-t border-gray-100 mt-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Guest Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="floor-pref">Floor Preference</label>
                          <div className="relative">
                            <select 
                              id="floor-pref" 
                              name="floorPref"
                              value={formData.floorPref}
                              onChange={handleChange}
                              className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-white text-gray-900 appearance-none"
                            >
                              <option value="none">No Preference</option>
                              <option value="high">High Floor</option>
                              <option value="low">Low Floor</option>
                              <option value="quiet">Quiet Zone</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="material-icons-outlined text-gray-400">expand_more</span>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bed-pref">Bed Configuration</label>
                          <div className="relative">
                            <select 
                              id="bed-pref" 
                              name="bedPref"
                              value={formData.bedPref}
                              onChange={handleChange}
                              className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-white text-gray-900 appearance-none"
                            >
                              <option value="king">King Size</option>
                              <option value="twin">Twin Beds</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="material-icons-outlined text-gray-400">expand_more</span>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-1 md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="special-requests">Special Requests</label>
                          <textarea 
                            id="special-requests" 
                            name="specialRequests" 
                            value={formData.specialRequests}
                            onChange={handleChange}
                            rows="2"
                            className="block w-full sm:text-sm border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-primary focus:border-primary py-3"
                            placeholder="e.g. Airport pickup, Late check-in..."
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 mt-4">
                      <button 
                        type="button" 
                        onClick={handleNextStep}
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                      >
                        Next: Payment Details
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Method */}
                {step === 2 && (
                  <div className="animate-fade-in">
                    <div className="pt-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Payment Method</h3>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="payment-type">Select Payment Type</label>
                        <div className="relative">
                          <select 
                            id="payment-type" 
                            name="paymentType"
                            value={formData.paymentType}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-white text-gray-900 appearance-none"
                          >
                            <option value="paystack">Paystack (Mock) - Card, Bank, USSD</option>
                            <option value="flutterwave">Flutterwave (Mock)</option>
                            <option value="transfer">Direct Bank Transfer</option>
                          </select>
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-icons-outlined text-gray-400 text-lg">payment</span>
                          </div>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="material-icons-outlined text-gray-400">expand_more</span>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Secure transactions supported by Verve, Mastercard, and Visa.</p>
                      </div>

                      <div className="mb-4">
                           <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="billingCountry">Billing Country</label>
                           <select 
                            id="billingCountry" 
                            name="billingCountry"
                            value={formData.billingCountry}
                            onChange={handleChange}
                            className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-white text-gray-900"
                          >
                            <option>Nigeria</option>
                            <option>Ghana</option>
                            <option>Kenya</option>
                            <option>United Kingdom</option>
                            <option>United States</option>
                            <option>Canada</option>
                          </select>
                          <p className="mt-1 text-xs text-gray-500">Used for fraud detection cross-referencing.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="card-number">Card Number</label>
                          <input 
                            type="text" 
                            name="cardNumber" 
                            id="card-number"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="block w-full sm:text-sm border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-primary focus:border-primary py-3"
                            placeholder="0000 0000 0000 0000"
                          />
                        </div>
                        
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="expiry">Expiration Date</label>
                          <input 
                            type="text" 
                            name="expiry" 
                            id="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                            className="block w-full sm:text-sm border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-primary focus:border-primary py-3"
                            placeholder="MM / YY"
                          />
                        </div>
                        
                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cvc">CVV</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              name="cvc" 
                              id="cvc"
                              value={formData.cvc}
                              onChange={handleChange}
                              className="block w-full sm:text-sm border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-primary focus:border-primary py-3"
                              placeholder="123"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer group">
                              <span className="material-icons-outlined text-gray-400 text-sm group-hover:text-primary">help_outline</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 flex gap-4">
                      <button 
                        type="button" 
                        onClick={handlePrevStep}
                        className="w-1/3 flex justify-center py-4 px-4 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        className="w-2/3 flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                      >
                        Pay ₦985,000 & Confirm
                      </button>
                    </div>
                    <p className="mt-4 text-center text-xs text-gray-500">
                      By clicking the button, you agree to SecureStay's <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuestFormPage;

