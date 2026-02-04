import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const GuestLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default GuestLayout;