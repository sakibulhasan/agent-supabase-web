'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-rapidscale-500 blur-xl opacity-30"></div>
              <Zap className="relative w-8 h-8 text-rapidscale-600" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rapidscale-600 to-rapidscale-700 bg-clip-text text-transparent">
              RapidScale AI Insight
            </span>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
