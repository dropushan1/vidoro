// src/main.tsx
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import posthog from 'posthog-js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './components/layout/ThemeContext.tsx'; // Re-import ThemeProvider

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: '/ingest',
  capture_pageview: false,
  loaded: function (posthog) {
    posthog.debug(true);
  }
});

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <ThemeProvider> {/* Re-wrap App with ThemeProvider */}
      <App />
    </ThemeProvider>
  </GoogleOAuthProvider>
);