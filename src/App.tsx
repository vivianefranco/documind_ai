import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import DocumentUpload from './pages/DocumentUpload'
import ChatInterface from './pages/ChatInterface'
import DocumentList from './pages/DocumentList'
import Settings from './pages/Settings'

export type Page = 'dashboard' | 'upload' | 'chat' | 'documents' | 'settings'

export interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadedAt: string
  status: 'processing' | 'ready' | 'error'
  chunks: number
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  sources?: string[]
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Contract_Agreement_2024.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedAt: '2024-01-15',
      status: 'ready',
      chunks: 47,
    },
    {
      id: '2',
      name: 'Financial_Report_Q4.docx',
      type: 'DOCX',
      size: '1.8 MB',
      uploadedAt: '2024-01-14',
      status: 'ready',
      chunks: 32,
    },
    {
      id: '3',
      name: 'Legal_Compliance_Guide.pdf',
      type: 'PDF',
      size: '5.1 MB',
      uploadedAt: '2024-01-13',
      status: 'processing',
      chunks: 0,
    },
    {
      id: '4',
      name: 'Technical_Specifications.md',
      type: 'MD',
      size: '340 KB',
      uploadedAt: '2024-01-12',
      status: 'ready',
      chunks: 18,
    },
    {
      id: '5',
      name: 'Research_Paper_AI_Ethics.pdf',
      type: 'PDF',
      size: '3.7 MB',
      uploadedAt: '2024-01-10',
      status: 'ready',
      chunks: 62,
    },
  ])
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'system',
      content: 'Welcome to DocuMind AI! Upload your documents and ask questions about their content. I\'ll help you find relevant information using advanced RAG technology.',
      timestamp: new Date().toISOString(),
    },
  ])

  const addDocument = (doc: Document) => {
    setDocuments(prev => [doc, ...prev])
  }

  const addMessage = (msg: ChatMessage) => {
    setMessages(prev => [...prev, msg])
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard documents={documents} onNavigate={setCurrentPage} />
      case 'upload':
        return <DocumentUpload onUpload={addDocument} onNavigate={setCurrentPage} />
      case 'chat':
        return <ChatInterface messages={messages} onSendMessage={addMessage} documents={documents} />
      case 'documents':
        return <DocumentList documents={documents} setDocuments={setDocuments} />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard documents={documents} onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className={`flex-1 overflow-auto transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {renderPage()}
      </main>
    </div>
  )
}

export default App
