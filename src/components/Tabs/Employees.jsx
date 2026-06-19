import React, { useState } from 'react'
import { useSchedulerStore } from '../../stores/schedulerStore'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import EmployeeForm from '../Sections/EmployeeForm'

function Employees() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useSchedulerStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('all')

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || (filter === 'active' && emp.active) || (filter === 'inactive' && !emp.active)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Employees</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your workforce</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null)
            setShowForm(true)
          }}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Employees</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <EmployeeForm
              onClose={() => setShowForm(false)}
              editingId={editingId}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 dark:bg-slate-700 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Rotation</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{emp.employeeId}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">{emp.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{emp.gender}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      emp.active
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                    }`}>
                      {emp.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{emp.preferredRotation || 'Normal'}</td>
                  <td className="px-6 py-4 text-sm flex justify-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(emp.id)
                        setShowForm(true)
                      }}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                    >
                      <Edit2 size={16} className="text-primary-600" />
                    </button>
                    <button
                      onClick={() => deleteEmployee(emp.id)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">No employees found</p>
        </div>
      )}
    </div>
  )
}

export default Employees
