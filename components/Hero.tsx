'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

export default function Hero() {
  const scrollToChat = () => {
    document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rapidscale-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full glass text-rapidscale-400 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Next-Generation AI Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Transform Data Into{' '}
            <span className="bg-gradient-to-r from-rapidscale-400 via-rapidscale-500 to-purple-500 bg-clip-text text-transparent">
              Actionable Insights
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            Experience enterprise-grade AI with real-time processing, scalable infrastructure, 
            and unparalleled security. Your intelligent assistant is ready.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={scrollToChat}
              className="group px-8 py-4 bg-gradient-to-r from-rapidscale-600 to-rapidscale-500 hover:from-rapidscale-500 hover:to-rapidscale-400 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-rapidscale-500/50 hover:shadow-rapidscale-400/50 hover:scale-105"
            >
              Start Chatting
              <ArrowDown className="inline-block ml-2 w-5 h-5 group-hover:animate-bounce" />
            </button>
            <button className="px-8 py-4 glass glass-hover rounded-xl font-semibold text-lg">
              View Documentation
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-gray-500"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
