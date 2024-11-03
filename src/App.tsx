import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InfluencerProfile from './pages/InfluencerProfile';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0D0D12] text-white">
        <Routes>
          <Route path="/influencer" element={<InfluencerProfile />} />
        </Routes>
        <Navigation />
      </div>
    </BrowserRouter>
  );
}

export default App;