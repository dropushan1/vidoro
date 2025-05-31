// src/components/home/SampleSection.tsx
"use client"

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils"; // Assuming you have this utility function

// Define languages with their corresponding video filenames
// Ensure these video files are in your public/sample/ folder
const languages = [
  { name: "Hindi", flag: "🇮🇳", file: "hindi.mp4" },
  { name: "Spanish", flag: "🇪🇸", file: "spanish.mp4" },
  { name: "Portuguese", flag: "🇵🇹", file: "portuguese.mp4" },
  { name: "Japanese", flag: "🇯🇵", file: "japanese.mp4" },
  { name: "French", flag: "🇫🇷", file: "french.mp4" },
];

export default function SampleSection() {
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // To handle initial load and seeking

  const handleLanguageChange = (index: number) => {
    if (videoRef.current) {
      // Store current time before changing source
      setCurrentTime(videoRef.current.currentTime);
      // Pause current video to prevent continued playback while new one loads
      videoRef.current.pause();
    }
    setSelectedLanguageIndex(index);
    setIsLoading(true); // Set loading true when language changes
  };

  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      const newSrc = `/sample/${languages[selectedLanguageIndex].file}`;

      // If the current video source is already the one we want, and we're not explicitly reloading
      // then just try to play and exit. This prevents unnecessary re-setting of src.
      if (videoElement.src.endsWith(newSrc) && !isLoading) {
          return;
      }

      const onLoadedMetadata = () => {
        videoElement.currentTime = currentTime; // Seek to stored time
        videoElement.play().catch(e => {
          console.warn("Autoplay prevented:", e);
          // If autoplay fails, ensure video starts playing on user interaction
          // You might want to show a play button here.
        });
        setIsLoading(false); // Video is loaded and ready
      };

      // Remove previous listener to prevent multiple callbacks
      videoElement.removeEventListener('loadedmetadata', onLoadedMetadata);
      // Add new listener for the current source change
      videoElement.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });

      videoElement.src = newSrc;
      videoElement.load(); // Important: load the new source
    }
  }, [selectedLanguageIndex, currentTime]); // Dependency array: rerun when language or currentTime changes

  // Initial load effect
  useEffect(() => {
    // This effect runs once on mount to set the initial video source
    // and ensures the initial loading state is handled.
    if (videoRef.current && isLoading) {
      const videoElement = videoRef.current;
      const initialSrc = `/sample/${languages[selectedLanguageIndex].file}`;

      const onInitialLoadedMetadata = () => {
        // No specific seek time needed for initial load, just play from beginning
        videoElement.play().catch(e => console.warn("Initial autoplay prevented:", e));
        setIsLoading(false);
      };

      videoElement.addEventListener('loadedmetadata', onInitialLoadedMetadata, { once: true });
      videoElement.src = initialSrc;
      videoElement.load();

      return () => {
        videoElement.removeEventListener('loadedmetadata', onInitialLoadedMetadata);
      };
    }
  }, []); // Empty dependency array means this runs once on mount


  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16
                       bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          Hear the Difference
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl mb-8 md:mb-12 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              muted // Start muted for better autoplay success rate across browsers
              onTimeUpdate={() => { // Continuously update current time while playing
                if (videoRef.current && !videoRef.current.paused) {
                    setCurrentTime(videoRef.current.currentTime);
                }
              }}
              onPlay={() => setIsLoading(false)} // If user initiates play, hide loading
              onSeeking={() => setIsLoading(true)} // Show loading while seeking
              onSeeked={() => setIsLoading(false)} // Hide loading after seeking
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {languages.map((lang, index) => (
              <button
                key={lang.name}
                onClick={() => handleLanguageChange(index)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ease-in-out",
                  "border-2",
                  selectedLanguageIndex === index
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent shadow-lg scale-105"
                    : "bg-white/[0.05] border-white/[0.2] hover:bg-white/[0.1] hover:border-white/[0.3] text-white/80"
                )}
              >
                <span className="text-lg sm:text-xl">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}