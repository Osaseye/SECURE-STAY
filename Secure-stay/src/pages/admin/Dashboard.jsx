import React, { useEffect, useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { subscribeToBookings } from '../../services/bookingService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeAlerts: 0,
    fraudAttempts: 0,
    verificationRate: 0
  });
  const [recentAct, setRecentAct] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToBookings((bookings) => {
        // 1. Calculate Stats
        const total = bookings.length;
        const alerts = bookings.filter(b => b.status === 'Under Review' || b.fraudScore > 20).length;
        const attempts = bookings.filter(b => b.fraudScore > 80).length;
        const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
        const rate = total > 0 ? ((confirmed / total) * 100).toFixed(1) : 0;

        setStats({
            totalBookings: total,
            activeAlerts: alerts,
            fraudAttempts: attempts,
            verificationRate: rate
        });

        // 2. Recent Bookings (Top 5)
        setRecentAct(bookings.slice(0, 5));

        // 3. Pie Chart (Distribution)
        const safe = bookings.filter(b => b.fraudScore <= 20).length;
        const moderate = bookings.filter(b => b.fraudScore > 20 && b.fraudScore <= 80).length;
        const critical = bookings.filter(b => b.fraudScore > 80).length;

        setPieData([
            { name: 'Safe', value: safe, color: '#10B981' },
            { name: 'Moderate Risk', value: moderate, color: '#F59E0B' },
            { name: 'Critical Risk', value: critical, color: '#EF4444' },
        ]);

        // 4. Area Chart (Mock trend based on data presence or generated)
        // Since we don't have historical data aggregation in this simple hook, 
        // we'll preserve the placeholder logic if empty, or map real dates if possible.
        // For now, let's keep a static placeholder if no data, or simple map.
        if (total === 0) {
             setChartData([
                { day: '01', attempts: 0, verified: 0 },
                { day: '05', attempts: 0, verified: 0 },
                { day: '10', attempts: 0, verified: 0 },
                { day: '15', attempts: 0, verified: 0 },
                { day: '20', attempts: 0, verified: 0 },
                { day: '25', attempts: 0, verified: 0 },
                { day: '30', attempts: 0, verified: 0 },
             ]);
        } else {
             // Simple visualization: just show flat line roughly matching current state
             setChartData([
                { day: 'Mon', attempts: Math.floor(attempts/4), verified: Math.floor(confirmed/4) },
                { day: 'Tue', attempts: Math.floor(attempts/3), verified: Math.floor(confirmed/3) },
                { day: 'Wed', attempts: Math.floor(attempts/2), verified: Math.floor(confirmed/2) },
                { day: 'Thu', attempts: attempts, verified: confirmed },
             ]);
        }
        
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-8">
       {/* Page Header */}
       <div>
         <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
         <p className="text-gray-500">Real-time fraud detection and booking security monitoring.</p>
       </div>

       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Bookings</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalBookings.toLocaleString()}</h3>
                <p className="text-xs text-green-500 font-medium flex items-center mt-1">
                   <span className="material-icons-outlined text-sm mr-1">trending_up</span>
                   Live Data
                </p>
             </div>
             <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary">
                <span className="material-icons-outlined">book_online</span>
             </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Active Alerts</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.activeAlerts}</h3>
                <p className="text-xs text-amber-500 font-medium flex items-center mt-1">
                   <span className="material-icons-outlined text-sm mr-1">warning</span>
                   Requires Review
                </p>
             </div>
             <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                <span className="material-icons-outlined">notifications_active</span>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
                <p className="text-sm font-medium text-gray-500 mb-1">High Risk Attempts</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.fraudAttempts}</h3>
                <p className="text-xs text-red-500 font-medium flex items-center mt-1">
                   <span className="material-icons-outlined text-sm mr-1">security</span>
                   Blocked
                </p>
             </div>
             <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                <span className="material-icons-outlined">gpp_bad</span>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Verification Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.verificationRate}%</h3>
                <p className="text-xs text-blue-500 font-medium flex items-center mt-1">
                   <span className="material-icons-outlined text-sm mr-1">verified</span>
                   Auto-cleared
                </p>
             </div>
             <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                <span className="material-icons-outlined">check_circle</span>
             </div>
          </div>
       </div>

       {/* Charts Section */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Fraud Trend Area Chart */}
           <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                   <h3 className="text-lg font-bold text-gray-900">Fraud Activity Trends</h3>
                   <p className="text-sm text-gray-500">Monitoring attempts vs verified bookings</p>
                </div>
                <select className="text-sm border-gray-200 rounded-lg text-gray-600 focus:ring-primary focus:border-primary">
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>Today</option>
                </select>
              </div>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} tickCount={7} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip 
                            contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                        />
                         <Area type="monotone" dataKey="attempts" name="Fraud Attempts" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorFraud)" />
                         <Area type="monotone" dataKey="verified" name="Verified Bookings" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorVerified)" />
                        <Legend iconType="circle" />
                    </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Fraud Stats Pie Chart */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
               <h3 className="text-lg font-bold text-gray-900 mb-2">Security Risk Distribution</h3>
               <p className="text-sm text-gray-500 mb-6">Categorization of booking risks</p>
               <div className="h-64 w-full relative flex-grow">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                         <Tooltip 
                             contentStyle={{backgroundColor: 'white', borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                             itemStyle={{color: '#374151', fontSize: '12px', fontWeight: 600}}
                         />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                 </ResponsiveContainer>
                 {/* Center Text */}
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -mt-8 pointer-events-none">
                     <span className="material-icons-outlined text-gray-300 text-4xl block mb-1">shield</span>
                     <p className="text-xs font-semibold text-gray-600">DISTRIBUTION</p>
                 </div>
               </div>
           </div>
       </div>

       {/* Recent Activity Table */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
             <h3 className="text-lg font-bold text-gray-900">Recent Live Monitoring</h3>
             <button className="text-sm text-primary font-medium hover:underline">View All Activity</button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-4 font-medium">Reference</th>
                        <th className="px-6 py-4 font-medium">Guest</th>
                        <th className="px-6 py-4 font-medium">Channel</th>
                        <th className="px-6 py-4 font-medium">Time</th>
                        <th className="px-6 py-4 font-medium">Fraud Score</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {recentBookings.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-400 text-sm">
                           No recent activity to display. Waiting for system events...
                        </td>
                      </tr>
                    ) : (
                      recentBookings.map((booking, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-mono text-gray-600">{booking.id}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.guest}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                                {booking.method === 'Mobile' && <span className="material-icons-outlined text-xs">smartphone</span>}
                                {booking.method === 'Web' && <span className="material-icons-outlined text-xs">language</span>}
                                {booking.method}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{booking.date}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 max-w-[60px]">
                                        <div 
                                            className={`h-1.5 rounded-full ${booking.fraudScore > 80 ? 'bg-red-500' : booking.fraudScore > 20 ? 'bg-amber-500' : 'bg-green-500'}`} 
                                            style={{width: `${booking.fraudScore}%`}}
                                        ></div>
                                    </div>
                                    <span className={`text-xs font-bold ${booking.fraudScore > 80 ? 'text-red-600' : booking.fraudScore > 20 ? 'text-amber-600' : 'text-green-600'}`}>
                                        {booking.fraudScore}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                                    booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-100' :
                                    booking.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                                    'bg-yellow-50 text-yellow-700 border-yellow-100'
                                }`}>
                                    {booking.status}
                                </span>
                            </td>
                        </tr>
                    )))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};

export default Dashboard;
