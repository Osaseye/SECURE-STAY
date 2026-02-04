import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import LandingPage from './pages/guest/LandingPage';
import HotelSearch from './pages/guest/HotelSearch';
import HotelDetails from './pages/guest/HotelDetails';
import RoomSelection from './pages/guest/RoomSelection';
import GuestFormPage from './pages/guest/GuestFormPage';

function App() {
  return (
    <GuestLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hotels" element={<HotelSearch />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/hotels/:id/rooms" element={<RoomSelection />} />
        <Route path="/booking" element={<GuestFormPage />} />
      </Routes>
    </GuestLayout>
  )
}

export default App

