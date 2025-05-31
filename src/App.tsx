// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import Layout from './components/layout/Layout'; // This imports your layout with Navigation
import ScrollToTop from './components/layout/ScrollToTop';
import Index from './pages/Index'; // Your homepage
import ContactUs from './pages/ContactUs';
import Terms from './static-pages/terms';
import Privacy from './static-pages/privacy';
import Feedback from './static-pages/feedback';
import Docs from './static-pages/docs';
import Login from './pages/Login';
import posthog from 'posthog-js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <ScrollToTop />
      <PageTracking />
      {/* 
        The crucial change: Wrap your Routes with Layout!
        Layout is where your Navigation (currently commented out) and Footer are rendered.
      */}
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/login" element={<Login />} />
          {/* Fallback route if no other matches */}
          <Route path="*" element={<Index />} />
        </Routes>
      </Layout>
    </Router>
  );
}

function PageTracking() {
  const location = useLocation();

  useEffect(() => {
    posthog.capture('$pageview', {
      current_url: location.pathname,
    });
  }, [location]);

  return null;
}

export default App;