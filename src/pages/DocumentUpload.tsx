import { useState, useRef } from 'react'
import { Document, Page } from '../App'

interface DocumentUploadProps {
  onUpload: (doc: Document) => void
  onNavigate: (page: Page) => void
}

export default function DocumentUpload({ onUpload, onNavigate }: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      processFiles(files)
    }
  }

  const processFiles = (files: File[]) => {
    setUploading(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          
          files.forEach((file) => {
            const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE'
            const newDoc: Document = {
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              name: file.name,
              type: ext,
              size: formatFileSize(file.size),
              uploadedAt: new Date().toISOString().split('T')[0],
              status: 'processing',
              chunks: 0,
            }
            onUpload(newDoc)
            setUploadedFiles(prev => [...prev, file.name])
          })

          // Simulate processing completion
          setTimeout(() => {
            setUploadedFiles([])
          }, 5000)

          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const supportedFormats = ['PDF', 'DOCX', 'DOC', 'TXT', 'MD', 'CSV', 'XLSX', 'HTML']

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upload Documents</h1>
        <p className="text-gray-500 mt-1">Add documents to your knowledge base for AI-powered analysis</p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-blue-50 scale-[1.02]'
            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/30'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt,.md,.csv,.xlsx,.html"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center animate-pulse-glow">
              <i className="fa-solid fa-cloud-arrow-up text-blue-600 text-2xl"></i>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">Uploading & Processing...</p>
              <p className="text-sm text-gray-500 mt-1">Analyzing document structure and creating embeddings</p>
            </div>
            <div className="max-w-md mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-cloud-arrow-up text-gray-400 text-2xl"></i>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">Drag & drop your documents here</p>
              <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              <i className="fa-solid fa-folder-open mr-2"></i>
              Browse Files
            </button>
          </div>
        )}
      </div>

      {/* Supported Formats */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Supported Formats</h3>
        <div className="flex flex-wrap gap-2">
          {supportedFormats.map((format) => (
            <span
              key={format}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
            >
              .{format.toLowerCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Processing Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
            <i className="fa-solid fa-scissors text-blue-600"></i>
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">Smart Chunking</h4>
          <p className="text-xs text-gray-500 mt-1">Documents are split into semantic chunks for precise retrieval</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
            <i className="fa-solid fa-vector-square text-purple-600"></i>
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">Vector Embedding</h4>
          <p className="text-xs text-gray-500 mt-1">Each chunk is converted to high-dimensional vectors</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
            <i className="fa-solid fa-magnifying-glass text-green-600"></i>
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">Semantic Search</h4>
          <p className="text-xs text-gray-500 mt-1">Find relevant content using natural language queries</p>
        </div>
      </div>

      {/* Upload Success */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-check text-green-600"></i>
            </div>
            <div>
              <p className="font-medium text-green-800">Documents uploaded successfully!</p>
              <p className="text-sm text-green-600">
                {uploadedFiles.join(', ')} — Processing will complete shortly.
              </p>
            </div>
            <button
              onClick={() => onNavigate('chat')}
              className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Start Chatting →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
