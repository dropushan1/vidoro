// src/components/home/ServiceBoxes.tsx
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IconType } from 'react-icons';
import { MdTranslate, MdGraphicEq, MdTimer, MdTrendingUp } from 'react-icons/md';
// --- NEW DEPENDENCY: You need to `npm install recharts` for the bar chart ---
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface Service {
  title: string;
  desc: string;
  icon: IconType;
  gradient: string;
  iconColorClass: string;
  hoverIconColorClass: string;
  hoverTitleGradientClasses: string[];
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

// --- DATA FOR THE NEW BAR CHART ---
const chartData = [
  { country: "India", users: 500, flag: "🇮🇳" },
  { country: "USA", users: 240, flag: "🇺🇸" },
  { country: "Brazil", users: 144, flag: "🇧🇷" },
  { country: "Indonesia", users: 139, flag: "🇮🇩" },
  { country: "Japan", users: 78, flag: "🇯🇵" },
];

const ServiceBoxes = () => {
  const { ref: serviceBoxesRef, inView: serviceBoxesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const { ref: communitySectionRef, inView: communitySectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section className="py-20 px-4 text-foreground" ref={serviceBoxesRef}>
      <div className="container mx-auto">
        {/* The four service boxes at the top remain unchanged */}
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

        {/* --- NEW COMMUNITY SECTION: REPLACES THE OLD PIE CHART --- */}
        <motion.div
          ref={communitySectionRef}
          className="mt-24 md:mt-32"
          initial={{ opacity: 0, y: 50 }}
          animate={communitySectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Main Heading */}
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-gray-400">
              Conquer the World's Largest Audience
            </h3>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              India is YouTube's biggest market. Dubbing your content is key to unlocking immense growth and engagement.
            </p>
          </div>

          {/* Chart and Stats Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Bar Chart */}
            <div className="lg:col-span-3 h-96 p-4 bg-card rounded-2xl border border-border relative">
                <div className="absolute top-4 left-6">
                    <h4 className="font-bold text-card-foreground">YouTube Users by Country</h4>
                    <p className="text-sm text-muted-foreground">Monthly active users in millions</p>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 60, right: 10, left: -20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                        <XAxis dataKey="country" stroke="hsl(var(--muted-foreground) / 0.5)" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                        <YAxis stroke="hsl(var(--muted-foreground) / 0.5)" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted) / 0.5)' }}
                            content={({ active, payload, label }) =>
                                active && payload && payload.length ? (
                                    <div className="bg-card p-3 border border-border rounded-lg shadow-lg">
                                        <p className="text-base font-bold text-card-foreground">{`${chartData.find(d => d.country === label)?.flag} ${label}`}</p>
                                        <p className="text-sm text-muted-foreground">{`Users: ${payload[0].value}M`}</p>
                                    </div>
                                ) : null
                            }
                        />
                        <Bar dataKey="users" radius={[4, 4, 0, 0]} className="fill-orange-500" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Stats Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="p-6 text-center bg-card rounded-2xl border border-border">
                <div className="text-4xl mb-2">🇮🇳</div>
                <h4 className="font-semibold text-card-foreground">India's Dominance</h4>
                <p className="text-4xl font-bold text-orange-500 my-2">500M+</p>
                <p className="text-xs px-3 py-1 bg-muted rounded-full inline-block font-medium">#1 Largest Market Globally</p>
              </div>
              <div className="p-6 text-center bg-card rounded-2xl border border-border">
                <div className="text-4xl mb-2">🚀</div>
                <h4 className="font-semibold text-card-foreground">Growth Opportunity</h4>
                <p className="text-4xl font-bold text-sky-500 my-2">2x</p>
                <p className="text-xs px-3 py-1 bg-muted rounded-full inline-block font-medium">Larger than the US Market</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceBoxes;