// src/components/home/ServiceBoxes.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IconType } from 'react-icons';
import { MdTranslate, MdGraphicEq, MdTimer, MdTrendingUp } from 'react-icons/md';

interface Service {
  title: string;
  desc: string;
  icon: IconType;
  // Gradients are tricky for light/dark. Keep them subtle or define variants.
  // For now, making them very subtle on light mode or dark-mode specific.
  gradient: string; // e.g., "dark:from-purple-600/20 dark:to-blue-500/20 from-purple-600/5 to-blue-500/5"
  iconColorClass: string; // e.g., "text-purple-600 dark:text-purple-400"
  hoverIconColorClass: string; // e.g., "group-hover:text-blue-500 dark:group-hover:text-blue-400"
  hoverTitleGradientClasses: string[]; // e.g. ["group-hover:from-purple-500", "group-hover:to-blue-500", "dark:group-hover:from-purple-400", "dark:group-hover:to-blue-400"]
}

const services: Service[] = [
  {
    title: "Advanced Translation",
    desc: "Combining AI tools with expert human review.",
    icon: MdTranslate,
    gradient: "dark:from-purple-600/20 dark:to-blue-500/20 from-purple-600/10 to-blue-500/10",
    iconColorClass: "text-purple-500 dark:text-purple-400",
    hoverIconColorClass: "group-hover:text-blue-500 dark:group-hover:text-blue-400",
    hoverTitleGradientClasses: ["group-hover:from-purple-600", "group-hover:to-blue-600", "dark:group-hover:from-purple-400", "dark:group-hover:to-blue-400"]
  },
  {
    title: "Seamless Background Audio",
    desc: "Your video's original music and environmental sounds are skillfully blended with the new voiceover.",
    icon: MdGraphicEq,
    gradient: "dark:from-emerald-500/20 dark:to-green-500/20 from-emerald-500/10 to-green-500/10",
    iconColorClass: "text-emerald-500 dark:text-emerald-400",
    hoverIconColorClass: "group-hover:text-green-500 dark:group-hover:text-green-400",
    hoverTitleGradientClasses: ["group-hover:from-emerald-600", "group-hover:to-green-600", "dark:group-hover:from-emerald-400", "dark:group-hover:to-green-400"]
  },
  {
    title: "Lightning Fast Delivery",
    desc: "Get your translated audio within hours.",
    icon: MdTimer,
    gradient: "dark:from-red-500/20 dark:to-orange-500/20 from-red-500/10 to-orange-500/10",
    iconColorClass: "text-red-500 dark:text-red-400",
    hoverIconColorClass: "group-hover:text-orange-500 dark:group-hover:text-orange-400",
    hoverTitleGradientClasses: ["group-hover:from-red-600", "group-hover:to-orange-600", "dark:group-hover:from-red-400", "dark:group-hover:to-orange-400"]
  },
  {
    title: "Reach New Audiences",
    desc: "Unlock massive growth potential by making your content accessible in multiple languages like Hindi, French, etc.",
    icon: MdTrendingUp,
    gradient: "dark:from-sky-500/20 dark:to-indigo-500/20 from-sky-500/10 to-indigo-500/10",
    iconColorClass: "text-sky-500 dark:text-sky-400",
    hoverIconColorClass: "group-hover:text-indigo-500 dark:group-hover:text-indigo-400",
    hoverTitleGradientClasses: ["group-hover:from-sky-600", "group-hover:to-indigo-600", "dark:group-hover:from-sky-400", "dark:group-hover:to-indigo-400"]
  }
];

const ServiceBoxes = () => {
  const { ref: serviceBoxesRef, inView: serviceBoxesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const { ref: communitySectionRef, inView: communitySectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const pieRadius = 40;
  const pieCircumference = 2 * Math.PI * pieRadius;
  const pieSegment80 = 0.8 * pieCircumference;
  const pieGap20 = 0.2 * pieCircumference;

  return (
    <section className="py-20 px-4 text-foreground" ref={serviceBoxesRef}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative flex-none transform-gpu"
              initial={{ opacity: 0, y: 20 }}
              animate={serviceBoxesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500`} />
              <div className="relative p-8 h-full bg-card rounded-2xl border border-border backdrop-blur-xl transition-all duration-500 group-hover:border-border/70 group-hover:translate-y-[-2px] will-change-transform">
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-muted/50 dark:bg-muted/30 flex items-center justify-center border border-border group-hover:border-border/70 transition-colors duration-500">
                    <service.icon className={`w-7 h-7 ${service.iconColorClass} ${service.hoverIconColorClass} transition-colors duration-500`} />
                  </div>
                </div>
                <h2 className={`text-xl font-semibold text-card-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${service.hoverTitleGradientClasses.join(" ")} transition-all duration-500`}>
                  {service.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          ref={communitySectionRef}
          className="mt-24 md:mt-32 py-12 md:py-16 rounded-xl bg-muted border border-border overflow-hidden relative" // Use bg-muted
          initial={{ opacity: 0, y: 50 }}
          animate={communitySectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br dark:from-blue-500/[0.05] dark:via-transparent dark:to-purple-500/[0.05] from-blue-500/[0.03] via-transparent to-purple-500/[0.03] blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-evenly gap-x-8 gap-y-12 px-6">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-[300px] md:h-[300px] shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r={pieRadius} fill="transparent" strokeWidth="18" className="stroke-border" />
                <circle
                  cx="50"
                  cy="50"
                  r={pieRadius}
                  fill="transparent"
                  strokeWidth="18"
                  strokeDasharray={`${pieSegment80} ${pieGap20}`}
                  strokeLinecap="round"
                  className="stroke-orange-500" // Keep feature color strong
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                 <span className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80 dark:from-white dark:to-white/80">
                  80%
                 </span>
                <p className="text-sm sm:text-base font-semibold mt-1 sm:mt-2 max-w-[160px] sm:max-w-[200px] text-muted-foreground">
                  of the world does not speak English
                </p>
              </div>
            </div>
            <div className="text-center md:text-left md:max-w-md lg:max-w-lg relative z-10">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-gray-400">
                Expand your community
              </h3>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Dubbing lets more people discover your videos
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceBoxes;