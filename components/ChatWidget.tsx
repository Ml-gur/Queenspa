import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Phone, MapPin, Calendar, RefreshCw } from 'lucide-react'
import { projectId, publicAnonKey } from '../utils/supabase/info'

interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface ConversationContext {
  sessionId: string
  currentStage: string
  bookingData: any
  messageHistory: ChatMessage[]
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const [context, setContext] = useState<ConversationContext | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeConversation()
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isLoading])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const initializeConversation = async () => {
    setIsLoading(true)
    try {
      const response = await sendMessageToAI('Hello')
      if (response) {
        const botMessage: ChatMessage = {
          id: `bot_${Date.now()}`,
          type: 'bot',
          content: response.response,
          timestamp: new Date(),
          suggestions: response.suggestions
        }
        setMessages([botMessage])
        setContext(response.context)
      }
    } catch (error) {
      console.error('Failed to initialize conversation:', error)
      const errorMessage: ChatMessage = {
        id: 'error_init',
        type: 'bot',
        content: "Hello! Welcome to Annabella's Hair Salon! 💇‍♀️ I'm here to help you book an appointment or answer any questions. How can I assist you today?",
        timestamp: new Date(),
        suggestions: ['Book Appointment', 'View Services', 'Check Prices', 'Location Info']
      }
      setMessages([errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessageToAI = async (message: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e43aaacd/api/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sessionId,
          phoneNumber: undefined // Could be extracted from localStorage or user input
        })
      })

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error('Failed to get AI response')
      }
    } catch (error) {
      console.error('Error sending message to AI:', error)
      throw error
    }
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Send to AI
      const aiResponse = await sendMessageToAI(content)
      
      if (aiResponse) {
        const botMessage: ChatMessage = {
          id: `bot_${Date.now()}`,
          type: 'bot',
          content: aiResponse.response,
          timestamp: new Date(),
          suggestions: aiResponse.suggestions
        }
        
        setMessages(prev => [...prev, botMessage])
        setContext(aiResponse.context)

        // Handle special cases
        if (aiResponse.response.includes('APPOINTMENT CONFIRMED')) {
          // Auto-scroll and maybe show additional UI elements
          setTimeout(() => {
            scrollToBottom()
          }, 500)
        }
      }
    } catch (error) {
      console.error('Error in conversation:', error)
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        type: 'bot',
        content: "I'm sorry, I'm having trouble responding right now. Please try again or contact us directly.",
        timestamp: new Date(),
        suggestions: ['Try Again', 'Call Salon', 'WhatsApp', 'Refresh Chat']
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === 'Call Now' || suggestion === 'Call Salon') {
      window.location.href = 'tel:+254712345678'
      return
    }
    
    if (suggestion === 'WhatsApp') {
      window.open('https://wa.me/254712345678?text=Hello! I would like to book an appointment at Annabella\'s Hair Salon.', '_blank')
      return
    }

    if (suggestion === 'Get Directions') {
      window.open('https://maps.google.com/?q=Ongata+Rongai+Kenya', '_blank')
      return
    }

    if (suggestion === 'Refresh Chat') {
      handleRefreshChat()
      return
    }

    if (suggestion === 'Add to Calendar') {
      // Extract appointment details from context and create calendar event
      if (context?.bookingData) {
        const { serviceName, date, time, staffName } = context.bookingData
        const startDate = new Date(`${date}T${time}:00`)
        const endDate = new Date(startDate.getTime() + 90 * 60000) // Default 90 minutes
        
        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Hair Appointment - ${serviceName}`)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(`Appointment at Annabella's Hair Salon with ${staffName}`)}&location=${encodeURIComponent('Ongata Rongai, Kenya')}`
        
        window.open(calendarUrl, '_blank')
      }
      return
    }

    // Send suggestion as a message
    sendMessage(suggestion)
  }

  const handleRefreshChat = async () => {
    try {
      // Clear session on backend
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e43aaacd/api/chat/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        }
      })
      
      // Reset local state
      setMessages([])
      setContext(null)
      setInputMessage('')
      
      // Reinitialize
      await initializeConversation()
    } catch (error) {
      console.error('Error refreshing chat:', error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputMessage)
  }

  const getStageIndicator = () => {
    if (!context) return null

    const stageLabels = {
      'greeting': '👋 Welcome',
      'service_discovery': '💇‍♀️ Choosing Service',
      'availability_check': '📅 Checking Availability',
      'staff_selection': '👩‍💼 Selecting Stylist',
      'customer_details': '📝 Your Details',
      'confirmation': '✅ Confirming Booking'
    }

    return stageLabels[context.currentStage as keyof typeof stageLabels] || '💬 Chatting'
  }

  const formatMessageContent = (content: string) => {
    // Format the message content with better styling
    const lines = content.split('\n')
    return lines.map((line, index) => {
      if (line.startsWith('📋') || line.startsWith('🎉') || line.startsWith('📅')) {
        return <div key={index} className="font-semibold text-pink-600 mb-2">{line}</div>
      }
      if (line.startsWith('•')) {
        return <div key={index} className="ml-4 text-sm">{line}</div>
      }
      if (line.includes('KES')) {
        return <div key={index} className="font-medium text-green-600">{line}</div>
      }
      return <div key={index} className={line.trim() ? '' : 'h-2'}>{line}</div>
    })
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-200 z-50 group"
        >
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            AI
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with our AI assistant 🤖
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-gray-900 border-y-4 border-y-transparent"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-2rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Annabella's AI Assistant</h3>
                <p className="text-pink-100 text-sm flex items-center space-x-1">
                  <span>{getStageIndicator()}</span>
                  {isLoading && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRefreshChat}
                className="text-white/80 hover:text-white transition-colors p-1 rounded"
                title="Refresh chat"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="flex items-start space-x-2 max-w-[85%]">
                  {message.type === 'bot' && (
                    <div className="bg-pink-500 p-1.5 rounded-full flex-shrink-0 mt-1">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                  )}
                  
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user' 
                      ? 'bg-pink-500 text-white rounded-br-md' 
                      : 'bg-white text-gray-900 rounded-bl-md shadow-sm border border-gray-100'
                  }`}>
                    <div className="text-sm">
                      {message.type === 'bot' ? formatMessageContent(message.content) : message.content}
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs text-gray-500 font-medium">Quick actions:</div>
                        <div className="grid grid-cols-1 gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-left p-2 bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 rounded-lg text-xs font-medium hover:from-pink-100 hover:to-purple-100 transition-colors border border-pink-200 flex items-center space-x-2"
                            >
                              {suggestion.includes('Call') && <Phone className="h-3 w-3" />}
                              {suggestion.includes('WhatsApp') && <MessageCircle className="h-3 w-3" />}
                              {suggestion.includes('Directions') && <MapPin className="h-3 w-3" />}
                              {suggestion.includes('Calendar') && <Calendar className="h-3 w-3" />}
                              <span>{suggestion}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {message.type === 'user' && (
                    <div className="bg-gray-500 p-1.5 rounded-full flex-shrink-0 mt-1">
                      <User className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="bg-pink-500 p-1.5 rounded-full">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4 bg-white">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 text-white p-3 rounded-xl transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            {/* Quick Actions Footer */}
            <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
              <div className="flex space-x-4">
                <button
                  onClick={() => window.open('https://wa.me/254712345678', '_blank')}
                  className="flex items-center space-x-1 hover:text-green-600"
                >
                  <MessageCircle className="h-3 w-3" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={() => window.location.href = 'tel:+254712345678'}
                  className="flex items-center space-x-1 hover:text-blue-600"
                >
                  <Phone className="h-3 w-3" />
                  <span>Call</span>
                </button>
              </div>
              <span>Powered by AI 🤖</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}