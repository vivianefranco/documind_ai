import { Document, Page } from '../App'

interface DashboardProps {
  documents: Document[]
  onNavigate: (page: Page) => void
}

export default function Dashboard({ documents, onNavigate }: DashboardProps) {
  const readyDocs = documents.filter(d => d.status === 'ready')
  const processingDocs = documents.filter(d => d.status === 'processing')
  const totalChunks = documents.reduce((acc, d) => acc + d.chunks, 0)

  const stats = [
    {
      label: 'Total Documents',
      value: documents.length,
      icon: 'fa-solid fa-file-lines',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Ready for Query',
      value: readyDocs.length,
      icon: 'fa-solid fa-circle-check',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'Processing',
      value: processingDocs.length,
      icon: 'fa-solid fa-spinner',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      label: 'Total Chunks',
      value: totalChunks,
      icon: 'fa-solid fa-puzzle-piece',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ]

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your document intelligence system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <i className={`${stat.icon} ${stat.textColor} text-lg`}></i>
              </div>
              <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('upload')}
              className="w-full flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <i className="fa-solid fa-cloud-arrow-up text-blue-600"></i>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Upload Documents</p>
                <p className="text-sm text-gray-500">Add new files for AI processing</p>
              </div>
              <i className="fa-solid fa-chevron-right text-gray-400 ml-auto"></i>
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="w-full flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition-all group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <i className="fa-solid fa-comments text-green-600"></i>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Start AI Chat</p>
                <p className="text-sm text-gray-500">Ask questions about your documents</p>
              </div>
              <i className="fa-solid fa-chevron-right text-gray-400 ml-auto"></i>
            </button>
            <button
              onClick={() => onNavigate('documents')}
              className="w-full flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <i className="fa-solid fa-folder-open text-purple-600"></i>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Manage Documents</p>
                <p className="text-sm text-gray-500">View and organize your library</p>
              </div>
              <i className="fa-solid fa-chevron-right text-gray-400 ml-auto"></i>
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Embedding Engine</span>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Vector Database</span>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">LLM Service</span>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Document Processor</span>
              </div>
              <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                {processingDocs.length > 0 ? 'Busy' : 'Idle'}
              </span>
            </div>
          </div>

          {/* RAG Pipeline Visualization */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">RAG Pipeline</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-1">
                  <i className="fa-solid fa-file-import text-blue-600 text-sm"></i>
                </div>
                <span className="text-[10px] text-gray-500">Ingest</span>
              </div>
              <i className="fa-solid fa-arrow-right text-gray-300"></i>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-1">
                  <i className="fa-solid fa-scissors text-purple-600 text-sm"></i>
                </div>
                <span className="text-[10px] text-gray-500">Chunk</span>
              </div>
              <i className="fa-solid fa-arrow-right text-gray-300"></i>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-1">
                  <i className="fa-solid fa-vector-square text-green-600 text-sm"></i>
                </div>
                <span className="text-[10px] text-gray-500">Embed</span>
              </div>
              <i className="fa-solid fa-arrow-right text-gray-300"></i>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-1">
                  <i className="fa-solid fa-database text-amber-600 text-sm"></i>
                </div>
                <span className="text-[10px] text-gray-500">Store</span>
              </div>
              <i className="fa-solid fa-arrow-right text-gray-300"></i>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center mb-1">
                  <i className="fa-solid fa-robot text-rose-600 text-sm"></i>
                </div>
                <span className="text-[10px] text-gray-500">Query</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
          <button
            onClick={() => onNavigate('documents')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3">Name</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3">Type</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3">Size</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3">Chunks</th>
              </tr>
            </thead>
            <tbody>
              {documents.slice(0, 5).map((doc) => (
                <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-file text-gray-500 text-sm"></i>
                      </div>
                      <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded font-medium">{doc.type}</span>
                  </td>
                  <td className="py-3 text-sm text-gray-600">{doc.size}</td>
                  <td className="py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
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
                  <td className="py-3 text-sm text-gray-600">{doc.chunks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
