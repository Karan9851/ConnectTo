



import React from 'react';

import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";

import LandingPage from './pages/Landing';
import Authentication from './pages/Authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoConnect from './pages/VideoConnect';
import Home from './pages/Home';
import History from './pages/History';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Landing Page */}
                    <Route path="/" element={<LandingPage />} />

                    {/* Authentication Page */}
                    <Route path="/auth" element={<Authentication />} />

                    {/* Home Page */}
                    <Route path="/home" element={<Home />} />
                    

                    {/* History Page */}
                    <Route path="/history" element={<History />} />


                    {/* Video Connect Page for Room Links */}
                    <Route path="/room/:roomId" element={<VideoConnect />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;