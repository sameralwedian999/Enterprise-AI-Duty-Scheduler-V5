import React, { useState } from 'react'
import { useSchedulerStore } from '../../stores/schedulerStore'
import { useAuthStore } from '../../stores/authStore'
import { Settings as SettingsIcon, Lock, Save } from 'lucide-react'

function Settings() {
  const { settings, updateSettings } = useSchedulerStore()
  const { updateCredentials } = useAuthStore()
  const [formData, setFormData] = useState(settings)
  const [changePassword, setChangePassword] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSaveSettings = () => {
    updateSettings(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleChangeCredentials = () => {
    if (newUsername && newPassword === confirmPassword) {
      updateCredentials(newUsername, newPassword)
      setChangePassword(false)
      setNewUsername('')
      setNewPassword('')
      setConfirmPassword('')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Configure your application</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-600 dark:text-green-400 font-medium">Settings saved successfully!</p>
        </div>
      )}

      {/* Shift Configuration */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Shift Configuration</h2>
        
        <div className="space-y-6">
          {/* Morning */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Morning Shift</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300 mb-1">Male Employees</label>
                <input
                  type="number"
                  value={formData.morning?.male || 0}
                  onChange={(e) => setFormData({ ...formData, morning: { ...formData.morning, male: parseInt(e.target.value) } })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300 mb-1">Female Employees</label>
                <input
                  type="number"
                  value={formData.morning?.female || 0}
                  onChange={(e) => setFormData({ ...formData, morning: { ...formData.morning, female: parseInt(e.target.value) } })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Evening */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Evening Shift</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300 mb-1">Male Employees</label>
                <input
                  type="number"
                  value={formData.evening?.male || 0}
                  onChange={(e) => setFormData({ ...formData, evening: { ...formData.evening, male: parseInt(e.target.value) } })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300 mb-1">Female Employees</label>
                <input
                  type="number"
                  value={formData.evening?.female || 0}
                  onChange={(e) => setFormData({ ...formData, evening: { ...formData.evening, female: parseInt(e.target.value) } })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Night */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Night Shift</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300 mb-1">Male Employees</label>
                <input
                  type="number"
                  value={formData.night?.male || 0}
                  onChange={(e) => setFormData({ ...formData, night: { ...formData.night, male: parseInt(e.target.value) } })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300 mb-1">Female Employees</label>
                <input
                  type="number"
                  value={formData.night?.female || 0}
                  onChange={(e) => setFormData({ ...formData, night: { ...formData.night, female: parseInt(e.target.value) } })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">AI Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">AI Optimization Level</label>
            <select
              value={formData.aiLevel}
              onChange={(e) => setFormData({ ...formData, aiLevel: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="normal">Normal</option>
              <option value="strong">Strong</option>
              <option value="enterprise">Enterprise AI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Fatigue Limit (%)</label>
            <input
              type="number"
              value={formData.fatigueLimit}
              onChange={(e) => setFormData({ ...formData, fatigueLimit: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
          <Lock size={24} />
          <span>Security</span>
        </h2>
        {!changePassword ? (
          <button
            onClick={() => setChangePassword(true)}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Change Credentials
          </button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New Username</label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleChangeCredentials}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Update
              </button>
              <button
                onClick={() => setChangePassword(false)}
                className="flex-1 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 text-slate-900 dark:text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Developer Info */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-slate-700 dark:to-slate-800 rounded-lg p-6 border border-primary-200 dark:border-slate-600">
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          <span className="font-semibold">Developed by:</span> Samer Seif Alwedian
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-xs mt-2">Enterprise AI Duty Scheduler V5 - Hospital Healthcare Management</p>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
        >
          <Save size={20} />
          <span>Save All Settings</span>
        </button>
      </div>
    </div>
  )
}

export default Settings
