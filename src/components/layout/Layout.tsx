// src/components/layout/Layout.tsx
import React, { PropsWithChildren } from 'react';
import Navigation from './Navigation'; // Your Navigation component
import { Footer } from './Footer';
// No longer importing useTheme here, as Navigation will get it directly

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navigation /> {/* Navigation component now handles theme toggle internally */}

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;