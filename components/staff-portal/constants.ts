export const STAFF_PORTAL_CONSTANTS = {
  REFRESH_INTERVAL: 30000, // 30 seconds
  DATE_RANGE_DAYS: 7,
  APPOINTMENT_STATUSES: {
    CONFIRMED: 'confirmed',
    PENDING: 'pending',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed'
  },
  STATUS_COLORS: {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800'
  }
}

export const getDateRange = () => {
  const dates = []
  for (let i = -1; i <= STAFF_PORTAL_CONSTANTS.DATE_RANGE_DAYS; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    dates.push({
      value: date.toISOString().split('T')[0],
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    })
  }
  return dates
}

export const formatDateForDisplay = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}