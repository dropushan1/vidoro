// src/pages/Index.tsx
import React from "react";
import Hero from "@/components/home/Hero";
import SampleSection from "@/components/home/SampleSection";
import ServiceBoxes from "@/components/home/ServiceBoxes";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import HomeLayout from "@/components/home/HomeLayout";
import { motion } from "framer-motion";

const Index = () => {
  const componentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <HomeLayout>
      <Hero />

      <motion.div variants={componentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <SampleSection />
      </motion.div>

      <motion.div variants={componentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <ServiceBoxes />
      </motion.div>

      <motion.div variants={componentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <Testimonials />
      </motion.div>

      <motion.div variants={componentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <FAQ />
      </motion.div>
    </HomeLayout>
  );
};

export default Index;