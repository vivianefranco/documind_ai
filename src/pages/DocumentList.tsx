import { useState } from 'react'
import { Document } from '../App'

interface DocumentListProps {
  documents: Document[]
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>
}

export default function DocumentList({ documents, setDocuments }: DocumentListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleDelete = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id))
    if (selectedDoc?.id === id) setSelectedDoc(null)
  }

  const getFileIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'PDF': return 'fa-file-pdf text-red-500'
      case 'DOCX':
      case 'DOC': return 'fa-file-word text-blue-500'
      case 'XLSX': return 'fa-file-excel text-green-500'
      case 'MD':
      case 'TXT': return 'fa-file-lines text-gray-500'
      case 'CSV': return 'fa-file-csv text-green-500'
      case 'HTML': return 'fa-file-code text-orange-500'
      default: return 'fa-file text-gray-500'
    }
  }

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500 mt-1">Manage your document knowledge base</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <i className="fa-solid fa-list text-sm"></i>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <i className="fa-solid fa-grip text-sm"></i>
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'ready', 'processing', 'error'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Document List/Grid */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Document</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Size</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Chunks</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Date</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-t border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedDoc(doc)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                        <i className={`fa-solid ${getFileIcon(doc.type)} text-lg`}></i>
                      </div>
                      <span className="text-sm font-medium text-gray-900 truncate max-w-[250px]">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded font-medium">{doc.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.size}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        doc.status === 'ready'
                          ? 'bg-green-100 text-green-700'
                          : doc.status === 'processing'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {doc.status === 'ready' ? '✓ Ready' : doc.status === 'processing' ? '⟳ Processing' : '✕ Error'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.chunks}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{doc.uploadedAt}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(doc.id)
                      }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDocs.length === 0 && (
            <div className="text-center py-12">
              <i className="fa-solid fa-folder-open text-gray-300 text-4xl mb-3"></i>
              <p className="text-gray-500">No documents found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                  <i className={`fa-solid ${getFileIcon(doc.type)} text-xl`}></i>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    doc.status === 'ready'
                      ? 'bg-green-100 text-green-700'
                      : doc.status === 'processing'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {doc.status === 'ready' ? 'Ready' : doc.status === 'processing' ? 'Processing' : 'Error'}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 text-sm truncate mb-2">{doc.name}</h4>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{doc.size}</span>
                <span>{doc.chunks} chunks</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedDoc(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Document Details</h3>
              <button
                onClick={() => setSelectedDoc(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <i className="fa-solid fa-xmark text-gray-500"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <i className={`fa-solid ${getFileIcon(selectedDoc.type)} text-2xl`}></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedDoc.name}</p>
                  <p className="text-sm text-gray-500">{selectedDoc.type} • {selectedDoc.size}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600 font-medium">Status</p>
                  <p className="text-sm font-semibold text-blue-900 mt-1 capitalize">{selectedDoc.status}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-purple-600 font-medium">Chunks</p>
                  <p className="text-sm font-semibold text-purple-900 mt-1">{selectedDoc.chunks}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-600 font-medium">Uploaded</p>
                  <p className="text-sm font-semibold text-green-900 mt-1">{selectedDoc.uploadedAt}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-xs text-amber-600 font-medium">Embedding Model</p>
                  <p className="text-sm font-semibold text-amber-900 mt-1">text-embedding-3</p>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleDelete(selectedDoc.id)}
                  className="flex-1 px-4 py-2.5 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                >
                  <i className="fa-solid fa-trash mr-2"></i>Delete
                </button>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <i className="fa-solid fa-comments mr-2"></i>Chat with Doc
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
