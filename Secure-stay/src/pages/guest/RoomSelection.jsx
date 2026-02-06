import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { hotels } from '../../data/mockHotels';
import { Check, User, Info } from 'lucide-react';
import { useScrollObserver } from '../../hooks/useScrollObserver';

const RoomSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels.find(h => h.id === parseInt(id));
  
  useScrollObserver();

  if (!hotel) return <div>Hotel not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 opacity-0 translate-y-10 animate-on-scroll">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Select your room</h1>
            <p className="text-gray-500">at {hotel.name}</p>
        </div>

        <div className="space-y-6">
            {hotel.rooms.map((room, index) => (
                <div 
                  key={room.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row opacity-0 translate-y-10 animate-on-scroll"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                    <div className="md:w-1/3 bg-gray-100 flex items-center justify-center min-h-[200px] relative">
                        {room.image ? (
                           <img src={room.image} alt={room.name} className="w-full h-full object-cover absolute inset-0" />
                        ) : (
                          /* Placeholder for room image */
                          <div className="text-gray-400 flex flex-col items-center">
                              <span className="material-symbols-outlined text-4xl mb-2">hotel</span>
                              <span>Room Image</span>
                          </div>
                        )}
                    </div>
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                    <User size={14} /> Max {room.capacity} Guests
                                </span>
                                {room.features.map(f => (
                                    <span key={f} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                                        <Check size={14} /> {f}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex items-end justify-between mt-6 pt-6 border-t border-gray-100">
                            <div>
                                <div className="text-sm text-gray-400 strikethrough decoration-red-500 line-through">
                                    ₦{(room.price * 1.2).toLocaleString()}
                                </div>
                                <div className="text-2xl font-bold text-gray-900">
                                    ₦{room.price.toLocaleString()}
                                    <span className="text-sm font-normal text-gray-500">/night</span>
                                </div>
                                <div className="text-green-600 text-xs font-bold mt-1">
                                    Free Cancellation
                                </div>
                            </div>
                            <button 
                                onClick={() => navigate('/booking', { state: { hotel, room } })} 
                                className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md text-sm md:text-base mt-2 md:mt-0"
                            >
                                Book This Room
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RoomSelection;
