// src/components/hero.tsx
"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const languages = [
  { name: "Hindi", flag: "🇮🇳" },
  { name: "Spanish", flag: "🇪🇸" },
  { name: "Portuguese", flag: "🇵🇹" },
  { name: "Japanese", flag: "🇯🇵" },
  { name: "French", flag: "🇫🇷" },
]

// ElegantShape's styling is dark-centric and complex to make fully theme-aware easily.
// It will retain its dark appearance.
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]", // This gradient is for dark backgrounds
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -120,
        rotate: rotate - 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.1 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 11,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient, // This is a dark-theme gradient
            "backdrop-blur-[1.5px] border-2 border-white/[0.12]", // Dark-theme border
            "shadow-[0_6px_24px_0_rgba(255,255,255,0.09)]", // Dark-theme shadow
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_75%)]", // Dark-theme radial
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentLanguageIndex((prev) => (prev + 1) % languages.length)
        setIsVisible(true)
      }, 280)
    }, 1900)
    return () => clearInterval(interval)
  }, [])

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: 0.4 + i * 0.18,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  const languageTransitionVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -18,
      scale: 0.97,
      transition: { duration: 0.28, ease: "easeIn" },
    },
  }

  const handleContactUsClick = () => {
    window.location.href = '/contact';
  };

  return (
    // The section itself will use bg-background from body
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-16">
      {/* This decorative gradient overlay is dark-theme specific */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-rose-500/[0.04] blur-2xl dark:opacity-100 opacity-50" />

      {/* ElegantShapes are dark-themed and will remain so */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape delay={0.25} width={450} height={110} rotate={11} gradient="from-indigo-500/[0.12]" className="left-[-12%] md:left-[-6%] top-[19%] md:top-[23%]" />
        <ElegantShape delay={0.45} width={380} height={95} rotate={-13} gradient="from-rose-500/[0.12]" className="right-[-6%] md:right-[-1%] top-[69%] md:top-[73%]" />
        <ElegantShape delay={0.35} width={280} height={75} rotate={-7} gradient="from-violet-500/[0.12]" className="left-[10%] md:left-[14%] bottom-[10%] md:bottom-[14%]" />
        <ElegantShape delay={0.55} width={200} height={55} rotate={16} gradient="from-amber-500/[0.12]" className="right-[16%] md:right-[20%] top-[14%] md:top-[20%]" />
        <ElegantShape delay={0.65} width={150} height={35} rotate={-22} gradient="from-cyan-500/[0.12]" className="left-[20%] md:left-[26%] top-[10%] md:top-[15%]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            // Use theme-aware card styling for the small banner
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border mb-8 md:mb-10"
          >
            <img src="/favicon.ico" alt="Vidoro" width={20} height={20} className="w-5 h-5" />
            <span className="text-sm text-muted-foreground tracking-wide">Vidoro</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-2 md:mb-3 tracking-tight">
              {/* Gradient text that works on both light/dark, or adjust */}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80 dark:from-white dark:to-white/80">
                Dub your video into
              </span>
            </h1>
            <div className="h-40 sm:h-48 md:h-56 flex items-center justify-center mb-6 overflow-hidden">
              <motion.div
                key={currentLanguageIndex}
                variants={languageTransitionVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "exit"}
                className="flex items-center justify-center gap-4 will-change-transform py-4"
              >
                <span className="text-5xl sm:text-7xl leading-none">
                  {languages[currentLanguageIndex].flag}
                </span>
                <span
                  className={cn(
                    "text-4xl sm:text-6xl md:text-7xl font-bold",
                    // This gradient might need adjustment for light mode if it doesn't look good.
                    // For now, keeping it as is as it's a feature color.
                    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-rose-400 dark:from-indigo-300 dark:via-white/90 dark:to-rose-300",
                    "font-pacifico",
                    "leading-normal sm:leading-normal md:leading-normal",
                    "inline-block px-2 py-2"
                  )}
                >
                  {languages[currentLanguageIndex].name}
                </span>
              </motion.div>
            </div>
          </motion.div>

          <motion.button
            onClick={handleContactUsClick}
            className="relative inline-flex items-center overflow-hidden px-8 py-4 rounded-full text-white font-bold text-xl shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring mt-6"
            style={{ // Animated background will likely look best on dark, but let's keep
              background: "linear-gradient(45deg, #4f46e5, #9333ea, #ec4899, #4f46e5)",
              backgroundSize: "300% 300%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "200% 50%", "0% 50%"],
              y: [0, -4, 0],
            }}
            transition={{
              backgroundPosition: { duration: 3, ease: "linear", repeat: Infinity },
              y: { duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-white">Contact Us</span>
            {/* This overlay makes the button look "glossy", works on dark. May need tweaking for light */}
            <motion.div
              className="absolute inset-0 bg-white opacity-20 rounded-full dark:opacity-20 opacity-10"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.button>
        </div>
      </div>

      {/* This gradient overlay is dark-theme specific for fading edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 dark:from-[#030303] dark:via-transparent dark:to-[#030303]/80 pointer-events-none" />
    </div>
  )
}