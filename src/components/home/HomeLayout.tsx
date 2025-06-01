// src/components/home/HomeLayout.tsx
import React from 'react';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    // The 'bg-background' will be applied from body styles in index.css
    // 'overflow-hidden' is good to keep for some animated elements.
    <main className="relative min-h-screen overflow-hidden">
      {/* Content is already wrapped in a div in App.tsx by Layout component */}
      {children}
    </main>
  );
};

export default HomeLayout;