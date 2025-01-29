"use client"

import React from "react"
import VideoComparison from "@/components/work/VideoComparison"
import { motion } from "framer-motion"
import YoutubeVideo from "@/components/work/YoutubeVideo"
import { useInView } from "react-intersection-observer"

const Work = () => {
  const videos = [
    {
      originalId: "GJbUI2D3rLY",
      translatedId: "rovMJ49Ij_k",
    },
    {
      originalId: "kVpJ6BwG8zg",
      translatedId: "qKJBlTLcBKY",
    },
  ]

  const hindiVideos = [
    { id: "CVCbAoiNX6A", title: "Hindi Video 1" },
    { id: "dsuMPWZvX2Q", title: "Hindi Video 2" },
    { id: "NhWQE9hbT_o", title: "Hindi Video 3" },
    { id: "rq8UyDFUR7M", title: "Hindi Video 4" },
    { id: "mlAGyhBFZlU", title: "Hindi Video 5" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Some of Our Work
            </span>
          </h1>
        </motion.div>

        <div className="space-y-32">
          {videos.map((video, index) => (
            <VideoComparisonSection key={index} video={video} index={index} />
          ))}

          <HindiVideoShowcase videos={hindiVideos} />
        </div>
      </div>
    </div>
  )
}

export default Work

const VideoComparisonSection = ({ video, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="space-y-8"
    >
      <VideoComparison
        originalVideoId={video.originalId}
        translatedVideoId={video.translatedId}
        className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl"
        inView={inView}
      />
    </motion.div>
  )
}

const HindiVideoShowcase = ({ videos }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          More Hindi Videos
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <YoutubeVideo videoId={video.id} title={video.title} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}