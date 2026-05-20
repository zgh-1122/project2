import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Baseline layout elements
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// System Pages
import Home from './pages/Home';
import Visas from './pages/Visas';
import SuccessStories from './pages/SuccessStories';
import MemberDetail from './pages/MemberDetail';
import OurJourney from './pages/OurJourney';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      {/* 1. Global Navigation Bar - Top par fix rahegi */}
      <Navbar />

      {/* 2. Dynamic Route Switching Architecture */}
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          {/* Base URL mapping */}
          <Route path="/" element={<Home />} />
          
          {/* Visas Offer Grid Layer */}
          <Route path="/visas" element={<Visas />} />
          
          {/* Success Stories / Clearance Logs Dashboard (404 Issue Solved!) */}
          <Route path="/stories" element={<SuccessStories />} />
          
          {/* Dynamic API User Registry Profile Tracker Link */}
          <Route path="/member/:id" element={<MemberDetail />} />
          
          {/* Our Journey Narrative Timeline Sequence */}
          <Route path="/journey" element={<OurJourney />} />
          
          {/* Contact and Support Ingest Portal */}
          <Route path="/contact" element={<ContactUs />} />
          
          {/* Fallback Catch-All Wildcard (Invalid paths will trigger this) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* 3. High-End Corporate Footer - Automatic har page ke bottom par display hoga */}
      <Footer />
    </Router>
  );
}

export default App;