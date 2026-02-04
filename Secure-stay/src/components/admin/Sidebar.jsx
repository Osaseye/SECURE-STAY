import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' },
    { icon: 'book_online', label: 'Bookings', path: '/admin/bookings' },
    { icon: 'settings', label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <aside className={`bg-white border-r border-gray-200 text-slate-800 h-full flex flex-col fixed left-0 top-0 overflow-y-auto z-20 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      {/* Brand */}
      <div className={`h-16 flex items-center border-b border-gray-100 ${isOpen ? 'px-6 justify-between' : 'justify-center'}`}>
        {isOpen ? (
            <div className="flex items-center gap-3">
              <img src="/icon.png" alt="Logo" className="w-8 h-8 object-contain" />
              <span className="font-bold text-xl tracking-tight text-primary">SecureStay</span>
            </div>
        ) : (
             <img src="/icon.png" alt="Logo" className="w-8 h-8 object-contain" />
        )}
        
        {/* Toggle Button */}
        {isOpen && (
            <button onClick={toggleSidebar} className="text-gray-400 hover:text-primary">
                <span className="material-icons-outlined text-xl">chevron_left</span>
            </button>
        )}
      </div>
      
      {!isOpen && (
           <div className="flex justify-center py-2 border-b border-gray-100">
                <button onClick={toggleSidebar} className="text-gray-400 hover:text-primary">
                    <span className="material-icons-outlined text-xl">chevron_right</span>
                </button>
           </div>
      )}

      {/* Menu_ */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {isOpen && (
             <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
               Overview
             </div>
        )}
        
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 h-11 ${
                isActive
                  ? 'bg-blue-50 text-primary'
                  : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900'
              } ${!isOpen ? 'justify-center' : ''}`
            }
             title={!isOpen ? item.label : ''}
          >
            <span className="material-icons-outlined text-[24px]">{item.icon}</span>
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-100">
        <div className={`flex items-center gap-3 ${!isOpen ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 min-w-[32px] rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-xs font-bold text-white shadow-sm shadow-blue-200">
            AD
          </div>
          {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">Admin User</p>
                <p className="text-xs text-slate-500 truncate">admin@securestay.ng</p>
              </div>
          )}
           {isOpen && (
              <button className="text-gray-400 hover:text-red-500">
                <span className="material-icons-outlined text-lg">logout</span>
              </button>
           )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
