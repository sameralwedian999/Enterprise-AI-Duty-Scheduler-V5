import React from 'react'
import { Calendar } from 'lucide-react'

function UpcomingHolidays() {
  const holidays = [
    { name: 'Eid Al Fitr', date: 'April 10' },
    { name: 'Qatar National Day', date: 'December 18' },
    { name: 'Eid Al Adha', date: 'June 16' },
  ]

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
        <Calendar size={24} />
        <span>Upcoming Qatar Public Holidays</span>
      </h2>
      <div className="space-y-3">
        {holidays.map((holiday, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <span className="text-slate-700 dark:text-slate-300 font-medium">{holiday.name}</span>
            <span className="text-sm text-slate-600 dark:text-slate-400">{holiday.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingHolidays
