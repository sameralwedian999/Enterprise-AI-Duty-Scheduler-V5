import React from 'react'
import { useSchedulerStore } from '../../stores/schedulerStore'
import { BarChart3, PieChart } from 'lucide-react'

function Statistics() {
  const { employees, schedule } = useSchedulerStore()

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Statistics</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">View detailed scheduling analytics</p>
      </div>

      {/* Daily Statistics */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
          <BarChart3 size={24} />
          <span>Daily Statistics</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <p className="text-slate-600 dark:text-slate-400 text-sm">Morning Shift</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">—</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <p className="text-slate-600 dark:text-slate-400 text-sm">Evening Shift</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">—</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <p className="text-slate-600 dark:text-slate-400 text-sm">Night Shift</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">—</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <p className="text-slate-600 dark:text-slate-400 text-sm">OFF Days</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">—</p>
          </div>
        </div>
      </div>

      {/* Employee Statistics */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
          <PieChart size={24} />
          <span>Employee Statistics</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-slate-700 dark:text-slate-300">Employee</th>
                <th className="px-4 py-3 text-left text-slate-700 dark:text-slate-300">Morning</th>
                <th className="px-4 py-3 text-left text-slate-700 dark:text-slate-300">Evening</th>
                <th className="px-4 py-3 text-left text-slate-700 dark:text-slate-300">Night</th>
                <th className="px-4 py-3 text-left text-slate-700 dark:text-slate-300">Fatigue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {employees.slice(0, 5).map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="px-4 py-3 text-slate-900 dark:text-white font-medium">{emp.name}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">—</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">—</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">—</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">Low</span>
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

export default Statistics
