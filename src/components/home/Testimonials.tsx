// src/components/home/Testimonials.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ChevronRight, Zap } from "lucide-react";

// Testimonials data remains the same
const testimonials = [
    {
      name: "Sarah Miller",
      image:
        "https://www.economicliberties.us/wp-content/uploads/2022/11/SM-Headshot-2.png",
      content:
        "Our Hindi channel's bringing in new viewers and even sponsors, which is great. Vidoro's been a solid help.",
    },
    {
      name: (
        <a
          href="https://www.instagram.com/thevarunmayya/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:underline"
        >
          Varun Mayya
        </a>
      ),
      image:
        "https://yt3.ggpht.com/ytc/AIdro_nrZfnUxi_DwFSlJyuQvZN-JWkiZHkgwUaZJPhiIu-ZNLI=s800-c-k-c0x00ffffff-no-rj",
      content:
        "Wasn't sure at first, but Vidoro is legit. Hindi channel's growing fast now. 👍",
    },
    {
      name: "Sabin Mathew",
      image:
        "https://yt3.googleusercontent.com/uI3J9rcN5QvBD5rPMj5SaDUp41PIvTergbOWIKam39L7xxpzBT99zqcMiLrJ0qXalORqg0hKjA=s800-c-k-c0x00ffffff-no-rj",
      content:
        "Translations used to be a headache for me. Vidoro just takes care of it, and the quality is good.",
    },
    {
      name: "Chris Wilson",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSor30vW4SqoTpWEHKCGuF7Suvm7-TVWlb-Nw&s",
      content:
        "India's a big audience we wanted to tap into. Vidoro helped us do that, made it much easier.",
    },
    {
      name: "Nitish Rajput",
      image:
        "https://yt3.googleusercontent.com/i4-MMwgecNSAYn2a_7uHH3HnNsl4xOQlM9tRt47CSfYtfV5fqYD1nl49rnuR29jmLNlSUoaCqA=s900-c-k-c0x00ffffff-no-rj",
      content: "Vidoro is awesome. They get it.",
    },
    {
      name: "David Thompson",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_790iFGstZRyTV_G4w5Nqz-884DPh3tj39g&s",
      content:
        "Glad we found Vidoro. Reaching Indian viewers is way easier now for us.",
    },
    {
      name: "Gaurav Thakur",
      image:
        "https://yt3.googleusercontent.com/ytc/AIdro_nN4JNqHsIvck_6leJoMUWw3PQzNSRXL97ugjAn6_TU7mA=s800-c-k-c0x00ffffff-no-rj",
      content:
        "Vidoro's translations are on point. They really get my content's vibe, which is key.",
    },
    {
      name: "Michael Anderson",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1jJm8I1Y7ScxGsjHIje8S14dzWLU18hC7bA&s",
      content:
        "Cost was a concern, but it's been worth it for us. Hindi views are up. 🙂",
    },
    {
      name: "Amanda Martinez",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTovH25CYLeDFwlkH_qF4_FNvhus8RcxJq0rg&s",
      content:
        "Vidoro makes the whole thing simple. Big time-saver, which I appreciate.",
    },
    {
      name: "Jason Smith",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1P8RPg3H6sbj40agtWZfkYlTars7z9Is4sQ&s",
      content: "Translations good. Views up. Worth it yeh.",
    },
];

type TestimonialProps = {
  name: string | JSX.Element;
  image: string;
  content: string;
};

const TestimonialCard = ({ name, image, content }: TestimonialProps) => {
  const getInitials = (n: string | JSX.Element): string => {
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
        <p className="text-muted-foreground leading-relaxed">
          {content}
        </p>
      </CardContent>
    </Card>
  );
};

export default function Testimonials() {
  const firstHalf = testimonials.slice(0, 5);
  const secondHalf = testimonials.slice(5);
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.1 });

  useEffect(() => {
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

  return (
    <section className="py-24 overflow-x-hidden relative text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-blue-500 dark:from-red-400 dark:via-red-300 dark:to-blue-400">
              Happy Creators
            </span>
          </h2>
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

        <div className="mb-24">
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

          <div className="relative my-16 max-w-6xl mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transform -translate-y-1/2 hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <motion.div
                className="bg-card rounded-xl p-6 flex flex-col items-center text-center border border-border shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/40"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={howItWorksInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-card-foreground">1</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-card-foreground">
                  Your English Channel
                </h3>
                <p className="text-muted-foreground">
                  Continue creating content as usual on your original English channel.
                </p>
                <div className="mt-4 w-full h-40 bg-card/70 rounded-lg overflow-hidden relative border border-border">
                  <div className="absolute top-0 left-0 w-full h-8 bg-card/80 flex items-center px-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-auto text-xs text-muted-foreground">
                      youtube.com
                    </div>
                  </div>
                  <div className="absolute top-8 left-0 w-full h-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 flex items-center px-4">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">
                      EN
                    </div>
                    <div className="ml-3">
                      <div className="h-2 w-32 bg-muted rounded-full"></div>
                      <div className="h-2 w-20 bg-muted rounded-full mt-2"></div>
                    </div>
                  </div>
                  <div className="absolute top-28 left-0 w-full px-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-16 bg-muted rounded-md flex items-center justify-center"><div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center"><div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent"></div></div></div>
                      <div className="h-16 bg-muted rounded-md flex items-center justify-center"><div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center"><div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent"></div></div></div>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full mt-2"></div>
                    <div className="h-2 w-3/4 bg-muted rounded-full mt-2"></div>
                  </div>
                </div>
                <div className="flex justify-center mt-6 md:hidden"><div className="w-10 h-10 bg-pink-500/30 rounded-full flex items-center justify-center animate-pulse"><ChevronRight className="w-6 h-6 text-pink-400" /></div></div>
              </motion.div>

              <div className="absolute left-[30%] top-1/2 transform -translate-y-1/2 -translate-x-1/2 hidden md:block z-10">
                <motion.div className="w-12 h-12 bg-pink-500/30 rounded-full flex items-center justify-center animate-pulse" animate={howItWorksInView ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}><ChevronRight className="w-8 h-8 text-pink-400" /></motion.div>
              </div>

              {/* Step 2 */}
              <motion.div
                className="bg-card rounded-xl p-6 flex flex-col items-center text-center border border-border shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:shadow-pink-500/20 hover:border-pink-500/40"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={howItWorksInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mb-4"><div className="w-12 h-12 bg-pink-500/30 rounded-full flex items-center justify-center"><span className="text-xl font-bold text-card-foreground">2</span></div></div>
                <h3 className="text-xl font-bold mb-2 text-card-foreground">Vidoro's Magic</h3>
                <p className="text-muted-foreground">We Translate, Optimize, and Upload to Your Hindi Channel.</p>
                <div className="mt-4 w-full h-40 bg-card/70 rounded-lg overflow-hidden relative border border-border">
                  <div className="absolute inset-0 flex items-center justify-center"><motion.div className="w-20 h-20 rounded-full bg-pink-500/20 animate-pulse flex items-center justify-center" animate={howItWorksInView ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 1, repeat: Infinity, delay: 0.7 }}><Zap className="w-10 h-10 text-pink-400" /></motion.div></div>
                  <div className="absolute top-0 left-0 w-full h-full flex">
                    <div className="w-1/2 border-r border-dashed border-pink-500/50 flex items-center justify-center"><div className="space-y-2 px-4"><div className="h-2 w-20 bg-muted rounded-full"></div><div className="h-2 w-16 bg-muted rounded-full"></div><div className="h-2 w-24 bg-muted rounded-full"></div><div className="text-xs text-muted-foreground mt-2">English</div></div></div>
                    <div className="w-1/2 flex items-center justify-center"><div className="space-y-2 px-4"><div className="h-2 w-20 bg-pink-500/40 rounded-full"></div><div className="h-2 w-16 bg-pink-500/40 rounded-full"></div><div className="h-2 w-24 bg-pink-500/40 rounded-full"></div><div className="text-xs text-muted-foreground mt-2">हिन्दी</div></div></div>
                  </div>
                  <motion.div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-pink-400" animate={howItWorksInView ? { scale: [0, 1.5, 0], opacity: [0, 1, 0] } : {}} transition={{ duration: 2, repeat: Infinity, delay: 1 }}></motion.div>
                  <motion.div className="absolute top-3/4 left-2/3 w-2 h-2 rounded-full bg-purple-400" animate={howItWorksInView ? { scale: [0, 1.5, 0], opacity: [0, 1, 0] } : {}} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}></motion.div>
                  <motion.div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-blue-400" animate={howItWorksInView ? { scale: [0, 1.5, 0], opacity: [0, 1, 0] } : {}} transition={{ duration: 2, repeat: Infinity, delay: 2 }}></motion.div>
                </div>
                <div className="flex justify-center mt-6 md:hidden"><motion.div className="w-10 h-10 bg-red-500/30 rounded-full flex items-center justify-center animate-pulse" animate={howItWorksInView ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}><ChevronRight className="w-6 h-6 text-red-400" /></motion.div></div>
              </motion.div>

              <div className="absolute left-[70%] top-1/2 transform -translate-y-1/2 -translate-x-1/2 hidden md:block z-10">
                <motion.div className="w-12 h-12 bg-red-500/30 rounded-full flex items-center justify-center animate-pulse" animate={howItWorksInView ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}><ChevronRight className="w-8 h-8 text-red-400" /></motion.div>
              </div>

              {/* Step 3 */}
              <motion.div
                className="bg-card rounded-xl p-6 flex flex-col items-center text-center border border-border shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:shadow-red-500/20 hover:border-red-500/40"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={howItWorksInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4"><div className="w-12 h-12 bg-red-500/30 rounded-full flex items-center justify-center"><span className="text-xl font-bold text-card-foreground">3</span></div></div>
                <h3 className="text-xl font-bold mb-2 text-card-foreground">Your Hindi Channel</h3>
                <p className="text-muted-foreground">Watch your Hindi channel grow with perfectly translated content.</p>
                <div className="mt-4 w-full h-40 bg-card/70 rounded-lg overflow-hidden relative border border-border">
                  <div className="absolute top-0 left-0 w-full h-8 bg-card/80 flex items-center px-3"><div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div><div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div><div className="w-3 h-3 rounded-full bg-green-500"></div><div className="ml-auto text-xs text-muted-foreground">youtube.com</div></div>
                  <div className="absolute top-8 left-0 w-full h-16 bg-gradient-to-r from-red-600/20 to-orange-600/20 flex items-center px-4"><div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold text-white">HI</div><div className="ml-3"><div className="h-2 w-32 bg-muted rounded-full"></div><div className="h-2 w-20 bg-muted rounded-full mt-2"></div></div></div>
                  <div className="absolute top-28 left-0 w-full px-4">
                    <div className="grid grid-cols-2 gap-2"><div className="h-16 bg-muted rounded-md flex items-center justify-center"><div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center"><div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent"></div></div></div><div className="h-16 bg-muted rounded-md flex items-center justify-center"><div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center"><div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent"></div></div></div></div>
                    <div className="h-2 w-full bg-muted rounded-full mt-2"></div><div className="h-2 w-3/4 bg-muted rounded-full mt-2"></div>
                  </div>
                  <div className="absolute bottom-2 right-2"><div className="flex items-center space-x-1"><div className="h-3 w-1 bg-green-500 rounded-sm"></div><div className="h-4 w-1 bg-green-500 rounded-sm"></div><div className="h-5 w-1 bg-green-500 rounded-sm"></div><div className="h-6 w-1 bg-green-500 rounded-sm"></div><div className="h-7 w-1 bg-green-500 rounded-sm"></div></div></div>
                </div>
              </motion.div>

            </div>
            <div className="max-w-2xl mx-auto text-center mt-16 mb-10">
              <p className="text-muted-foreground mb-8">
                Create a new YouTube channel, grant Vidoro "Manager/Editor" role, and we'll handle the rest. Your videos will be automatically translated and uploaded to your Hindi channel within 8-24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}