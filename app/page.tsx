import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <ChatInterface />
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © 2025 RapidScale AI Insight. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-rapidscale-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-rapidscale-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-rapidscale-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
