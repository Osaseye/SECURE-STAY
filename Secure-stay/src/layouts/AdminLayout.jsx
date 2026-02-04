import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import { notifications } from '../data/mockAdminData';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-slate-900">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-20 px-8 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Administrator Console</h2>
            
            <div className="flex items-center gap-4 relative">
                {/* Notification Bell */}
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                >
                    <span className="material-icons-outlined text-xl">notifications</span>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                   <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-30 animate-fade-in">
                      <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                         <h3 className="font-semibold text-gray-900">Notifications</h3>
                         <button className="text-xs text-primary hover:underline">Mark all read</button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center">
                                <span className="material-icons-outlined text-gray-300 text-3xl mb-2">notifications_off</span>
                                <p className="text-xs text-gray-500">No new notifications</p>
                            </div>
                        ) : (
                          notifications.map(note => (
                           <div key={note.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                              <div className="flex gap-3">
                                 <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${note.type === 'alert' ? 'bg-red-500' : note.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                                 <div>
                                    <p className="text-sm font-medium text-gray-800">{note.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{note.message}</p>
                                    <p className="text-[10px] text-gray-400 mt-2">{note.time}</p>
                                 </div>
                              </div>
                           </div>
                        )))}
                      </div>
                      <div className="p-3 bg-gray-50 text-center">
                         <button className="text-xs font-medium text-gray-600 hover:text-primary">View Activity Log</button>
                      </div>
                   </div>
                )}

                <div className="h-8 w-px bg-gray-200"></div>
                 
                 {/* User Profile Hook */}
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        AD
                    </div>
                 </div>
            </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
