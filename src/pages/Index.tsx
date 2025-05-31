// src/pages/Index.tsx
import React from "react";
import Hero from "@/components/home/Hero";
import SampleSection from "@/components/home/SampleSection";
import ServiceBoxes from "@/components/home/ServiceBoxes";
import Testimonials from "@/components/home/Testimonials";
import TeamAndScenes from "@/components/home/TeamAndScenes";
import HomeLayout from "@/components/home/HomeLayout";
import { motion } from "framer-motion";

const Index = () => {
  const componentVariants = { /* ... */ };

  return (
    <HomeLayout>
      {/* Hero Section */}
      <motion.div /* ... */ > <Hero /> </motion.div>

      {/* Sample Section */}
      <motion.div /* ... */ > <SampleSection /> </motion.div>

      {/* Service Boxes Section */}
      <motion.div /* ... */ > <ServiceBoxes /> </motion.div>

      {/* === TEST AREA START === */}
      {/* Comment out Testimonials first and check */}
      {/* <motion.div variants={componentVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} > <Testimonials /> </motion.div> */}

      {/* If Testimonials wasn't it, uncomment it and comment out TeamAndScenes, then check */}
      {/* <motion.div variants={componentVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} > <TeamAndScenes /> </motion.div> */}
      {/* === TEST AREA END === */}

      {/* Make sure to uncomment one of these if it wasn't the issue, or if it was, find the bug within that component */}
       <motion.div
        variants={componentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Testimonials />
      </motion.div>

      <motion.div
        variants={componentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <TeamAndScenes />
      </motion.div>

    </HomeLayout>
  );
};

export default Index;