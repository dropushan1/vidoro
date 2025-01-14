import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Languages, Palette, Upload as UploadIcon } from 'lucide-react';
import FAQ from '@/components/process/FAQ';

const Process = () => {
  const steps = [
    {
      icon: Upload,
      title: "Send Your Video File",
      description: "Simply share your video editing software's project file through Cloud"
    },
    {
      icon: Languages,
      title: "Translate and Voice Over",
      description: "Professional translation and Hindi voice over"
    },
    {
      icon: Palette,
      title: "Cultural Adaptation",
      description: "Video optimization and cultural adaptation to resonate with the Indian audience"
    },
    {
      icon: UploadIcon,
      title: "Optimized Upload for Reach",
      description: "We upload and optimize your video for maximum reach"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-10"> {/* Reduced padding bottom from pb-20 */}
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 text-center"
          >
            Our Process
          </motion.h1>

          <div className="flex flex-nowrap overflow-x-auto gap-8 pb-8 px-4 mt-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg p-6 relative"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-red-600 p-3 rounded-full">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-red-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
        <div className="mb-10"> {/* added a bottom margin to create spacing before FAQ */}
      <FAQ />
        </div>
    <div className="h-20"></div> {/* Added a div for bottom gap */}
    </div>
  );
};

export default Process;