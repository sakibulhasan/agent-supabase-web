'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-rapidscale-500 blur-xl opacity-50"></div>
              <Zap className="relative w-8 h-8 text-rapidscale-400" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rapidscale-400 to-rapidscale-600 bg-clip-text text-transparent">
              RapidScale AI Insight
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-rapidscale-400 transition-colors">
              Features
            </a>
            <a href="#chat" className="text-gray-300 hover:text-rapidscale-400 transition-colors">
              Chat
            </a>
            <button className="px-6 py-2 bg-rapidscale-600 hover:bg-rapidscale-500 rounded-lg transition-colors font-medium">
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
