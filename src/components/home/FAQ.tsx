// src/components/home/FAQ.tsx
"use client";

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useTheme } from '@/components/layout/ThemeContext';

interface FAQItemProps {
  question: string
  answer: { content: React.ReactNode; hasDot: boolean }[]
}

const faqItems = [
  {
    question: "What exactly does Vidoro offer with this service?",
    answer: [
      {
        content:
          "We provide a complete, hands-off solution to expand your content into the Indian market. We translate and dub your English videos into high-quality Hindi, then manage a brand-new, dedicated Hindi YouTube channel for you. This unlocks a massive new audience and a second revenue stream with no extra work on your part.",
        hasDot: false,
      },
    ],
  },
  {
    question: "Why should I create a separate Hindi channel instead of just adding dubs to my existing videos?",
    answer: [
      {
        content: (
          <>
            A dedicated Hindi channel offers significant advantages:
            <ul>
              <li><strong>More Monetization:</strong> Attract separate brand sponsorships and double your potential ad earnings.</li>
              <li><strong>New Audience:</strong> Cultivate a loyal community of Hindi-speaking viewers.</li>
              <li><strong>Better Discoverability:</strong> Optimize for YouTube's algorithm in the Indian market.</li>
            </ul>
          </>
        ),
        hasDot: false,
      },
    ],
  },
  {
    question: "What kind of content is suitable for this service?",
    answer: [
      {
        content:
          "This service works for nearly any video content with universal appeal. Educational content, vlogs, gaming, reviews, and tutorials are all great fits. We'll review your channel to suggest the best videos for translation.",
        hasDot: false,
      },
    ],
  },
  {
    question: "How do you handle the translation and voice-over quality?",
    answer: [
      {
        content:
          "We use a hybrid approach: advanced AI for translation and voice-over, plus human review for accuracy and cultural nuance. This ensures natural, engaging, and perfectly synchronized Hindi audio that matches your original video.",
        hasDot: false,
      },
    ],
  },
  {
    question: "Do I own the new Hindi YouTube channel?",
    answer: [
      {
        content:
          "Yes, absolutely! The new Hindi YouTube channel is 100% yours. We set it up under your Google account, ensuring you retain full ownership and control. We act solely as your editor/manager.",
        hasDot: false,
      },
    ],
  },
  {
    question: "What about monetization and ad revenue from the new Hindi channel?",
    answer: [
      {
        content:
          "All ad revenue from the Hindi channel goes directly to your linked AdSense account. We will not have access to or even see your revenue. Our role is strictly to upload and optimize the videos; all earnings are entirely in your hands. We ensure the channel is set up correctly for monetization.",
        hasDot: false,
      },
    ],
  },
  {
    question: "How much does this service cost?",
    answer: [
      {
        content:
          "Our service is tailored based on the volume and length of your content. Please contact us for a personalized quote. Our transparent pricing provides exceptional value for the growth and revenue potential we unlock.",
        hasDot: false,
      },
    ],
  },
];


const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div layout onClick={() => setIsOpen(!isOpen)} className="group cursor-pointer">
      <motion.div
        layout
        className="p-4 rounded-xl bg-transparent hover:bg-muted/50 dark:hover:bg-muted/50 transition-colors duration-300"
      >
        <div className="flex justify-between items-center">
          <motion.h3
            layout
            className="text-lg font-medium text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-blue-500 dark:group-hover:from-red-400 dark:group-hover:to-blue-400 transition-colors duration-300"
          >
            {question}
          </motion.h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-5 h-5"
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
          </motion.div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-3"
            >
              {answer.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  {item.hasDot && (
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-400 to-blue-400 mt-2" />
                  )}
                  <div className="text-sm leading-relaxed">{item.content}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

const headingTextContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};
const textLineVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
const FloatingOrb = ({ delay = 0, duration = 4, className = "" }) => (
  <motion.div
    className={`absolute rounded-full blur-xl ${className}`}
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  />
);


export default function FAQ() {
  const { theme } = useTheme();

  const middleGradientStopColors = theme === 'dark'
    ? {
        stop1: "#1e293b",
        stop2: "#0f172a",
        stop3: "#020617"
      }
    : {
        stop1: "#ffffff",
        stop2: "#ffffff",
        stop3: "#ffffff"
      };

  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 text-foreground bg-background">
      {/* Enhanced Hero Section */}
      <motion.div
        className="relative w-full min-h-[500px] sm:min-h-[550px] md:min-h-[600px] overflow-hidden mb-0 md:mb-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Background with Floating Orbs */}
        <div className="absolute inset-0">
          <FloatingOrb delay={0} duration={6} className="w-32 h-32 bg-gradient-to-r from-red-500/30 to-pink-500/30 top-20 left-10" />
          <FloatingOrb delay={2} duration={8} className="w-24 h-24 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 top-32 right-20" />
          <FloatingOrb delay={4} duration={7} className="w-40 h-40 bg-gradient-to-r from-purple-500/20 to-blue-500/20 bottom-32 left-1/4" />
          <FloatingOrb delay={1} duration={9} className="w-28 h-28 bg-gradient-to-r from-red-500/25 to-orange-500/25 bottom-20 right-1/3" />
        </div>

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="heroTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="25%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="75%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>

            <linearGradient id="heroMiddleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={middleGradientStopColors.stop1} stopOpacity="0.9" />
              <stop offset="50%" stopColor={middleGradientStopColors.stop2} stopOpacity="0.95" />
              <stop offset="100%" stopColor={middleGradientStopColors.stop3} stopOpacity="1" />
            </linearGradient>

            <radialGradient id="heroRadialGradient" cx="50%" cy="30%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#2563eb" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <motion.path
            d="M0,0 L100,0 L100,40 Q80,50 60,45 Q40,40 20,50 Q10,55 0,45 Z"
            fill="url(#heroTopGradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          <motion.path
            d="M0,45 Q10,55 20,50 Q40,40 60,45 Q80,50 100,40 L100,55 Q50,60 0,55 Z"
            fill="url(#heroMiddleGradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />

          <motion.path
            d="M0,55 Q50,60 100,55 L100,100 L0,100 Z"
            style={{ fill: 'hsl(var(--background))' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          />

          <circle cx="50" cy="30" r="60" fill="url(#heroRadialGradient)" />
        </svg>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 text-white"
          style={{ marginTop: "-335px" }} // Adjust this based on visual results
          variants={headingTextContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            <motion.span className="block" variants={textLineVariants}>
             Duplicate Your Impact
            </motion.span>
            <motion.span className="block mt-1 md:mt-2" variants={textLineVariants}>
             Double Your Revenue
            </motion.span>
          </h1>
        </motion.div>
      </motion.div>

      {/* Existing FAQ Accordion Section */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12 pt-0 md:pt-0">
            {/* Removed the small "FAQ" span */}
            {/* <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-medium px-4 py-1.5 rounded-full bg-muted border border-red-500/20 text-red-500 dark:text-red-400 mb-6 inline-block"
            >
              FAQ
            </motion.span> */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600 dark:from-red-400 dark:to-blue-400"
            >
              Frequently Asked Questions
            </motion.h2>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br dark:from-red-500/20 dark:to-blue-500/20 from-red-500/10 to-blue-500/10 rounded-2xl blur-xl" />
            <motion.div className="relative bg-card rounded-2xl border border-border backdrop-blur-xl p-8">
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <FAQItem key={index} question={item.question} answer={item.answer} />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}