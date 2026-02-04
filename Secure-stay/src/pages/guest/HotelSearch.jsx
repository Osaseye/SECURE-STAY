import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { hotels } from '../../data/mockHotels';
import { Star, MapPin, Filter } from 'lucide-react';
import { useScrollObserver } from '../../hooks/useScrollObserver';

const HotelSearch = () => {
  const [priceRange, setPriceRange] = useState(150000);
  const [selectedStars, setSelectedStars] = useState([]);
  
  useScrollObserver();

  const toggleStar = (star) => {
    setSelectedStars(prev => 
      prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
    );
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesPrice = hotel.price <= priceRange;
    const matchesStars = selectedStars.length === 0 || selectedStars.includes(hotel.stars);
    return matchesPrice && matchesStars;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4 space-y-6 opacity-0 translate-y-10 animate-on-scroll">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-gray-900">
                <Filter size={20} />
                <h3 className="font-bold text-lg">Filters</h3>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Max Price: ₦{priceRange.toLocaleString()}</label>
                <input 
                  type="range" 
                  min="50000" 
                  max="200000" 
                  step="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₦50k</span>
                  <span>₦200k+</span>
                </div>
              </div>

              {/* Star Rating Filter */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 block">Star Rating</label>
                <div className="space-y-2">
                  {[5, 4, 3].map(star => (
                    <label key={star} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedStars.includes(star)}
                        onChange={() => toggleStar(star)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                      />
                      <div className="flex text-yellow-400">
                        {[...Array(star)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hotel Grid */}
          <div className="w-full lg:w-3/4">
             <div className="flex justify-between items-center mb-6 opacity-0 translate-y-10 animate-on-scroll">
                <h1 className="text-2xl font-bold text-gray-900">
                  {filteredHotels.length} Hotels Found
                </h1>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                </select>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHotels.map((hotel, index) => (
                  <Link 
                    to={`/hotels/${hotel.id}`} 
                    key={hotel.id} 
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col opacity-0 translate-y-10 animate-on-scroll"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
                        {hotel.rating} / 5.0
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{hotel.name}</h3>
                          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                            <MapPin size={14} />
                            {hotel.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 text-xs mb-4">
                        {[...Array(hotel.stars)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-gray-400 text-xs">Starting from</span>
                          <div className="text-xl font-bold text-blue-900">₦{hotel.price.toLocaleString()}</div>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold group-hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSearch;
