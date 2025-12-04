/**
 * Custom hook for managing chat functionality
 */

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface UseChatOptions {
  apiUrl?: string
  onError?: (error: Error) => void
}

export function useChat(options: UseChatOptions = {}) {
  const { apiUrl = 'http://localhost:8080/ask', onError } = options
  
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage.content }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      const assistantMessageId = (Date.now() + 1).toString()
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)

      const responseText = data.answer || data.response || data.message || JSON.stringify(data)
      await simulateTyping(responseText, assistantMessageId)

    } catch (error) {
      const err = error as Error
      console.error('Error sending message:', err)
      
      if (onError) {
        onError(err)
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error connecting to the backend. Please make sure the server is running.',
      }
      
      setMessages(prev => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  return {
    messages,
    isLoading,
    typingMessageId,
    messagesEndRef,
    sendMessage,
    setMessages,
  }
}
