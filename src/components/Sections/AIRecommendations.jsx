import React from 'react'
import { Lightbulb, AlertCircle, TrendingUp } from 'lucide-react'

function AIRecommendations() {
  const recommendations = [
    {
      type: 'warning',
      icon: AlertCircle,
      title: 'High Fatigue Alert',
      message: 'Employee EMP-045 has exceeded safe work hours this week',
    },
    {
      type: 'suggestion',
      icon: Lightbulb,
      title: 'Optimization Suggestion',
      message: 'Consider redistributing weekend duties for better fairness',
    },
    {
      type: 'improvement',
      icon: TrendingUp,
      title: 'Schedule Improvement',
      message: 'AI can optimize coverage by 15% with minor adjustments',
    },
  ]

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
        <Lightbulb size={24} />
        <span>AI Recommendations</span>
      </h2>
      <div className="space-y-3">
        {recommendations.map((rec, idx) => {
          const Icon = rec.icon
          const bgColor = rec.type === 'warning' ? 'bg-red-50 dark:bg-red-900/20' : 
                         rec.type === 'suggestion' ? 'bg-blue-50 dark:bg-blue-900/20' :
                         'bg-green-50 dark:bg-green-900/20'
          const iconColor = rec.type === 'warning' ? 'text-red-600' : 
                           rec.type === 'suggestion' ? 'text-blue-600' :
                           'text-green-600'
          return (
            <div key={idx} className={`${bgColor} rounded-lg p-4 flex items-start space-x-3`}>
              <Icon size={20} className={`${iconColor} mt-0.5 flex-shrink-0`} />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{rec.title}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{rec.message}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AIRecommendations
