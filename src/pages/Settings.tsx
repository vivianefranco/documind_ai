import { useState } from 'react'

export default function Settings() {
  const [embeddingModel, setEmbeddingModel] = useState('text-embedding-3-small')
  const [chunkSize, setChunkSize] = useState('512')
  const [chunkOverlap, setChunkOverlap] = useState('50')
  const [llmModel, setLlmModel] = useState('gpt-4o')
  const [temperature, setTemperature] = useState('0.7')
  const [topK, setTopK] = useState('5')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Configure your RAG pipeline and AI parameters</p>
      </div>

      {/* Success Toast */}
      {saved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-fade-in">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-check text-green-600"></i>
          </div>
          <p className="font-medium text-green-800">Settings saved successfully!</p>
        </div>
      )}

      <div className="space-y-6 max-w-3xl">
        {/* Embedding Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-vector-square text-purple-600"></i>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Embedding Configuration</h3>
              <p className="text-sm text-gray-500">Configure how documents are vectorized</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Embedding Model</label>
              <select
                value={embeddingModel}
                onChange={(e) => setEmbeddingModel(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="text-embedding-3-small">text-embedding-3-small (1536 dims)</option>
                <option value="text-embedding-3-large">text-embedding-3-large (3072 dims)</option>
                <option value="text-embedding-ada-002">text-embedding-ada-002 (1536 dims)</option>
                <option value="bge-large-en">BGE-Large-EN (1024 dims)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Chunk Size (tokens)</label>
                <input
                  type="number"
                  value={chunkSize}
                  onChange={(e) => setChunkSize(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Chunk Overlap (%)</label>
                <input
                  type="number"
                  value={chunkOverlap}
                  onChange={(e) => setChunkOverlap(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* LLM Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-robot text-blue-600"></i>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">LLM Configuration</h3>
              <p className="text-sm text-gray-500">Configure the language model for responses</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Language Model</label>
              <select
                value={llmModel}
                onChange={(e) => setLlmModel(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-4o-mini">GPT-4o Mini</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="claude-3.5-sonnet">Claude 3.5 Sonnet</option>
                <option value="claude-3-haiku">Claude 3 Haiku</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Temperature: {temperature}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>
          </div>
        </div>

        {/* Retrieval Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-magnifying-glass text-green-600"></i>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Retrieval Configuration</h3>
              <p className="text-sm text-gray-500">Configure how documents are retrieved for context</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Top-K Results</label>
              <input
                type="number"
                value={topK}
                onChange={(e) => setTopK(e.target.value)}
                min="1"
                max="20"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Number of relevant chunks to retrieve for each query</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Similarity Search</p>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="similarity" defaultChecked className="accent-blue-600" />
                  <span className="text-sm text-gray-600">Cosine Similarity (recommended)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="similarity" className="accent-blue-600" />
                  <span className="text-sm text-gray-600">Euclidean Distance</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="similarity" className="accent-blue-600" />
                  <span className="text-sm text-gray-600">Dot Product</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* API Configuration */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-key text-amber-600"></i>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">API Configuration</h3>
              <p className="text-sm text-gray-500">Manage your API keys and endpoints</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">OpenAI API Key</label>
              <input
                type="password"
                placeholder="sk-..."
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Vector DB Endpoint</label>
              <input
                type="text"
                placeholder="https://your-vector-db.example.com"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <i className="fa-solid fa-floppy-disk mr-2"></i>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
