import { Page } from '../App'

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  isOpen: boolean
  onToggle: () => void
}

const navItems: { page: Page; icon: string; label: string }[] = [
  { page: 'dashboard', icon: 'fa-solid fa-chart-line', label: 'Dashboard' },
  { page: 'upload', icon: 'fa-solid fa-cloud-arrow-up', label: 'Upload' },
  { page: 'chat', icon: 'fa-solid fa-comments', label: 'AI Chat' },
  { page: 'documents', icon: 'fa-solid fa-folder-open', label: 'Documents' },
  { page: 'settings', icon: 'fa-solid fa-gear', label: 'Settings' },
]

export default function Sidebar({ currentPage, onNavigate, isOpen, onToggle }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 z-50 flex flex-col ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {isOpen && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-brain text-white text-sm"></i>
            </div>
            <span className="font-bold text-lg tracking-tight">DocuMind</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-700 transition-colors"
        >
          <i className={`fa-solid ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'} text-sm`}></i>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              currentPage === item.page
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
          >
            <i className={`${item.icon} w-5 text-center`}></i>
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom section */}
      {isOpen && (
        <div className="p-4 border-t border-slate-700 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-user text-white text-xs"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">User</p>
              <p className="text-xs text-slate-400">Pro Plan</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
