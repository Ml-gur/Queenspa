import React, { useState, useEffect } from 'react'
import { ArrowLeft, Calendar } from 'lucide-react'
import { StaffSidebar } from './staff-portal/StaffSidebar'
import { AppointmentCard } from './staff-portal/AppointmentCard'
import { formatDateForDisplay } from './staff-portal/constants'
import { projectId, publicAnonKey } from '../utils/supabase/info'

interface Appointment {
  id: string
  customerName: string
  customerPhone: string
  date: string
  startTime: string
  endTime: string
  status: string
  service: {
    name: string
    price: number
  }
  staff: {
    name: string
  }
}

interface StaffMember {
  id: string
  name: string
  role: string
}

interface StaffPortalProps {
  onBack: () => void
}

export function StaffPortal({ onBack }: StaffPortalProps) {
  const [selectedStaff, setSelectedStaff] = useState<string>('')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const [staff, setStaff] = useState<StaffMember[]>([])

  useEffect(() => {
    fetchStaff()
  }, [])

  useEffect(() => {
    if (selectedStaff && selectedDate) {
      fetchAppointments()
    }
  }, [selectedStaff, selectedDate])

  const fetchStaff = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e43aaacd/api/staff`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setStaff(data)
        if (data.length > 0) {
          setSelectedStaff(data[0].id)
        }
      }
    } catch (error) {
      console.error('Error fetching staff:', error)
    }
  }

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e43aaacd/api/appointments?date=${selectedDate}&staffId=${selectedStaff}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setAppointments(data.sort((a: Appointment, b: Appointment) => a.startTime.localeCompare(b.startTime)))
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCurrentStaffName = () => {
    const currentStaff = staff.find(s => s.id === selectedStaff)
    return currentStaff ? currentStaff.name : 'Staff Member'
  }

  const getDayStats = () => {
    const total = appointments.length
    const confirmed = appointments.filter(apt => apt.status === 'confirmed').length
    const completed = appointments.filter(apt => apt.status === 'completed').length
    const revenue = appointments
      .filter(apt => apt.status === 'completed')
      .reduce((sum, apt) => sum + (apt.service?.price || 0), 0)

    return { total, confirmed, completed, revenue }
  }

  const dayStats = getDayStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Staff Portal</h1>
              <p className="text-gray-600">Welcome, {getCurrentStaffName()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <StaffSidebar
              staff={staff}
              selectedStaff={selectedStaff}
              selectedDate={selectedDate}
              dayStats={dayStats}
              loading={loading}
              onStaffChange={setSelectedStaff}
              onDateChange={setSelectedDate}
              onRefresh={fetchAppointments}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm">
              {/* Appointments Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Appointments for {formatDateForDisplay(selectedDate)}
                  </h2>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span>{appointments.length} appointments</span>
                  </div>
                </div>
              </div>

              {/* Appointments List */}
              <div className="p-6">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading appointments...</p>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments today</h3>
                    <p className="text-gray-600">Enjoy your free time or check another date!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <AppointmentCard 
                        key={appointment.id} 
                        appointment={appointment} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}