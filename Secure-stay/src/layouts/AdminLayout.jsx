import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-slate-900">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="ml-64 transition-all duration-300">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-10 px-8 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Administrator Console</h2>
            
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <span className="material-icons-outlined text-xl">notifications</span>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <div className="h-8 w-px bg-gray-200"></div>
                 <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                    <span className="material-icons-outlined text-xl">help_outline</span>
                    <span>Support</span>
                </button>
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
