import React, { useState } from 'react';
import { getBookingByRef } from '../../services/bookingService';

const TrackBooking = () => {
    const [refId, setRefId] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const found = await getBookingByRef(refId.toUpperCase().trim());
            
            if (found) {
                // Map database fields to UI keys if necessary
                setResult(found);
            } else {
                setError('No booking found with this reference ID. Please check and try again.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while checking. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                            <span className="material-icons-outlined text-3xl">fact_check</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Track Your Booking</h1>
                        <p className="text-gray-500 mt-2 text-sm">Enter your booking reference ID to check the current status of your reservation security review.</p>
                    </div>

                    <form onSubmit={handleSearch} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Booking Reference</label>
                            <input 
                                type="text" 
                                placeholder="e.g. REF-123456"
                                value={refId}
                                onChange={(e) => setRefId(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-300 uppercase font-mono"
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full py-3 rounded-lg font-bold text-white transition-colors shadow-sm ${
                                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-700'
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Checking...
                                </span>
                            ) : 'Check Status'}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm flex items-start gap-2 animate-fade-in">
                            <span className="material-icons-outlined text-lg mt-0.5">error_outline</span>
                            {error}
                        </div>
                    )}
                </div>

                {result && (
                    <div className="bg-gray-50 p-6 border-t border-gray-200 animate-fade-in-up">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-gray-900">{result.guestName}</h3>
                                <p className="text-xs text-gray-500">{result.roomType} • {result.createdAt?.toDate ? result.createdAt.toDate().toLocaleDateString() : 'Recent'}</p>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                result.status === 'Confirmed' ? 'bg-green-100 text-green-700 border-green-200' :
                                result.status === 'Rejected' ? 'bg-red-100 text-red-700 border-red-200' :
                                'bg-amber-100 text-amber-700 border-amber-200'
                            }`}>
                                {result.status.toUpperCase()}
                            </span>
                        </div>
                        
                        <div className="space-y-3">
                             {result.status === 'Under Review' && (
                                <div className="p-3 bg-white rounded border border-amber-100 shadow-sm">
                                    <div className="flex gap-2">
                                        <span className="material-icons-outlined text-amber-500 text-sm mt-0.5">hourglass_top</span>
                                        <p className="text-sm text-gray-600">
                                            Your booking is currently being reviewed by our fraud detection system. This usually takes less than 15 minutes.
                                        </p>
                                    </div>
                                </div>
                             )}
                             
                             {result.status === 'Confirmed' && (
                                <div className="p-3 bg-white rounded border border-green-100 shadow-sm">
                                    <div className="flex gap-2">
                                        <span className="material-icons-outlined text-green-500 text-sm mt-0.5">verified_user</span>
                                        <p className="text-sm text-gray-600">
                                            Security checks passed. Your reservation is fully confirmed. We look forward to hosting you!
                                        </p>
                                    </div>
                                </div>
                             )}

                            {result.status === 'Rejected' && (
                                <div className="p-3 bg-white rounded border border-red-100 shadow-sm">
                                    <div className="flex gap-2">
                                        <span className="material-icons-outlined text-red-500 text-sm mt-0.5">block</span>
                                        <p className="text-sm text-gray-600">
                                            We could not verify your identity or payment method. Please contact support for assistance.
                                        </p>
                                    </div>
                                </div>
                             )}
                             
                             <button className="w-full mt-2 text-xs text-primary hover:underline">
                                 Email Confirmation
                             </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackBooking;
