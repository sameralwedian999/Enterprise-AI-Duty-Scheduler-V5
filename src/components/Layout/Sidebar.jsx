import React from 'react'
import { useAuthStore } from '../../stores/authStore'
import { LayoutDashboard, Users, FileText, Calendar, Clock, BarChart3, Settings, LogOut } from 'lucide-react'

const Sidebar = ({ activeTab, setActiveTab, onMobileClose }) => {
  const { logout } = useAuthStore()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'requests', label: 'Requests', icon: FileText },
    { id: 'leaves', label: 'Leaves', icon: Calendar },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'statistics', label: 'Statistics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 h-full flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-white text-2xl font-bold">Duty Scheduler</h1>
        <p className="text-slate-400 text-xs mt-1">Enterprise AI v5</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                onMobileClose && onMobileClose()
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
