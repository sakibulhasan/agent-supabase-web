'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Lightning-fast AI responses powered by cutting-edge infrastructure. Process complex queries in milliseconds.',
    gradient: 'from-rapidscale-500 to-rapidscale-600',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Infrastructure',
    description: 'Built to grow with your needs. Handle millions of requests with enterprise-grade reliability and performance.',
    gradient: 'from-rapidscale-600 to-purple-600',
  },
  {
    icon: Shield,
    title: 'Secure Intelligence',
    description: 'Bank-level encryption and compliance. Your data stays private with end-to-end security protocols.',
    gradient: 'from-purple-600 to-pink-600',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-rapidscale-400 to-rapidscale-600 bg-clip-text text-transparent">
              RapidScale
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Enterprise-ready AI platform designed for performance, scalability, and security.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass glass-hover rounded-2xl p-8 relative overflow-hidden group"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
