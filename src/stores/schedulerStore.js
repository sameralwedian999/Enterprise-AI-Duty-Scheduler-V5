import { create } from 'zustand'

const useSchedulerStore = create((set, get) => ({
  employees: [],
  requests: [],
  leaves: [],
  schedule: [],
  settings: {
    morning: { male: 5, female: 5 },
    evening: { male: 5, female: 5 },
    night: { male: 3, female: 3 },
    shiftDurations: {
      morning: { start: '06:00', end: '14:00' },
      evening: { start: '14:00', end: '22:00' },
      night: { start: '22:00', end: '06:00' },
    },
    consecutiveShifts: {
      morning: 3,
      evening: 3,
      night: 3,
    },
    doubleOffDays: 14,
    nightRecovery: 'evening',
    ramadanMode: false,
    aiLevel: 'normal',
    fatigueLimit: 80,
  },
  statistics: null,
  selectedPeriod: null,

  addEmployee: (employee) => set((state) => ({
    employees: [...state.employees, { ...employee, id: Date.now() }],
  })),

  updateEmployee: (id, data) => set((state) => ({
    employees: state.employees.map((e) => e.id === id ? { ...e, ...data } : e),
  })),

  deleteEmployee: (id) => set((state) => ({
    employees: state.employees.filter((e) => e.id !== id),
  })),

  addRequest: (request) => set((state) => ({
    requests: [...state.requests, { ...request, id: Date.now() }],
  })),

  updateRequest: (id, data) => set((state) => ({
    requests: state.requests.map((r) => r.id === id ? { ...r, ...data } : r),
  })),

  deleteRequest: (id) => set((state) => ({
    requests: state.requests.filter((r) => r.id !== id),
  })),

  addLeave: (leave) => set((state) => ({
    leaves: [...state.leaves, { ...leave, id: Date.now() }],
  })),

  updateLeave: (id, data) => set((state) => ({
    leaves: state.leaves.map((l) => l.id === id ? { ...l, ...data } : l),
  })),

  deleteLeave: (id) => set((state) => ({
    leaves: state.leaves.filter((l) => l.id !== id),
  })),

  generateSchedule: (startDate, endDate) => {
    const schedule = []
    const current = new Date(startDate)
    while (current <= new Date(endDate)) {
      schedule.push({
        date: new Date(current),
        morning: [],
        evening: [],
        night: [],
      })
      current.setDate(current.getDate() + 1)
    }
    set({ schedule, selectedPeriod: { startDate, endDate } })
  },

  updateSettings: (settings) => set((state) => ({
    settings: { ...state.settings, ...settings },
  })),
}))

export { useSchedulerStore }
