// src/components/home/Testimonials.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card"; // Assuming Card uses theme variables
import { motion, useInView } from "framer-motion";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { FiUploadCloud } from "react-icons/fi";
import { MdTranslate, MdAudiotrack } from "react-icons/md";

// Testimonials data remains the same

const testimonials = [
  {
    name: "Sarah Miller",
    image:
      "https://www.economicliberties.us/wp-content/uploads/2022/11/SM-Headshot-2.png",
    content:
      "Adding multiple languages was so simple with their audio tracks. Our global audience loves it!",
  },
  {
    name: (
      <a
        href="https://www.instagram.com/thevarunmayya/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground hover:underline" // Updated for theme
      >
        Varun Mayya
      </a>
    ),
    image:
      "https://yt3.ggpht.com/ytc/AIdro_nrZfnUxi_DwFSlJyuQvZN-JWkiZHkgwUaZJPhiIu-ZNLI=s800-c-k-c0x00ffffff-no-rj",
    content:
      "Vidoro's audio tracks integrate perfectly with YouTube. Reaching more countries is now a breeze. Highly recommend! 👍",
  },
  // ... other testimonials
   {
    name: "Sabin Mathew",
    image:
      "https://yt3.googleusercontent.com/uI3J9rcN5QvBD5rPMj5SaDUp41PIvTergbOWIKam39L7xxpzBT99zqcMiLrJ0qXalORqg0hKjA=s800-c-k-c0x00ffffff-no-rj",
    content:
      "Quality voice-overs in different languages without creating new videos? Vidoro gets it right.",
  },
  {
    name: "Chris Wilson",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSor30vW4SqoTpWEHKCGuF7Suvm7-TVWlb-Nw&s",
    content:
      "Effortlessly reaching viewers worldwide by just adding an audio track. Vidoro made global expansion simple for us.",
  },
  {
    name: "Nitish Rajput",
    image:
      "https://yt3.googleusercontent.com/i4-MMwgecNSAYn2a_7uHH3HnNsl4xOQlM9tRt47CSfYtfV5fqYD1nl49rnuR29jmLNlSUoaCqA=s900-c-k-c0x00ffffff-no-rj",
    content: "Game-changer for global reach. Simple and effective.",
  },
  {
    name: "David Thompson",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_790iFGstZRyTV_G4w5Nqz-884DPh3tj39g&s",
    content:
      "Vidoro's audio tracks are the easiest way to offer multi-language support on YouTube. So glad we found them.",
  },
  {
    name: "Gaurav Thakur",
    image:
      "https://yt3.googleusercontent.com/ytc/AIdro_nN4JNqHsIvck_6leJoMUWw3PQzNSRXL97ugjAn6_TU7mA=s800-c-k-c0x00ffffff-no-rj",
    content:
      "The voice quality in multiple languages is spot on. Helps my content connect with more people.",
  },
  {
    name: "Michael Anderson",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1jJm8I1Y7ScxGsjHIje8S14dzWLU18hC7bA&s",
    content:
      "Simple solution for going global. Just add the audio track, and new viewers can pick their language. Saves so much time. 🙂",
  },
  {
    name: "Amanda Martinez",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTovH25CYLeDFwlkH_qF4_FNvhus8RcxJq0rg&s",
    content:
      "Vidoro streamlines the multi-language process. Get the audio, upload to YouTube, done. Couldn't be easier.",
  },
  {
    name: "Jason Smith",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1P8RPg3H6sbj40agtWZfkYlTars7z9Is4sQ&s",
    content: "More languages on my videos? Vidoro makes it happen. Views are up.",
  },
];


type TestimonialProps = {
  name: string | JSX.Element;
  image: string;
  content: string;
};

const TestimonialCard = ({ name, image, content }: TestimonialProps) => {
  const getInitials = (n: string | JSX.Element): string => {
    // ... getInitials logic remains the same
    let textForInitials = "";
    if (typeof n === 'string') {
      textForInitials = n;
    } else if (React.isValidElement(n)) {
      const element = n as React.ReactElement<{ children?: React.ReactNode }>;
      const children = element.props.children;
      if (typeof children === 'string') {
        textForInitials = children;
      } else if (Array.isArray(children)) {
        textForInitials = children
          .map(child => (typeof child === 'string' ? child : ''))
          .join(' ')
          .trim();
      }
    }
    if (textForInitials) {
      return textForInitials.split(' ')
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'C';
    }
    return "C";
  };

  return (
    // Uses Card component which should be theme-aware from shadcn/ui or similar
    <Card className="w-[320px] bg-card/80 dark:bg-card/50 backdrop-blur-md border border-border mx-4 rounded-lg shadow-lg shrink-0">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-12 h-12 shrink-0">
            <AvatarImage src={image} alt={typeof name === "string" ? name : "Creator"} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-lg text-card-foreground break-words">
              {name}
            </h3>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed"> {/* Use muted-foreground for content */}
          {content}
        </p>
      </CardContent>
    </Card>
  );
};

const howItWorksSteps = [
  {
    id: "step1",
    icon: FiUploadCloud,
    title: "Submit Your Video",
    description: "Send us your English video content and specify which languages you need.",
    iconColor: "text-sky-500 dark:text-sky-300",
    hoverIconColor: "group-hover:text-sky-600 dark:group-hover:text-sky-200",
    iconBgGradient: "dark:from-sky-500/80 dark:via-cyan-500/70 dark:to-sky-600/80 from-sky-500/20 via-cyan-500/15 to-sky-600/20",
    shadowColor: "hover:shadow-sky-500/20", // This shadow is fine for both
    stepNumberBg: "bg-gradient-to-r from-sky-500 to-cyan-400", // Keep strong colors for step numbers
  },
  // ... other steps (update iconColor, hoverIconColor, iconBgGradient for light/dark)
  {
    id: "step2",
    icon: MdTranslate,
    title: "We Translate & Dub",
    description: "Our team translates your content and creates professional audio tracks with the help of AI.",
    iconColor: "text-purple-500 dark:text-purple-300",
    hoverIconColor: "group-hover:text-purple-600 dark:group-hover:text-purple-200",
    iconBgGradient: "dark:from-purple-500/80 dark:via-indigo-500/70 dark:to-purple-600/80 from-purple-500/20 via-indigo-500/15 to-purple-600/20",
    shadowColor: "hover:shadow-purple-500/20",
    stepNumberBg: "bg-gradient-to-r from-purple-500 to-indigo-400",
  },
  {
    id: "step3",
    icon: MdAudiotrack,
    title: "Receive Audio Tracks",
    description: "Get high-quality audio files ready to add to your YouTube videos.",
    iconColor: "text-emerald-500 dark:text-emerald-300",
    hoverIconColor: "group-hover:text-emerald-600 dark:group-hover:text-emerald-200",
    iconBgGradient: "dark:from-emerald-500/80 dark:via-green-500/70 dark:to-emerald-600/80 from-emerald-500/20 via-green-500/15 to-emerald-600/20",
    shadowColor: "hover:shadow-emerald-500/20",
    stepNumberBg: "bg-gradient-to-r from-emerald-500 to-green-400",
  },
];

export default function Testimonials() {
  const firstHalf = testimonials.slice(0, 5);
  const secondHalf = testimonials.slice(5);
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.1 });

  useEffect(() => {
    // GSAP animation logic remains the same
    let firstRowAnim: gsap.core.Tween | null = null;
    let secondRowAnim: gsap.core.Tween | null = null;
    const initTimeout = setTimeout(() => {
      if (firstRowRef.current) {
        const firstRowEl = firstRowRef.current;
        const firstRowContentWidth = firstRowEl.scrollWidth / 2;
        const speed = 50;
        const duration = firstRowContentWidth / speed;
        firstRowAnim = gsap.fromTo(firstRowEl, { x: 0 }, { x: -firstRowContentWidth, duration: duration, ease: "none", repeat: -1 });
      }
      if (secondRowRef.current) {
        const secondRowEl = secondRowRef.current;
        const secondRowContentWidth = secondRowEl.scrollWidth / 2;
        const speed = 50;
        const duration = secondRowContentWidth / speed;
        secondRowAnim = gsap.fromTo(secondRowEl, { x: -secondRowContentWidth }, { x: 0, duration: duration, ease: "none", repeat: -1 });
      }
    }, 100);
    return () => {
      clearTimeout(initTimeout);
      firstRowAnim?.kill();
      secondRowAnim?.kill();
    };
  }, []);

  // Arrow colors can be theme-dependent if needed, or use neutral/feature colors
  const arrowLineColor = "bg-gradient-to-r from-red-400/70 via-blue-400/70 to-purple-400/70"; // Keep as feature
  const arrowHeadColor = "border-blue-400/80"; // Keep as feature
  const arrowDotColor = "bg-blue-400"; // Keep as feature

  return (
    // Uses bg-background from body
    <section className="py-24 overflow-x-hidden relative text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-blue-500 dark:from-red-400 dark:via-red-300 dark:to-blue-400">
              Happy Creators
            </span>
          </h2>
        </div>

        {/* Fades for scrolling marquee - ensure they match background */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

        <div className="mb-24"> {/* Testimonial rows */}
          <div className="mb-8"><div ref={firstRowRef} className="flex">{firstHalf.map((t, i) => <TestimonialCard key={`f-${i}`} {...t} />)}{firstHalf.map((t, i) => <TestimonialCard key={`fc-${i}`} {...t} />)}</div></div>
          <div><div ref={secondRowRef} className="flex">{secondHalf.map((t, i) => <TestimonialCard key={`s-${i}`} {...t} />)}{secondHalf.map((t, i) => <TestimonialCard key={`sc-${i}`} {...t} />)}</div></div>
        </div>

        <div ref={howItWorksRef} className="mt-32 md:mt-40">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-blue-500 dark:from-red-400 dark:via-red-300 dark:to-blue-400">
                How It Works
              </span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
              Transform your content into multiple languages in just three simple steps
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Desktop How It Works */}
            <div className="hidden md:block">
              <div className="flex items-start justify-between relative">
                {howItWorksSteps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <motion.div
                      className={`group bg-card backdrop-blur-sm border border-border p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center transition-all duration-500 hover:border-border/70 ${step.shadowColor} relative z-10 w-[30%] max-w-xs`}
                      initial={{ opacity: 0, y: 60, scale: 0.9 }}
                      animate={howItWorksInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      whileHover={{ y: -8, scale: 1.03 }}
                    >
                      <div className={`absolute -top-4 -left-4 w-10 h-10 ${step.stepNumberBg} rounded-full flex items-center justify-center text-white font-bold text-md shadow-lg`}>{index + 1}</div>
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br ${step.iconBgGradient} border border-border/30 group-hover:border-border/50 transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                        <step.icon className={`w-10 h-10 ${step.iconColor} ${step.hoverIconColor} transition-colors duration-300`} />
                      </div>
                      <h3 className="text-2xl font-semibold text-card-foreground mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/70 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-accent-foreground transition-colors duration-300 text-sm">{step.description}</p>
                    </motion.div>
                    {index < howItWorksSteps.length - 1 && ( /* Arrow Connector */
                      <motion.div className="flex-1 flex items-center justify-center px-1 sm:px-2 md:px-4 relative z-0 mt-16" initial={{ opacity: 0, scale: 0.8 }} animate={howItWorksInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}>
                        <div className="relative w-full max-w-[120px] xl:max-w-[150px]">
                          <motion.div className={`h-1 ${arrowLineColor} rounded-full`} initial={{ width: 0 }} animate={howItWorksInView ? { width: "100%" } : {}} transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}/>
                          <motion.div className={`absolute -right-1 -top-[7px] w-4 h-4 border-r-2 border-t-2 ${arrowHeadColor} transform rotate-45`} initial={{ opacity: 0, x: -10 }} animate={howItWorksInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}/>
                          <motion.div className={`absolute top-[1px] left-0 w-2 h-2 ${arrowDotColor} rounded-full`} animate={{ x: ["0%", "100%", "0%"], opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 + 1, ease: "easeInOut" }}/>
                        </div>
                      </motion.div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            {/* Mobile How It Works */}
            <div className="md:hidden space-y-12">
              {howItWorksSteps.map((step, index) => (
                <React.Fragment key={`mobile-${step.id}`}>
                  <motion.div className={`group bg-card backdrop-blur-sm border border-border p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center transition-all duration-500 hover:border-border/70 ${step.shadowColor} relative`} initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={howItWorksInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.5, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }} whileHover={{ y: -6, scale: 1.02 }}>
                    <div className={`absolute -top-3 -left-3 w-8 h-8 ${step.stepNumberBg} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>{index + 1}</div>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br ${step.iconBgGradient} border border-border/30 group-hover:border-border/50 transition-all duration-300 group-hover:scale-105 shadow-md`}>
                      <step.icon className={`w-8 h-8 ${step.iconColor} ${step.hoverIconColor} transition-colors duration-300`}/>
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/70 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-accent-foreground transition-colors duration-300">{step.description}</p>
                  </motion.div>
                  {index < howItWorksSteps.length - 1 && ( /* Mobile Arrow Connector */
                    <motion.div className="flex justify-center" initial={{ opacity: 0, y: -10 }} animate={howItWorksInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}>
                      <div className="relative h-[50px]">
                        <motion.div className={`w-1 ${arrowLineColor} rounded-full`} initial={{ height: 0 }} animate={howItWorksInView ? { height: "100%" } : {}} transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}/>
                        <motion.div className={`absolute -bottom-[2px] -left-[7px] w-4 h-4 border-b-2 border-l-2 ${arrowHeadColor} transform rotate-45`} initial={{ opacity: 0, y: -5 }} animate={howItWorksInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.15 + 0.7 }}/>
                        <motion.div className={`absolute left-[1px] top-0 w-2 h-2 ${arrowDotColor} rounded-full`} animate={{ y: ["0%", "100%", "0%"], opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: index * 0.15 + 1, ease: "easeInOut" }} />
                      </div>
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}