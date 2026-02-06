import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookingByRef, updateBookingStatus } from '../../services/bookingService';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Modal from '../../components/common/Modal';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', type: 'info', onConfirm: null });

  const openModal = (title, message, type = 'info', onConfirm = null) => {
    setModalConfig({ isOpen: true, title, message, type, onConfirm });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const fetchBooking = async () => {
        try {
            const data = await getBookingByRef(id);
            setBooking(data);
        } catch (error) {
            console.error("Error fetching booking details:", error);
        } finally {
            setLoading(false);
        }
    };
    
    if (id) {
        fetchBooking();
    }
  }, [id]);

  const handleStatusUpdate = (newStatus) => {
    if (!booking || !booking.firestoreId) return;
    
    const confirmMsg = newStatus === 'Confirmed' 
      ? "Are you sure you want to APPROVE this booking?" 
      : "Are you sure you want to REJECT this booking?";
    
    // Open Confirmation Modal
    openModal(
        `Confirm ${newStatus === 'Confirmed' ? 'Approval' : 'Rejection'}`,
        confirmMsg,
        newStatus === 'Confirmed' ? 'info' : 'danger',
        async () => {
            closeModal(); // Close confirm modal
            
            const success = await updateBookingStatus(booking.firestoreId, newStatus);
            if (success) {
                setBooking(prev => ({ ...prev, status: newStatus }));
                // Show Success Modal
                setTimeout(() => {
                    openModal("Success", `Booking marked as ${newStatus}`, 'info', null);
                }, 300);
            } else {
                // Show Error Modal
                setTimeout(() => {
                    openModal("Error", "Failed to update status. Please try again.", 'danger', null);
                }, 300);
            }
        }
    );
  };

  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center h-96">
            <span className="material-icons-outlined animate-spin text-4xl text-primary mb-4">refresh</span>
            <p className="text-gray-500">Loading booking details...</p>
          </div>
      );
  }

  if (!booking) {
      return (
          <div className="flex flex-col items-center justify-center h-96">
              <h2 className="text-xl font-bold text-gray-900">Booking not found</h2>
              <button onClick={() => navigate('/admin/bookings')} className="mt-4 text-primary hover:underline">
                  Back to Bookings
              </button>
          </div>
      )
  }

  const fraudScore = booking.fraudScore || 0;
  // Fallbacks in case analysis data is unstructured or missing
  const reasons = booking.fraudAnalysis?.reasons || ["Analysis data unavailable"];
  const riskFactors = booking.fraudAnalysis?.riskFactors || [];
  
  const riskLevel = fraudScore > 80 ? 'Critical' : fraudScore > 20 ? 'Moderate' : 'Low';
  const riskColor = fraudScore > 80 ? '#EF4444' : fraudScore > 20 ? '#F59E0B' : '#10B981';

  const gaugeData = [
      { name: 'Score', value: fraudScore, color: riskColor },
      { name: 'Remaining', value: 100 - fraudScore, color: '#e5e7eb' }
  ];

  const formattedDate = booking.createdAt?.toDate ? booking.createdAt.toDate().toLocaleDateString() : 'Unknown Date';

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
       <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-500 hover:text-gray-900">
           <span className="material-icons-outlined mr-1">arrow_back</span>
           Back to List
       </button>

       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">Booking {booking.id?.substring(0,8)}...</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                    booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-100' :
                    booking.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                    'bg-amber-50 text-amber-700 border-amber-100'
                }`}>
                    {booking.status.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-500 mt-1">Created on {formattedDate}</p>
          </div>
          <div className="flex gap-3">
              {(booking.status === 'Under Review' || booking.status === 'Pending') && (
                  <>
                    <button 
                        onClick={() => handleStatusUpdate('Rejected')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 shadow-sm transition-colors"
                    >
                        Reject Booking
                    </button>
                    <button 
                        onClick={() => handleStatusUpdate('Confirmed')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-sm transition-colors"
                    >
                        Approve Booking
                    </button>
                  </>
              )}
               <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
                   <span className="material-icons-outlined">print</span>
               </button>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Detailed Fraud Analysis Card */}
           <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <span className="material-icons-outlined text-primary">analytics</span>
                            Fraud Analysis Report
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="mb-6">
                            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Analysis Factors</h4>
                            <div className="space-y-3">
                                {reasons.map((reason, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-50">
                                        <span className="material-icons-outlined text-blue-600 text-sm mt-0.5">info</span>
                                        <p className="text-sm text-gray-700">{reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {riskFactors.length > 0 && (
                            <div>
                                <h4 className="text-sm font-bold text-red-700 uppercase tracking-wide mb-3">Detected Risk Factors</h4>
                                <div className="space-y-3">
                                    {riskFactors.map((factor, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-3 bg-red-50/50 rounded-lg border border-red-50">
                                            <span className="material-icons-outlined text-red-600 text-sm mt-0.5">warning</span>
                                            <p className="text-sm text-red-800 font-medium">{factor}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                             <h4 className="text-sm font-bold text-gray-900 mb-2">System Decision Logic</h4>
                             <p className="text-sm text-gray-500 leading-relaxed">
                                 {fraudScore > 80 
                                    ? "The system automatically flagged this transaction as HIGH RISK due to multiple failed verification checks. Manual review is recommended before any status change. The IP geolocation distance from the billing address exceeds the safe threshold."
                                    : fraudScore > 20
                                    ? "The transaction shows minor anomalies but passed core verification. It has been placed in review for precautionary reasons."
                                    : "All security checks passed successfully. Identity verified against global databases. Transaction pattern matches user history."
                                 }
                             </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Guest Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs text-gray-400 uppercase">Full Name</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{booking.guestName}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase">Email Address</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{booking.email}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase">Phone Number</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{booking.phone}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase">IP Address</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">102.12.54.21 (Simulated)</p>
                        </div>
                    </div>
                </div>
           </div>

           {/* Score Card */}
           <div className="space-y-6">
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
                   <h3 className="font-bold text-gray-900 mb-2">Overall Risk Score</h3>
                   <div className="w-48 h-48 relative">
                       <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                               <Pie
                                   data={gaugeData}
                                   cx="50%"
                                   cy="50%"
                                   innerRadius={60}
                                   outerRadius={80}
                                   startAngle={180}
                                   endAngle={0}
                                   paddingAngle={0}
                                   dataKey="value"
                               >
                                   {gaugeData.map((entry, index) => (
                                       <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                   ))}
                               </Pie>
                           </PieChart>
                       </ResponsiveContainer>
                       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-0 text-center -mt-8">
                           <span className={`text-4xl font-extrabold`} style={{color: riskColor}}>{fraudScore}</span>
                           <span className="text-xs text-gray-400 block uppercase">Out of 100</span>
                       </div>
                   </div>
                   <div className={`mt-2 px-4 py-1.5 rounded-full text-sm font-bold border ${
                       fraudScore > 80 ? 'bg-red-50 text-red-700 border-red-100' : 
                       fraudScore > 20 ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                       'bg-green-50 text-green-700 border-green-100'
                   }`}>
                       {riskLevel} Risk
                   </div>
               </div>

               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                   <h3 className="font-bold text-gray-900 mb-4">Reservation Details</h3>
                   <ul className="space-y-4">
                       <li className="flex justify-between">
                           <span className="text-sm text-gray-500">Room Type</span>
                           <span className="text-sm font-medium text-gray-900">{booking.roomType}</span>
                       </li>
                       {/*  Additional fields if available in booking object */}
                       <li className="flex justify-between">
                           <span className="text-sm text-gray-500">Check In</span>
       
       <Modal 
            isOpen={modalConfig.isOpen}
            onClose={closeModal}
            title={modalConfig.title}
            message={modalConfig.message}
            type={modalConfig.type}
            onConfirm={modalConfig.onConfirm}
            confirmText="Yes, Proceed"
            cancelText={modalConfig.onConfirm ? "Cancel" : "Close"}
       />
                           <span className="text-sm font-medium text-gray-900">{booking.checkIn}</span>
                       </li>
                       <li className="flex justify-between">
                           <span className="text-sm text-gray-500">Check Out</span>
                           <span className="text-sm font-medium text-gray-900">{booking.checkOut}</span>
                       </li>
                       <li className="flex justify-between pt-4 border-t border-gray-100">
                           <span className="text-sm font-bold text-gray-900">Total Amount</span>
                           <span className="text-sm font-bold text-primary">₦{(booking.amount || 0).toLocaleString()}</span>
                       </li>
                   </ul>
               </div>
           </div>
       </div>
    </div>
  );
};

export default BookingDetails;
