import { useState, useRef, useEffect } from 'react'
import { ChatMessage, Document } from '../App'

interface ChatInterfaceProps {
  messages: ChatMessage[]
  onSendMessage: (msg: ChatMessage) => void
  documents: Document[]
}

const sampleResponses = [
  {
    answer: "Based on the Contract Agreement (Section 4.2), the termination clause requires a 30-day written notice period. Both parties must provide formal notification via registered mail or email with read receipt confirmation. The agreement also specifies that any outstanding obligations must be fulfilled within 15 business days after termination.",
    sources: ['Contract_Agreement_2024.pdf', 'Legal_Compliance_Guide.pdf'],
  },
  {
    answer: "According to the Financial Report Q4, the total revenue increased by 23% year-over-year, reaching $4.7M. Key growth drivers include the expansion into European markets (+15%) and the launch of the new SaaS product line (+8%). Operating margins improved from 12% to 18% due to operational efficiencies.",
    sources: ['Financial_Report_Q4.docx'],
  },
  {
    answer: "The Technical Specifications document outlines a microservices architecture with the following components: 1) API Gateway (Kong), 2) Authentication Service (OAuth 2.0 + JWT), 3) Document Processing Pipeline (Apache Kafka), 4) Vector Store (Pinecone/pgvector), and 5) LLM Orchestration Layer (LangChain). The system is designed for horizontal scalability with Kubernetes orchestration.",
    sources: ['Technical_Specifications.md', 'Research_Paper_AI_Ethics.pdf'],
  },
  {
    answer: "Based on the AI Ethics research paper, the key principles for responsible AI deployment in document review include: 1) Transparency - all AI decisions must be explainable, 2) Fairness - models must be tested for bias across different document types, 3) Privacy - sensitive information must be redacted before processing, and 4) Accountability - human oversight must be maintained for critical decisions.",
    sources: ['Research_Paper_AI_Ethics.pdf'],
  },
]

export default function ChatInterface({ messages, onSendMessage, documents }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const readyDocs = documents.filter(d => d.status === 'ready')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    }
    onSendMessage(userMsg)
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        timestamp: new Date().toISOString(),
        sources: response.sources,
      }
      onSendMessage(assistantMsg)
      setIsTyping(false)
    }, 1500 + Math.random() * 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const suggestedQuestions = [
    "What are the key terms in the contract?",
    "Summarize the Q4 financial results",
    "What is the system architecture?",
    "What are the AI ethics guidelines?",
  ]

  return (
    <div className="flex flex-col h-screen animate-fade-in">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Chat</h1>
            <p className="text-sm text-gray-500">Ask questions about your documents • RAG-powered responses</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700">{readyDocs.length} docs indexed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role !== 'user' && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-brain text-white text-xs"></i>
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : msg.role === 'system'
                  ? 'bg-gray-100 text-gray-700 border border-gray-200'
                  : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-2">
                    <i className="fa-solid fa-bookmark mr-1"></i> Sources:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.sources.map((source, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-md font-medium"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <p className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-user text-white text-xs"></i>
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-brain text-white text-xs"></i>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="px-8 pb-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Suggested Questions</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(q)
                  inputRef.current?.focus()
                }}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-8 py-4">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about your documents..."
              rows={1}
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <i className="fa-solid fa-paper-plane text-sm"></i>
          </button>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">
          <i className="fa-solid fa-info-circle mr-1"></i>
          Responses are generated using RAG from your uploaded documents. Press Enter to send, Shift+Enter for new line.
        </p>
      </div>
    </div>
  )
}
