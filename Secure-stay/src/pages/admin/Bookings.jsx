import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { subscribeToBookings } from '../../services/bookingService';

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to realtime bookings
    const unsubscribe = subscribeToBookings((data) => {
      setBookings(data);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const guestName = booking.guestName || 'Unknown';
    const id = booking.id || '';
    const matchesSearch = guestName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
            <p className="text-gray-500">View and manage all guest reservations.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <span className="material-icons-outlined absolute left-3 top-2.5 text-gray-400">search</span>
                <input 
                   type="text" 
                   placeholder="Search guest or ID..." 
                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                />
             </div>
             <select 
                className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
             >
                <option value="All">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Under Review">Under Review</option>
                <option value="Rejected">Rejected</option>
             </select>
          </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-4 font-medium">Booking ID</th>
                        <th className="px-6 py-4 font-medium">Guest Info</th>
                        <th className="px-6 py-4 font-medium">Room & Dates</th>
                        <th className="px-6 py-4 font-medium">Method</th>
                        <th className="px-6 py-4 font-medium">Fraud Score</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {loading ? (
                        <tr>
                            <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                <span className="material-icons-outlined animate-spin mr-2">refresh</span>
                                Loading bookings...
                            </td>
                        </tr>
                    ) : filteredBookings.length === 0 ? (
                        <tr>
                             <td colSpan="7" className="p-8 text-center text-gray-500">
                                 <span className="material-icons-outlined text-4xl mb-2 text-gray-300">search_off</span>
                                 <p>No bookings found matching your criteria.</p>
                             </td>
                        </tr>
                    ) : (
                        filteredBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <span className="font-mono text-sm text-primary font-medium">{booking.id.substring(0, 8)}...</span>
                                <p className="text-xs text-gray-400">
                                    {booking.createdAt?.toDate ? booking.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                </p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                        {(booking.guestName || 'U').charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{booking.guestName}</p>
                                        <p className="text-xs text-gray-500">{booking.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-sm text-gray-900">{booking.roomType}</p>
                                <p className="text-xs text-gray-500">{booking.checkIn} - {booking.checkOut}</p>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                                    booking.bookingChannel === 'Mobile' ? 'bg-purple-50 text-purple-700' : 
                                    booking.bookingChannel === 'Web' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
                                }`}>
                                    <span className="material-icons-outlined text-[14px]">
                                        {booking.bookingChannel === 'Mobile' ? 'smartphone' : booking.bookingChannel === 'Web' ? 'language' : 'cloud'}
                                    </span>
                                    {booking.bookingChannel}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                     <div className={`w-2 h-2 rounded-full ${booking.fraudScore > 80 ? 'bg-red-500' : booking.fraudScore > 20 ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                                     <span className={`text-sm font-bold ${booking.fraudScore > 80 ? 'text-red-700' : booking.fraudScore > 20 ? 'text-amber-700' : 'text-green-700'}`}>
                                        {booking.fraudScore}
                                     </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                                    booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-100' :
                                    booking.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                                    'bg-amber-50 text-amber-700 border-amber-100'
                                }`}>
                                    {booking.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link to={`/admin/bookings/${booking.id}`} className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-gray-100 rounded-full">
                                    <span className="material-icons-outlined">visibility</span>
                                </Link>
                            </td>
                        </tr>
                    )))}
                </tbody>
             </table>
             
             {/* Empty State handled in conditional rendering above */}
          </div>
       </div>
    </div>
  );
};

export default Bookings;
