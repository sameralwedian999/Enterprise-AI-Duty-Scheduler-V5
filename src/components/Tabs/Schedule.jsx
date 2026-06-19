import React, { useState } from 'react'
import { useSchedulerStore } from '../../stores/schedulerStore'
import { Calendar, Download, Settings as SettingsIcon, Play } from 'lucide-react'

function Schedule() {
  const { schedule, generateSchedule, selectedPeriod } = useSchedulerStore()
  const [scheduleMethod, setScheduleMethod] = useState('month')
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleGenerateByMonth = () => {
    const monthStart = new Date(year, month, 1)
    const monthEnd = new Date(year, month + 1, 0)
    generateSchedule(monthStart, monthEnd)
  }

  const handleGenerateByDateRange = () => {
    if (startDate && endDate) {
      generateSchedule(new Date(startDate), new Date(endDate))
    }
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i)

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Schedule Generation</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Generate and manage duty schedules</p>
      </div>

      {/* Generation Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Method 1: By Month */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <input
              type="radio"
              id="month"
              name="method"
              value="month"
              checked={scheduleMethod === 'month'}
              onChange={(e) => setScheduleMethod(e.target.value)}
              className="w-4 h-4"
            />
            <label htmlFor="month" className="text-lg font-semibold text-slate-900 dark:text-white">
              Generate by Month
            </label>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <select
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value))}
                disabled={scheduleMethod !== 'month'}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white disabled:opacity-50"
              >
                {months.map((m, i) => (
                  <option key={i} value={i}>{m}</option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                disabled={scheduleMethod !== 'month'}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white disabled:opacity-50"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleGenerateByMonth}
              disabled={scheduleMethod !== 'month'}
              className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Play size={20} />
              <span>Generate Schedule</span>
            </button>
          </div>
        </div>

        {/* Method 2: By Date Range */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <input
              type="radio"
              id="range"
              name="method"
              value="range"
              checked={scheduleMethod === 'range'}
              onChange={(e) => setScheduleMethod(e.target.value)}
              className="w-4 h-4"
            />
            <label htmlFor="range" className="text-lg font-semibold text-slate-900 dark:text-white">
              Generate by Date Range
            </label>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={scheduleMethod !== 'range'}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white disabled:opacity-50"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={scheduleMethod !== 'range'}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white disabled:opacity-50"
              />
            </div>
            <button
              onClick={handleGenerateByDateRange}
              disabled={scheduleMethod !== 'range' || !startDate || !endDate}
              className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Play size={20} />
              <span>Generate Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Display */}
      {schedule.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {selectedPeriod ? `Schedule: ${new Date(selectedPeriod.startDate).toLocaleDateString()} - ${new Date(selectedPeriod.endDate).toLocaleDateString()}` : 'Generated Schedule'}
            </h2>
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Download size={20} />
              <span>Export to Excel</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 dark:bg-slate-700 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Morning</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Evening</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Night</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {schedule.slice(0, 10).map((day, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      {new Date(day.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">—</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">—</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Schedule
