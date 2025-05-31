import React, { PropsWithChildren } from 'react';
// import Navigation from './Navigation'; // Comment out or remove this line
import { Footer } from './Footer'; // Import Footer <--- This line imports it

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* <Navigation /> Commented out the Navigation component */}
      <main className="flex-grow">{children}</main>
      <Footer /> {/* Add Footer component here <--- This line renders it */}

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