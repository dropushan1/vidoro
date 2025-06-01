import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    // Changed bg-black to bg-background, text-zinc-400 to text-muted-foreground, border-zinc-800 to border-border
    <footer className="bg-background text-muted-foreground py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            {/* Changed text-white to text-foreground */}
            <Link to="/" className="text-2xl font-bold text-foreground">
              Vidoro
            </Link>
            <p className="text-sm">Copyright © 2025. All rights reserved.</p>
            <Button
              variant="outline"
              // The button gradient and text color are currently static.
              // To make it theme-aware, you might need to adjust the gradient
              // or use primary/secondary colors from your theme.
              // For now, keeping it as is as a feature color.
              className="bg-gradient-to-r from-red-500 to-blue-500 text-white border-0 hover:opacity-90"
              onClick={handleContactClick}
            >
              Contact Us
            </Button>
          </div>
          <div className="space-y-4">
            {/* Changed text-white to text-foreground */}
            <h3 className="text-foreground font-semibold text-lg">Terms</h3>
            <ul className="space-y-2">
              <li>
                {/* Changed hover:text-white to hover:text-foreground */}
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                {/* Changed hover:text-white to hover:text-foreground */}
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            {/* Changed text-white to text-foreground */}
            <h3 className="text-foreground font-semibold text-lg">Support</h3>
            <ul className="space-y-2">
              <li>
                {/* Changed hover:text-white to hover:text-foreground */}
                <Link to="/feedback" className="hover:text-foreground transition-colors">
                  Feedback
                </Link>
              </li>
              <li>
                {/* Changed hover:text-white to hover:text-foreground */}
                <Link to="/docs" className="hover:text-foreground transition-colors">
                  Docs
                </Link>
              </li>
            </ul>
          </div>
          <div />
        </div>
      </div>
    </footer>
  );
};