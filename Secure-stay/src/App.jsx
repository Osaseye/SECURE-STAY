import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import AdminLayout from './layouts/AdminLayout';
import LandingPage from './pages/guest/LandingPage';
import HotelSearch from './pages/guest/HotelSearch';
import HotelDetails from './pages/guest/HotelDetails';
import RoomSelection from './pages/guest/RoomSelection';
import GuestFormPage from './pages/guest/GuestFormPage';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import FraudMonitor from './pages/admin/FraudMonitor';

function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLogin />} />
      
      {/* Protected Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
         <Route path="dashboard" element={<Dashboard />} />
         <Route path="fraud-monitor" element={<FraudMonitor />} />
      </Route>

      {/* Guest Routes */}
      <Route path="/" element={<GuestLayout><LandingPage /></GuestLayout>} />
      <Route path="/hotels" element={<GuestLayout><HotelSearch /></GuestLayout>} />
      <Route path="/hotels/:id" element={<GuestLayout><HotelDetails /></GuestLayout>} />
      <Route path="/hotels/:id/rooms" element={<GuestLayout><RoomSelection /></GuestLayout>} />
      <Route path="/booking" element={<GuestLayout><GuestFormPage /></GuestLayout>} />
    </Routes>
  )
}

export default App

