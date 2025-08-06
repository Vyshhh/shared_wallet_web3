import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import RootDashboard from './pages/RootDashboard';
import MemberDashboard from './pages/MemberDashboard';
import { Web3Provider } from './context/Web3Context';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="min-h-screen bg-lavender">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<RootDashboard />} />
              <Route path="/member" element={<MemberDashboard />} />
            </Routes>
          </div>
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;