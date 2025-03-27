import React, { PropsWithChildren } from 'react';
import Navigation from './Navigation'; // Import Navigation
import { Footer } from './Footer'; // Import Footer

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navigation /> {/* Use Navigation component here */}
      <main className="flex-grow">{children}</main>
      <Footer /> {/* Add Footer component here */}

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener("DOMContentLoaded", function() {
              var lazyloadImages = document.querySelectorAll("img.lazyload");

              lazyloadImages.forEach(image => {
                // Decode the base64 data-src and set it as the src
                try{
                  const deObscured = atob(image.dataset.src);
                  image.src = deObscured;
                }catch(error){
                  console.error("image de-obscuring error:", error);
                }
              });
            });
          `,
        }}
      />
    </div>
  );
};

export default Layout;