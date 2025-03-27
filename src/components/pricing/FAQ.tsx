import React from 'react';
import { motion } from 'framer-motion';
import FAQItem from './FAQItem';

const faqItems = [
  {
    question: "What is \"Automatic Upload on YouTube\"?",
    answer: [
      { content: "Automatic Upload on YouTube means we upload your translated videos directly to your new Hindi channel. You’ll need to create a dedicated Hindi YouTube channel and give us the \"Manageer/Editor\" role, allowing us to upload without accessing other parts of your account.", hasDot: false }
    ],
  },
  {
    question: "What exactly are \"minutes\" in these packages, and how do they work?",
    answer: [
      { content: "\"Minutes\" refer to the total duration of video content we can translate and upload for you. For example, if you have 60-minute's of credit, we’ll process and upload videos as long as their combined duration doesn’t exceed 60 minutes. You can use these minutes anytime, and we’ll continue translating and uploading until they’re used up.", hasDot: false }
    ],
  },
  {
    question: "Can I purchase more minutes anytime?",
    answer: [
      { content: "Answer: Yes, you can buy more minutes whenever you want, whether you’ve used all your current minutes or still have plenty left. Minutes are like a credit—you can top them up by purchasing any package, and the new minutes will be added to your existing balance. They never expire. You can track your minute usage and remaining balance after signing in to your account on our website.", hasDot: false }
    ],
  },
  {
    question: "How do you get my videos to translate?",
    answer: [
      { content: <strong>You have two options:</strong>, hasDot: false },
      { content: <span><strong>Upload directly:</strong> You can send your video to us yourself, preserving quality with no loss.</span>, hasDot: true },
      { content: <span><strong>Automatic detection:</strong> We can detect new videos you upload to your original channel, then translate and upload them to your Hindi channel within 8-24 hours. This option requires zero effort from you—just upload as usual, and we handle the rest. Note: This slightly reduces quality, but the difference is minimal and barely noticeable.</span>, hasDot: true },
    ],
  },
  {
    question: "Are there any additional costs or hidden fees?",
    answer: [
      { content: "No, there are no hidden fees. The price you see for each package is the full cost for the services included.", hasDot: false }
    ],
  },
  {
    question: "What is your turnaround time?",
    answer: [
      { content: "For all packages, delivery typically takes between 8 to 24 hours. Need it faster? Contact us directly to request expedited service!", hasDot: false }
    ],
  },
  {
    question: "How can I contact you?",
    answer: [
      { content: "You can reach us through the contact form on our website, which we prioritize for faster responses. Alternatively, you can email us at contact@vidoro.agency. We’re here to assist with any questions or requests!", hasDot: false }
    ],
  },
  {
    question: "What is \"Indian Viewers Adaptation\"?",
    answer: [
      { content: "Indian Viewers Adaptation means we make very minor changes to the content if something isn’t relevant to an Indian audience, adjusting it slightly to fit their context.", hasDot: false }
    ],
  },
  {
    question: "Why create a separate channel for India?",
    answer: [
      { content: "Creating a separate channel for Hindi videos allows for tailored content that resonates deeply with Indian viewers. This not only boosts your reach and viewership but also opens doors to new revenue streams, including sponsorships from companies eager to connect with the Indian audience. A dedicated channel optimizes for regional algorithms, maximizing your visibility and potential for growth in this valuable market.", hasDot: false }
    ],
  },
];

export default function PricingFAQ() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-medium px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 to-blue-500/10 border border-red-500/20 text-red-400 mb-6 inline-block"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-400"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-2xl blur-xl" />
          <motion.div
            className="relative bg-[#12121A] rounded-2xl border border-gray-800/50 backdrop-blur-xl p-8"
          >
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}