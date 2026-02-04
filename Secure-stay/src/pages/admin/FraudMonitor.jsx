import React, { useState } from 'react';
import { recentBookings } from '../../data/mockAdminData';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const FraudMonitor = () => {
  const [filter, setFilter] = useState('all'); // all, high, medium, low

  const getRiskColor = (score) => {
    if (score > 80) return 'text-red-600 bg-red-50 border-red-100';
    if (score > 20) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-green-600 bg-green-50 border-green-100';
  };

  const filteredBookings = recentBookings.filter(booking => {
     if (filter === 'high') return booking.fraudScore > 80;
     if (filter === 'medium') return booking.fraudScore > 20 && booking.fraudScore <= 80;
     if (filter === 'low') return booking.fraudScore <= 20;
     return true;
  });

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h1 className="text-2xl font-bold text-gray-900">Fraud Monitor</h1>
            <p className="text-gray-500">Real-time risk assessment and alert management.</p>
         </div>
         <div className="flex gap-2">
            {['all', 'high', 'medium', 'low'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    filter === f 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {f} Risks
                </button>
            ))}
         </div>
       </div>

       {/* Alert Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 border border-red-100 p-6 rounded-xl flex items-center justify-between">
              <div>
                  <p className="text-red-600 font-medium mb-1">Critical Alerts</p>
                  <h3 className="text-3xl font-bold text-gray-900">3</h3>
                  <p className="text-xs text-red-500 mt-1">Immediate action required</p>
              </div>
              <span className="material-icons-outlined text-4xl text-red-300">gpp_bad</span>
          </div>
          <div className="bg-amber-50 border border-amber-100 p-6 rounded-xl flex items-center justify-between">
              <div>
                  <p className="text-amber-600 font-medium mb-1">Suspicious Patterns</p>
                  <h3 className="text-3xl font-bold text-gray-900">12</h3>
                  <p className="text-xs text-amber-500 mt-1">Under automated review</p>
              </div>
              <span className="material-icons-outlined text-4xl text-amber-300">warning</span>
          </div>
          <div className="bg-green-50 border border-green-100 p-6 rounded-xl flex items-center justify-between">
              <div>
                  <p className="text-green-600 font-medium mb-1">Safe Transactions</p>
                  <h3 className="text-3xl font-bold text-gray-900">1,248</h3>
                  <p className="text-xs text-green-500 mt-1">Last 30 days</p>
              </div>
              <span className="material-icons-outlined text-4xl text-green-300">verified_user</span>
          </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
             <h3 className="text-lg font-bold text-gray-900">Live Transaction Monitoring</h3>
          </div>
          <table className="w-full text-left">
             <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4 font-medium">Risk Level</th>
                    <th className="px-6 py-4 font-medium">Transaction ID</th>
                    <th className="px-6 py-4 font-medium">Guest Entity</th>
                    <th className="px-6 py-4 font-medium">Factors</th>
                    <th className="px-6 py-4 font-medium">Score</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {filteredBookings.map((booking, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getRiskColor(booking.fraudScore)}`}>
                               {booking.fraudScore > 80 ? 'CRITICAL' : booking.fraudScore > 20 ? 'WARNING' : 'SAFE'}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-mono text-gray-500">{booking.id}</td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                    {booking.guest.charAt(0)}
                                </div>
                                <span className="text-sm font-medium text-gray-900">{booking.guest}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                                {booking.fraudScore > 80 && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-700">IP Mismatch</span>
                                )}
                                {booking.fraudScore > 50 && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-700">New Device</span>
                                )}
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">CC Verified</span>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                             <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-gray-700">{booking.fraudScore}/100</span>
                                <div className="flex-1 h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${booking.fraudScore > 80 ? 'bg-red-500' : booking.fraudScore > 20 ? 'bg-amber-500' : 'bg-green-500'}`} 
                                        style={{width: `${booking.fraudScore}%`}}
                                    ></div>
                                </div>
                             </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-gray-400 hover:text-primary transition-colors">
                                <span className="material-icons-outlined">more_vert</span>
                            </button>
                        </td>
                    </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  )
}

export default FraudMonitor;
