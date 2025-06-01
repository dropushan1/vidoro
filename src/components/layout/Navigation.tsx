// src/components/layout/Navigation.tsx
"use client"; // This is still a client component because it uses hooks and state

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext'; // Import useTheme from the context file

const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Use the theme context

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <a href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold sm:inline-block text-foreground">Vidoro</span>
        </a>
        <nav className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-foreground" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
