import React from 'react';
import './App.css';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthPage from './components/Auth/Auth';
import BookingsPage from './components/Bookings/Bookings';
import EventsPage from './components/Event/Events';
import MainNavigation from './components/Navigation/MainNavigation';

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<Navigate to="/events" />} />
            <Route path="/auth" element={<Navigate to="/events" />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
          </>
        ) : (
          <>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;