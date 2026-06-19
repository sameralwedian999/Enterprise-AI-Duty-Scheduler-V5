import React, { useState } from 'react'
import { useSchedulerStore } from '../../stores/schedulerStore'
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react'

function Requests() {
  const { requests, addRequest, updateRequest, deleteRequest, employees } = useSchedulerStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ type: 'Morning Shift', status: 'Pending' })

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const requestTypes = [
    'Morning Shift',
    'Evening Shift',
    'Night Shift',
    'Normal OFF',
    'Casual Leave',
    'Annual Leave',
  ]

  const handleAddRequest = () => {
    if (formData.employeeId) {
      addRequest(formData)
      setFormData({ type: 'Morning Shift', status: 'Pending' })
      setShowForm(false)
    }
  }

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Requests</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage shift and leave requests</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>New Request</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <select
              value={formData.employeeId || ''}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {requestTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddRequest}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Request
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 text-slate-900 dark:text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 dark:bg-slate-700 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredRequests.map(req => (
                <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{req.employeeName || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{req.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{req.date || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.status === 'Approved'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                        : req.status === 'Rejected'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm flex justify-center space-x-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                      <Edit2 size={16} className="text-primary-600" />
                    </button>
                    <button onClick={() => deleteRequest(req.id)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Requests
