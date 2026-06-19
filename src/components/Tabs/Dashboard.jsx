import React, { useState, useEffect } from 'react'
import { useSchedulerStore } from '../../stores/schedulerStore'
import { Users, Activity, TrendingUp, AlertCircle, Calendar, Heart } from 'lucide-react'
import SummaryCard from '../Common/SummaryCard'
import TodayStaffing from '../Sections/TodayStaffing'
import UpcomingHolidays from '../Sections/UpcomingHolidays'
import AIRecommendations from '../Sections/AIRecommendations'

function Dashboard() {
  const { employees, schedule, leaves, requests } = useSchedulerStore()
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    maleEmployees: 0,
    femaleEmployees: 0,
    morningStaff: 0,
    eveningStaff: 0,
    nightStaff: 0,
    employeesOff: 0,
    annualLeave: 0,
    casualLeave: 0,
    sickLeave: 0,
    coverage: 0,
    fairnessScore: 0,
    averageFatigue: 0,
  })

  useEffect(() => {
    // Calculate statistics
    setStats({
      totalEmployees: employees.length,
      activeEmployees: employees.filter(e => e.active).length,
      maleEmployees: employees.filter(e => e.gender === 'Male').length,
      femaleEmployees: employees.filter(e => e.gender === 'Female').length,
      morningStaff: Math.floor(Math.random() * 15),
      eveningStaff: Math.floor(Math.random() * 15),
      nightStaff: Math.floor(Math.random() * 10),
      employeesOff: leaves.length,
      annualLeave: leaves.filter(l => l.type === 'Annual').length,
      casualLeave: leaves.filter(l => l.type === 'Casual').length,
      sickLeave: leaves.filter(l => l.type === 'Sick').length,
      coverage: Math.floor(Math.random() * 30) + 70,
      fairnessScore: Math.floor(Math.random() * 40) + 60,
      averageFatigue: Math.floor(Math.random() * 40) + 30,
    })
  }, [employees, leaves, requests])

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Welcome back! Here's your operational overview.</p>
      </div>

      {/* Summary Cards - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={Users}
          color="primary"
        />
        <SummaryCard
          title="Active Employees"
          value={stats.activeEmployees}
          icon={Activity}
          color="green"
        />
        <SummaryCard
          title="Male"
          value={stats.maleEmployees}
          icon={Users}
          color="blue"
        />
        <SummaryCard
          title="Female"
          value={stats.femaleEmployees}
          icon={Users}
          color="pink"
        />
      </div>

      {/* Summary Cards - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Morning Staff"
          value={stats.morningStaff}
          icon={Clock}
          color="yellow"
        />
        <SummaryCard
          title="Evening Staff"
          value={stats.eveningStaff}
          icon={Clock}
          color="orange"
        />
        <SummaryCard
          title="Night Staff"
          value={stats.nightStaff}
          icon={Clock}
          color="indigo"
        />
        <SummaryCard
          title="Employees OFF"
          value={stats.employeesOff}
          icon={Calendar}
          color="red"
        />
      </div>

      {/* Summary Cards - Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Annual Leave"
          value={stats.annualLeave}
          icon={Calendar}
          color="primary"
        />
        <SummaryCard
          title="Casual Leave"
          value={stats.casualLeave}
          icon={Calendar}
          color="secondary"
        />
        <SummaryCard
          title="Sick Leave"
          value={stats.sickLeave}
          icon={Heart}
          color="red"
        />
        <SummaryCard
          title="Coverage"
          value={`${stats.coverage}%`}
          icon={TrendingUp}
          color="green"
        />
      </div>

      {/* Summary Cards - Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard
          title="Fairness Score"
          value={stats.fairnessScore}
          icon={TrendingUp}
          color="primary"
        />
        <SummaryCard
          title="Average Fatigue"
          value={stats.averageFatigue}
          icon={AlertCircle}
          color="orange"
        />
        <SummaryCard
          title="AI Alerts"
          value={Math.floor(Math.random() * 5)}
          icon={AlertCircle}
          color="red"
        />
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingHolidays />
        <TodayStaffing />
      </div>

      {/* AI Recommendations */}
      <div className="mt-6">
        <AIRecommendations />
      </div>
    </div>
  )
}

export default Dashboard
