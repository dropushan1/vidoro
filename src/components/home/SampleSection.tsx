// src/components/home/SampleSection.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const languages = [
  { name: "English (Original)", flag: "🇺🇸", file: "english.mp4" },
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
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(true);

  const handleLanguageChange = (index: number) => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      videoRef.current.pause();
      setIsPaused(true);
    }
    setSelectedLanguageIndex(index);
    setIsLoading(true);
  };

  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      const newSrc = `/sample/${languages[selectedLanguageIndex].file}`;
      if (videoElement.src.endsWith(newSrc) && !isLoading && videoElement.currentTime > 0) {
          videoElement.play().then(() => {
            setIsLoading(false);
            setIsPaused(false);
          }).catch(e => {
            console.warn("Autoplay prevented:", e);
            setIsLoading(false);
            setIsPaused(true);
          });
          return;
      }
      const onLoadedMetadata = () => {
        videoElement.currentTime = currentTime;
        videoElement.play().then(() => {
          setIsLoading(false);
          setIsPaused(false);
        }).catch(e => {
          console.warn("Autoplay with sound prevented:", e);
          setIsLoading(false);
          setIsPaused(true);
        });
      };
      videoElement.removeEventListener('loadedmetadata', onLoadedMetadata);
      videoElement.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
      videoElement.src = newSrc;
      videoElement.load();
      setIsLoading(true);
      setIsPaused(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguageIndex]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    const handleTimeUpdate = () => {
      if (!videoElement.paused && !videoElement.seeking) {
        setCurrentTime(videoElement.currentTime);
      }
    };
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    // Uses bg-background from body
    <section className="py-16 md:py-24 text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          {/* Gradient text should work on both, or choose solid theme colors */}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-blue-500 dark:from-red-400 dark:via-red-300 dark:to-blue-400">
            Sample Dubbed Video
          </span>
        </h2>

        <div className="max-w-3xl mx-auto mt-10 md:mt-12">
          {/* Video player container, using card style for background */}
          <div className="aspect-video bg-card rounded-lg overflow-hidden shadow-2xl mb-8 md:mb-12 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/75 dark:bg-black/75 z-10 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {(!isLoading && isPaused) && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black/50 dark:bg-black/70 z-10 cursor-pointer transition-opacity duration-300 hover:bg-opacity-75"
                    onClick={() => {
                        if (videoRef.current) {
                            videoRef.current.play().catch(e => console.warn("Play overlay click prevented:", e));
                        }
                    }}
                >
                    <svg
                        className="w-20 h-20 text-white opacity-90 transition-transform duration-300 transform hover:scale-110"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            )}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              muted={false}
              playsInline
              onPlay={() => { setIsLoading(false); setIsPaused(false); }}
              onPlaying={() => { setIsLoading(false); setIsPaused(false); }}
              onPause={() => setIsPaused(true)}
              onWaiting={() => setIsLoading(true)}
              onSeeking={() => setIsLoading(true)}
              onSeeked={() => {
                if(videoRef.current && !videoRef.current.paused) {
                  videoRef.current.play().catch(e => console.warn("Play after seek prevented: ", e));
                }
                setIsLoading(false);
              }}
              onEnded={() => {
                setIsPaused(true);
                setCurrentTime(0);
              }}
              onLoadedData={() => {
                if (videoRef.current) {
                    setIsPaused(videoRef.current.paused);
                }
              }}
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
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent shadow-xl scale-105 ring-2 ring-purple-400 ring-offset-2 ring-offset-background" // Active button uses its own strong colors
                    : "bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground border-border" // Theme-aware button style
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