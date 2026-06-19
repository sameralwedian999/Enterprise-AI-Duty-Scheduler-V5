import React, { useState } from 'react'
import { useSchedulerStore } from '../../stores/schedulerStore'
import { Plus, Edit2, Trash2, Search, Calendar } from 'lucide-react'

function Leaves() {
  const { leaves, addLeave, updateLeave, deleteLeave, employees } = useSchedulerStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ type: 'Annual Leave' })

  const filteredLeaves = leaves.filter(leave => {
    const matchesSearch = leave.employeeName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || leave.type === typeFilter
    return matchesSearch && matchesType
  })

  const leaveTypes = ['Annual Leave', 'Casual Leave', 'Sick Leave']

  const handleAddLeave = () => {
    if (formData.employeeId && formData.startDate && formData.endDate) {
      addLeave(formData)
      setFormData({ type: 'Annual Leave' })
      setShowForm(false)
    }
  }

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Leave Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage employee leaves</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>New Leave</span>
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
              {leaveTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              type="date"
              value={formData.startDate || ''}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="date"
              value={formData.endDate || ''}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddLeave}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Leave
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
            placeholder="Search by employee name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Leave Types</option>
          {leaveTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 dark:bg-slate-700 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Leave Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Days</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredLeaves.map(leave => (
                <tr key={leave.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{leave.employeeName || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{leave.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{leave.startDate || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{leave.endDate || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">—</td>
                  <td className="px-6 py-4 text-sm flex justify-center space-x-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                      <Edit2 size={16} className="text-primary-600" />
                    </button>
                    <button onClick={() => deleteLeave(leave.id)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
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

export default Leaves
