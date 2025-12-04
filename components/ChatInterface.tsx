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

  const simulateTyping = async (text: string, messageId: string) => {
    setTypingMessageId(messageId)
    const words = text.split(' ')
    
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30))
      
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
      
      const assistantMessageId = (Date.now() + 1).toString()
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        fullResponse: data,
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)

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
        content: 'Sorry, I encountered an error connecting to the backend.',
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
    <div className="flex-1 flex flex-col pt-20">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 mb-8 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div
                    onClick={() => message.fullResponse && setSelectedMessage(message)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.fullResponse ? 'bg-rapidscale-600 cursor-pointer hover:bg-rapidscale-700 transition-colors' : 'bg-rapidscale-600'
                    }`}
                    title={message.fullResponse ? 'Click to view full response' : ''}
                  >
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-rapidscale-600 text-white rounded-2xl px-4 py-3' : 'text-gray-800'}`}>
                  {message.role === 'assistant' ? (
                    <div className="text-sm leading-relaxed prose prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-3 last:mb-0 text-gray-800">{children}</p>,
                          strong: ({ children }) => <strong className="font-bold text-rapidscale-700">{children}</strong>,
                          ul: ({ children }) => <ul className="list-disc ml-4 space-y-1 text-gray-700">{children}</ul>,
                          li: ({ children }) => <li className="text-gray-700">{children}</li>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                      {typingMessageId === message.id && (
                        <span className="inline-block w-1 h-4 ml-1 bg-rapidscale-600 animate-pulse"></span>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  )}
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 mb-8">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rapidscale-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-rapidscale-600" />
                <span className="text-sm text-gray-500">Thinking...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="sticky bottom-0 bg-gray-50 py-4">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex gap-3 items-end bg-white border border-gray-300 rounded-2xl shadow-lg p-2 hover:border-gray-400 focus-within:border-rapidscale-500 transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Message RapidScale AI..."
              className="flex-1 bg-transparent px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 w-8 h-8 bg-rapidscale-600 hover:bg-rapidscale-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            RapidScale AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selectedMessage && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMessage(null)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMessage(null)}>
              <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl border border-gray-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rapidscale-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Full Response Data</h3>
                      <p className="text-sm text-gray-600">JSON formatted response</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedMessage(null)} className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors">
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                  <pre className="bg-gray-900 rounded-xl p-6 text-sm text-gray-100 overflow-x-auto">
                    {JSON.stringify(selectedMessage.fullResponse, null, 2)}
                  </pre>
                </div>

                <div className="p-6 border-t border-gray-200 flex justify-end gap-3 bg-white">
                  <button onClick={() => navigator.clipboard.writeText(JSON.stringify(selectedMessage.fullResponse, null, 2))} className="px-6 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors text-gray-700">
                    Copy JSON
                  </button>
                  <button onClick={() => setSelectedMessage(null)} className="px-6 py-2 bg-rapidscale-600 hover:bg-rapidscale-700 text-white rounded-lg font-medium transition-all">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
