import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import GuestLayout from './layouts/GuestLayout';
import AdminLayout from './layouts/AdminLayout';
import LandingPage from './pages/guest/LandingPage';
import HotelSearch from './pages/guest/HotelSearch';
import HotelDetails from './pages/guest/HotelDetails';
import RoomSelection from './pages/guest/RoomSelection';
import GuestFormPage from './pages/guest/GuestFormPage';
import TrackBooking from './pages/guest/TrackBooking';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Bookings from './pages/admin/Bookings';
import BookingDetails from './pages/admin/BookingDetails';
import Settings from './pages/admin/Settings';
import NotFound from './pages/common/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      {/* Admin Login Route - Independent */}
      <Route path="/admin" element={<AdminLogin />} />
      
      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
         <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:id" element={<BookingDetails />} />
            <Route path="settings" element={<Settings />} />
         </Route>
      </Route>

      {/* Guest Routes - Using GuestLayout Wrapper */}
      <Route path="/" element={<GuestLayout><LandingPage /></GuestLayout>} />
      <Route path="/hotels" element={<GuestLayout><HotelSearch /></GuestLayout>} />
      <Route path="/hotels/:id" element={<GuestLayout><HotelDetails /></GuestLayout>} />
      <Route path="/hotels/:id/rooms" element={<GuestLayout><RoomSelection /></GuestLayout>} />
      <Route path="/booking" element={<GuestLayout><GuestFormPage /></GuestLayout>} />
      <Route path="/track-booking" element={<GuestLayout><TrackBooking /></GuestLayout>} />
      
      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App;

