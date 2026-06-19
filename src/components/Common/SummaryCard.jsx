import React from 'react'
import { motion } from 'framer-motion'

function SummaryCard({ title, value, icon: Icon, color = 'primary' }) {
  const colorClasses = {
    primary: 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    pink: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
    secondary: 'bg-secondary-50 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  )
}

export default SummaryCard
