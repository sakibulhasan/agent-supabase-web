'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Loader2, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  isTyping?: boolean
  fullResponse?: any
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your RapidScale AI assistant. How can I help you today?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate typing effect for a message
  const simulateTyping = async (text: string, messageId: string) => {
    setTypingMessageId(messageId)
    const words = text.split(' ')
    
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30)) // 30ms per word for smooth effect
      
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? { ...msg, content: words.slice(0, i + 1).join(' ') }
            : msg
        )
      )
    }
    
    setTypingMessageId(null)
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8080/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage.content }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from backend')
      }

      const data = await response.json()
      
      // Create assistant message with empty content initially
      const assistantMessageId = (Date.now() + 1).toString()
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        fullResponse: data, // Store the full response
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)

      // Extract summary from response, or use the entire response as fallback
      let responseText = ''
      if (data.summary) {
        responseText = data.summary
      } else if (data.answer || data.response || data.message) {
        responseText = data.answer || data.response || data.message
      } else {
        responseText = JSON.stringify(data)
      }
      
      await simulateTyping(responseText, assistantMessageId)

    } catch (error) {
      console.error('Error sending message:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error connecting to the backend. Please make sure the server is running on http://localhost:8080',
      }
      
      setMessages(prev => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <section id="chat" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience AI{' '}
            <span className="bg-gradient-to-r from-rapidscale-400 to-purple-500 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Ask anything. Get instant, intelligent responses.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Chat Container */}
          <div className="glass rounded-3xl overflow-hidden shadow-2xl shadow-rapidscale-500/10">
            {/* Messages Area */}
            <div className="h-[600px] overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-rapidscale-500 scrollbar-track-gray-800">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-4 ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      onClick={() => message.role === 'assistant' && message.fullResponse && setSelectedMessage(message)}
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-rapidscale-500 to-rapidscale-600'
                          : message.fullResponse
                          ? 'bg-gradient-to-br from-purple-500 to-pink-600 cursor-pointer hover:scale-110 transition-transform'
                          : 'bg-gradient-to-br from-purple-500 to-pink-600'
                      }`}
                      title={message.role === 'assistant' && message.fullResponse ? 'Click to view full response' : ''}
                    >
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Content */}
                    <div
                      className={`flex-1 max-w-[80%] ${
                        message.role === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div
                        className={`inline-block p-4 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-rapidscale-600 to-rapidscale-500 text-white'
                            : 'glass'
                        }`}
                      >
                        {message.role === 'assistant' ? (
                          <div className="text-sm md:text-base leading-relaxed prose prose-invert prose-sm max-w-none">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                                strong: ({ children }) => <strong className="font-bold text-rapidscale-300">{children}</strong>,
                                ul: ({ children }) => <ul className="list-disc ml-4 space-y-1">{children}</ul>,
                                li: ({ children }) => <li className="text-gray-300">{children}</li>,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                            {typingMessageId === message.id && (
                              <span className="inline-block w-1 h-4 ml-1 bg-rapidscale-400 animate-pulse"></span>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Thinking Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="glass p-4 rounded-2xl">
                    <div className="flex gap-2 items-center">
                      <Loader2 className="w-4 h-4 animate-spin text-rapidscale-400" />
                      <span className="text-sm text-gray-400">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-6 bg-gray-900/50">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    rows={1}
                    className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rapidscale-500 focus:border-transparent resize-none"
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-rapidscale-600 to-rapidscale-500 hover:from-rapidscale-500 hover:to-rapidscale-400 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* JSON Response Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedMessage(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Full Response Data</h3>
                      <p className="text-sm text-gray-400">JSON formatted response</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="w-10 h-10 rounded-xl glass glass-hover flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <pre className="bg-gray-900/50 rounded-xl p-6 text-sm text-gray-300 overflow-x-auto">
                    {JSON.stringify(selectedMessage.fullResponse, null, 2)}
                  </pre>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-white/10 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(selectedMessage.fullResponse, null, 2))
                    }}
                    className="px-6 py-2 glass glass-hover rounded-lg font-medium transition-colors"
                  >
                    Copy JSON
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-6 py-2 bg-gradient-to-r from-rapidscale-600 to-rapidscale-500 hover:from-rapidscale-500 hover:to-rapidscale-400 rounded-lg font-medium transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
