import React from 'react'
import { Clock, Users } from 'lucide-react'

function TodayStaffing() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
        <Clock size={24} />
        <span>Today's Staffing</span>
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-slate-700 dark:text-slate-300 font-medium">Morning Shift</span>
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">8</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-slate-700 dark:text-slate-300 font-medium">Evening Shift</span>
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">8</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
            <span className="text-slate-700 dark:text-slate-300 font-medium">Night Shift</span>
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">4</span>
        </div>
      </div>
    </div>
  )
}

export default TodayStaffing
