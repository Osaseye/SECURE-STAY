import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { dashboardStats, revenueData, fraudStats, recentBookings } from '../../data/mockAdminData';

const Dashboard = () => {
  return (
    <div className="space-y-8">
       {/* Page Header */}
       <div>
         <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
         <p className="text-gray-500">Welcome back, here's what's happening at SecureStay today.</p>
       </div>

       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Bookings</p>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.totalBookings}</h3>
                <p className="text-xs text-green-500 font-medium flex items-center mt-1">
                   <span className="material-icons-outlined text-sm mr-1">trending_up</span>
                   +12% from last week
                </p>
             </div>
             <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary">
                <span className="material-icons-outlined">book_online</span>
             </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900">₦{(dashboardStats.revenue / 1000000).toFixed(1)}M</h3>
                <p className="text-xs text-green-500 font-medium flex items-center mt-1">
                   <span className="material-icons-outlined text-sm mr-1">trending_up</span>
                   +8% from last week
                </p>
             </div>
             <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                <span className="material-icons-outlined">payments</span>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Active Alerts</p>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.activeAlerts}</h3>
                <p className="text-xs text-amber-500 font-medium flex items-center mt-1">
                   <span className="material-icons-outlined text-sm mr-1">warning</span>
                   Requires attention
                </p>
             </div>
             <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                <span className="material-icons-outlined">notifications_active</span>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Occupancy Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.occupancyRate}%</h3>
                <p className="text-xs text-gray-400 font-medium flex items-center mt-1">
                   Last 24 hours
                </p>
             </div>
             <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                <span className="material-icons-outlined">hotel</span>
             </div>
          </div>
       </div>

       {/* Charts Section */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Revenue Chart */}
           <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Overview</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(value) => `₦${value/1000}k`} />
                        <Tooltip 
                            contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                            formatter={(value) => [`₦${value.toLocaleString()}`, 'Revenue']}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Fraud Stats Pie Chart */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <h3 className="text-lg font-bold text-gray-900 mb-2">Fraud Analysis</h3>
               <p className="text-sm text-gray-500 mb-6">Risk distribution for today's bookings</p>
               <div className="h-64 w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={fraudStats}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {fraudStats.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                         <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                 </ResponsiveContainer>
                 {/* Center Text */}
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -mt-4">
                     <p className="text-2xl font-bold text-gray-900">100</p>
                     <p className="text-xs text-gray-500">Attempts</p>
                 </div>
               </div>
           </div>
       </div>

       {/* Recent Activity Table */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
             <h3 className="text-lg font-bold text-gray-900">Recent Live Bookings</h3>
             <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-4 font-medium">Reference</th>
                        <th className="px-6 py-4 font-medium">Guest</th>
                        <th className="px-6 py-4 font-medium">Room</th>
                        <th className="px-6 py-4 font-medium">Time</th>
                        <th className="px-6 py-4 font-medium">Risk Score</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {recentBookings.map((booking, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-mono text-gray-600">{booking.id}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.guest}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{booking.room}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{booking.date}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 max-w-[60px]">
                                        <div 
                                            className={`h-1.5 rounded-full ${booking.fraudScore > 80 ? 'bg-red-500' : booking.fraudScore > 20 ? 'bg-yellow-500' : 'bg-green-500'}`} 
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
                    ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};

export default Dashboard;
