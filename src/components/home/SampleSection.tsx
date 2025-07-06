// src/components/home/SampleSection.tsx
"use client";

import { useState, useRef } from "react";
// Removed: import YouTube, { YouTubePlayer } from 'react-youtube';
import { cn } from "@/lib/utils"; // Assuming this utility is still needed elsewhere or for future use

// --- Local Video Paths ---
const ENGLISH_VIDEO_PATH = "/sample/english.mp4"; // Path to your local English video
const HINDI_VIDEO_PATH = "/sample/hindi.mp4";     // Path to your local Hindi video

export default function SampleSection() {
  // State and Ref for English Video Player
  const [isLoadingEnglish, setIsLoadingEnglish] = useState(true);
  const [isPausedEnglish, setIsPausedEnglish] = useState(true);
  // Changed ref type to HTMLVideoElement
  const playerRefEnglish = useRef<HTMLVideoElement | null>(null);

  // State and Ref for Hindi Video Player
  const [isLoadingHindi, setIsLoadingHindi] = useState(true);
  const [isPausedHindi, setIsPausedHindi] = useState(true);
  // Changed ref type to HTMLVideoElement
  const playerRefHindi = useRef<HTMLVideoElement | null>(null);

  // --- Common HTML5 Video Event Handlers ---

  // Called when enough data is loaded to play the video.
  // This replaces onPlayerReady from YouTube API.
  const handleVideoLoadedData = (playerType: 'english' | 'hindi') => {
    if (playerType === 'english') {
      setIsLoadingEnglish(false);
      setIsPausedEnglish(true); // Video is ready, but initially paused
    } else {
      setIsLoadingHindi(false);
      setIsPausedHindi(true); // Video is ready, but initially paused
    }
  };

  // Called when the video starts playing
  const handleVideoPlay = (playerType: 'english' | 'hindi') => {
    if (playerType === 'english') {
      setIsLoadingEnglish(false);
      setIsPausedEnglish(false);
    } else {
      setIsLoadingHindi(false);
      setIsPausedHindi(false);
    }
  };

  // Called when the video is paused
  const handleVideoPause = (playerType: 'english' | 'hindi') => {
    if (playerType === 'english') {
      setIsLoadingEnglish(false); // No longer loading/buffering when paused
      setIsPausedEnglish(true);
    } else {
      setIsLoadingHindi(false);
      setIsPausedHindi(true);
    }
  };

  // Called when the video ends
  const handleVideoEnded = (playerType: 'english' | 'hindi') => {
    if (playerType === 'english') {
      setIsLoadingEnglish(false); // No longer loading/buffering when ended
      setIsPausedEnglish(true);
    } else {
      setIsLoadingHindi(false);
      setIsPausedHindi(true);
    }
  };

  // Called when the video is buffering or waiting for data
  const handleVideoWaiting = (playerType: 'english' | 'hindi') => {
    if (playerType === 'english') {
      setIsLoadingEnglish(true); // Indicate buffering state
    } else {
      setIsLoadingHindi(true);
    }
  };

  return (
    <section className="py-16 md:py-24 text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-blue-500 dark:from-red-400 dark:via-red-300 dark:to-blue-400">
            Compare Dubbed Samples
          </span>
        </h2>

        <div className="max-w-full lg:max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* --- English Video Section --- */}
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-center mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                  English (Original) 🇺🇸
                </span>
              </h3>
              <div className="rounded-xl bg-gradient-to-br from-purple-500 via-red-500 to-blue-500 p-1 shadow-2xl shadow-purple-500/20 transition-all duration-500 hover:shadow-red-500/30">
                <div className="aspect-video bg-card rounded-lg overflow-hidden relative">
                  {isLoadingEnglish && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/75 dark:bg-black/75 z-20 backdrop-blur-sm">
                      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {(!isLoadingEnglish && isPausedEnglish) && (
                      <div
                          className="absolute inset-0 flex items-center justify-center bg-black/50 dark:bg-black/70 z-20 cursor-pointer opacity-0 transition-opacity duration-300 hover:opacity-100"
                          // Call HTMLVideoElement's play() method
                          onClick={() => playerRefEnglish.current?.play()}
                      >
                          <svg className="w-20 h-20 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                          </svg>
                      </div>
                  )}
                  {/* HTML5 Video Element */}
                  <video
                    ref={playerRefEnglish} // Assign ref to video element
                    src={ENGLISH_VIDEO_PATH} // Specify local video source
                    controls // Show browser's default video controls
                    preload="metadata" // Suggests browser to load metadata (like duration) but not entire video
                    loop // Optional: Makes the video loop continuously
                    // Event handlers for HTML5 video
                    onLoadedData={() => handleVideoLoadedData('english')}
                    onPlay={() => handleVideoPlay('english')}
                    onPause={() => handleVideoPause('english')}
                    onEnded={() => handleVideoEnded('english')}
                    onWaiting={() => handleVideoWaiting('english')}
                    onError={(e) => console.error("English Video Error:", e.currentTarget.error)}
                    className="absolute top-0 left-0 w-full h-full object-cover" // object-cover helps video fill container
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>

            {/* --- Hindi Video Section --- */}
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-center mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                  Hindi 🇮🇳
                </span>
              </h3>
              <div className="rounded-xl bg-gradient-to-br from-purple-500 via-red-500 to-blue-500 p-1 shadow-2xl shadow-purple-500/20 transition-all duration-500 hover:shadow-red-500/30">
                <div className="aspect-video bg-card rounded-lg overflow-hidden relative">
                  {isLoadingHindi && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/75 dark:bg-black/75 z-20 backdrop-blur-sm">
                      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {(!isLoadingHindi && isPausedHindi) && (
                      <div
                          className="absolute inset-0 flex items-center justify-center bg-black/50 dark:bg-black/70 z-20 cursor-pointer opacity-0 transition-opacity duration-300 hover:opacity-100"
                          // Call HTMLVideoElement's play() method
                          onClick={() => playerRefHindi.current?.play()}
                      >
                          <svg className="w-20 h-20 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                          </svg>
                      </div>
                  )}
                  {/* HTML5 Video Element */}
                  <video
                    ref={playerRefHindi} // Assign ref to video element
                    src={HINDI_VIDEO_PATH} // Specify local video source
                    controls // Show browser's default video controls
                    preload="metadata" // Suggests browser to load metadata (like duration) but not entire video
                    loop // Optional: Makes the video loop continuously
                    // Event handlers for HTML5 video
                    onLoadedData={() => handleVideoLoadedData('hindi')}
                    onPlay={() => handleVideoPlay('hindi')}
                    onPause={() => handleVideoPause('hindi')}
                    onEnded={() => handleVideoEnded('hindi')}
                    onWaiting={() => handleVideoWaiting('hindi')}
                    onError={(e) => console.error("Hindi Video Error:", e.currentTarget.error)}
                    className="absolute top-0 left-0 w-full h-full object-cover" // object-cover helps video fill container
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}