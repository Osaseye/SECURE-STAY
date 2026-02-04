import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { hotels } from '../../data/mockHotels';
import { useScrollObserver } from '../../hooks/useScrollObserver';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels.find(h => h.id === parseInt(id));
  useScrollObserver();

  // Mock Date State
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });

  if (!hotel) return <div className="p-10 text-center">Hotel not found</div>;

  // Prepare images for gallery (Main hotel image + Room images)
  const galleryImages = [
    hotel.image,
    ...(hotel.rooms?.map(r => r.image) || []),
    hotel.image // Fallback filler
  ].slice(0, 5);

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4 opacity-0 translate-y-10 animate-on-scroll">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
            <div className="flex items-center flex-wrap gap-4 text-sm">
              <div className="flex items-center text-blue-600">
                <span className="material-symbols-outlined text-lg mr-1">location_on</span>
                <span>{hotel.location}</span>
                <button className="ml-2 underline hover:text-blue-800">Show on map</button>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`material-symbols-outlined text-lg ${i < hotel.stars ? 'text-yellow-500' : 'text-gray-300'}`}>star</span>
                ))}
                <span className="text-gray-500 ml-1">({hotel.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 border border-blue-100 px-4 py-2 rounded-full flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">verified_user</span>
              <span className="text-sm font-semibold text-blue-600">Verified SecureStay</span>
            </div>
            <button className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition shadow-sm text-gray-500">
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <button className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition shadow-sm text-gray-500">
              <span className="material-symbols-outlined">ios_share</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-96 md:h-[500px] mb-8 rounded-2xl overflow-hidden relative group opacity-0 translate-y-10 animate-on-scroll delay-100">
          <div className="md:col-span-2 md:row-span-2 h-full">
            <img src={galleryImages[0]} alt="Hotel Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
          </div>
          <div className="h-full hidden md:block">
            <img src={galleryImages[1]} alt="Room View" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
          </div>
          <div className="h-full hidden md:block">
            <img src={galleryImages[2]} alt="Interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
          </div>
          <div className="h-full hidden md:block">
            <img src={galleryImages[1]} alt="Detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
          </div>
          <div className="h-full hidden md:block relative">
            <img src={galleryImages[0]} alt="Dining" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
            <button className="absolute bottom-4 right-4 bg-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 transition flex items-center gap-2">
              <span className="material-symbols-outlined text-base">grid_view</span>
              View all photos
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 opacity-0 translate-y-10 animate-on-scroll delay-200">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <section className="prose max-w-none text-gray-600">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                About this property
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200 font-normal">Eco-Certified</span>
              </h2>
              <p className="mb-4 text-base leading-relaxed">
                {hotel.description}
              </p>
              <p className="text-base leading-relaxed">
                Guests can enjoy world-class amenities including specific features like {hotel.amenities.slice(0,3).join(', ')}. 
                SecureStay guarantees your booking with our advanced fraud protection system, ensuring a hassle-free arrival.
              </p>
            </section>
            
            <hr className="border-gray-200"/>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                {hotel.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-3 text-gray-600">
                    <span className="material-symbols-outlined text-blue-600 text-xl">check_circle</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 text-blue-600 font-semibold hover:underline">Show all amenities</button>
            </section>
            
            <hr className="border-gray-200"/>
            
            <section className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600">
                  <span className="material-symbols-outlined text-3xl">shield_lock</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">SecureStay Verified Protection</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    This property has passed our rigorous AI-powered fraud detection analysis. Your payment and personal data are encrypted with military-grade security.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                      <span>Identity Verified Host</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                      <span>Secure Payment Gateway</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Guest Reviews</h2>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-blue-600">{hotel.rating}</span>
                  <div className="text-sm">
                    <p className="font-bold text-gray-900">Exceptional</p>
                    <p className="text-gray-500">{hotel.reviews} reviews</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                   <div key={i} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                        {i === 1 ? 'S' : 'M'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{i === 1 ? 'Sarah Jenkins' : 'Michael Chen'}</p>
                        <p className="text-xs text-gray-500">Verified Guest</p>
                      </div>
                      <div className="ml-auto flex text-yellow-500 text-xs">
                        {[...Array(5)].map((_, stars) => <span key={stars} className="material-symbols-outlined text-sm">star</span>)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      "{i === 1 ? "Absolutely stunning property. The views were breathtaking." : "The spa is incredible. Truly a 5-star experience."}"
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-sm text-gray-500">Price starts at</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">₦{hotel.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">/ night</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  <span className="material-symbols-outlined text-sm">trending_down</span>
                  10% off today
                </div>
              </div>

              <div className="border border-gray-300 rounded-xl mb-4 overflow-hidden">
                <div className="flex border-b border-gray-300">
                  <div className="w-1/2 p-3 border-r border-gray-300 hover:bg-gray-50 cursor-pointer transition">
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Check-in</label>
                    <input type="date" className="w-full text-sm outline-none bg-transparent p-0 text-gray-600 cursor-pointer"/>
                  </div>
                  <div className="w-1/2 p-3 hover:bg-gray-50 cursor-pointer transition">
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Check-out</label>
                    <input type="date" className="w-full text-sm outline-none bg-transparent p-0 text-gray-600 cursor-pointer"/>
                  </div>
                </div>
                <div className="p-3 hover:bg-gray-50 cursor-pointer transition">
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Guests</label>
                  <select className="w-full text-sm outline-none bg-transparent p-0 text-gray-600 cursor-pointer border-none focus:ring-0">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/hotels/${hotel.id}/rooms`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 mb-4 flex justify-center items-center gap-2"
              >
                <span>Select Room</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <p className="text-center text-xs text-gray-500 mb-6 font-medium">You won't be charged yet</p>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="underline decoration-dotted cursor-help">₦{hotel.price.toLocaleString()} x 5 nights</span>
                  <span>₦{(hotel.price * 5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline decoration-dotted cursor-help">Cleaning fee</span>
                  <span>₦15,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline decoration-dotted cursor-help">Service fee</span>
                  <span>₦5,000</span>
                </div>
              </div>
              
              <hr className="my-4 border-gray-200"/>
              
              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>Total estimate</span>
                <span>₦{(hotel.price * 5 + 20000).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-start gap-3">
              <span className="material-symbols-outlined text-gray-500">diamond</span>
              <div>
                <p className="text-sm font-semibold text-gray-900">Rare Find</p>
                <p className="text-xs text-gray-500">This place is usually booked.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HotelDetails;

