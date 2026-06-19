import React, { useState, useEffect } from 'react'
import { useSchedulerStore } from '../../stores/schedulerStore'

function EmployeeForm({ onClose, editingId }) {
  const { employees, addEmployee, updateEmployee } = useSchedulerStore()
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    gender: 'Male',
    active: true,
    preferredRotation: 'Normal',
    defaultOFFPolicy: 'Standard',
    notes: '',
  })

  useEffect(() => {
    if (editingId) {
      const employee = employees.find(e => e.id === editingId)
      if (employee) {
        setFormData(employee)
      }
    }
  }, [editingId, employees])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      updateEmployee(editingId, formData)
    } else {
      addEmployee(formData)
    }
    onClose()
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        {editingId ? 'Edit Employee' : 'Add New Employee'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Employee ID</label>
          <input
            type="text"
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            placeholder="e.g., EMP001"
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
          <select
            value={formData.active ? 'active' : 'inactive'}
            onChange={(e) => setFormData({ ...formData, active: e.target.value === 'active' })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Preferred Rotation</label>
          <select
            value={formData.preferredRotation}
            onChange={(e) => setFormData({ ...formData, preferredRotation: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="Normal">Normal</option>
            <option value="5 Work Days → 2 OFF">5 Work Days → 2 OFF</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any notes"
            rows="3"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            {editingId ? 'Update Employee' : 'Add Employee'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 text-slate-900 dark:text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EmployeeForm
