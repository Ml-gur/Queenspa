import React, { useState } from 'react'
import { 
  ArrowLeft, 
  Settings, 
  Users, 
  Calendar, 
  Image, 
  DollarSign, 
  BarChart3, 
  Edit3, 
  Plus, 
  Trash2, 
  Save,
  Eye,
  Star,
  Phone,
  Mail,
  MapPin,
  Gift,
  Clock,
  CheckCircle
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface OwnerPortalProps {
  onBack: () => void
}

export function OwnerPortal({ onBack }: OwnerPortalProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [editingService, setEditingService] = useState<number | null>(null)
  const [editingStaff, setEditingStaff] = useState<number | null>(null)
  const [showAddService, setShowAddService] = useState(false)
  const [showAddStaff, setShowAddStaff] = useState(false)

  // Updated services to match current website
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Haircut & Styling',
      price: 1500,
      duration: '60-90 minutes',
      description: 'Professional cuts and elegant styling',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753685235/natural_n5fsbo.jpg',
      active: true
    },
    {
      id: 2,
      name: 'Hair Braiding & Extensions',
      price: 2500,
      duration: '2-4 hours',
      description: 'Beautiful traditional and modern braiding',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753685236/braiding_y39r45.jpg',
      active: true
    },
    {
      id: 3,
      name: 'Hair Treatment & Care',
      price: 2000,
      duration: '90-120 minutes',
      description: 'Deep conditioning and scalp therapy',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753685235/treatment_wnk1wm.jpg',
      active: true
    },
    {
      id: 4,
      name: 'Hair Relaxing',
      price: 3500,
      duration: '2-3 hours',
      description: 'Smooth, manageable hair transformation',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      active: true
    },
    {
      id: 5,
      name: 'Wig Installation & Styling',
      price: 3000,
      duration: '90-150 minutes',
      description: 'Professional wig fitting and styling',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753685236/wigin_pokrio.jpg',
      active: true
    },
    {
      id: 6,
      name: 'Nail Care Services',
      price: 1200,
      duration: '45-75 minutes',
      description: 'Complete manicure and pedicure treatments',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753683879/manicure_fxjdnw.jpg',
      active: true
    }
  ])

  // Updated team members to match current website
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Catherine',
      role: 'Owner & Master Stylist',
      email: 'catherine@vipqueenssalon.com',
      phone: '0718779129',
      specialties: ['Hair Relaxing', 'Color Treatments', 'Salon Management'],
      experience: '8+ years',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753687019/Catherine_m6vvoq.jpg',
      active: true,
      salary: 0, // Owner doesn't have salary
      bio: 'Catherine is the visionary behind VIP Queens Salon. With over 8 years of experience, she specializes in advanced hair treatments and business leadership.'
    },
    {
      id: 2,
      name: 'Njeri',
      role: 'Senior Hair Stylist',
      email: 'njeri@vipqueenssalon.com',
      phone: '0712345678',
      specialties: ['Braiding', 'Natural Hair Care', 'Protective Styles'],
      experience: '5+ years',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753687020/njeri_momehb.jpg',
      active: true,
      salary: 35000,
      bio: 'Njeri is our braiding specialist who creates stunning protective styles. Her expertise in natural hair care makes her a client favorite.'
    },
    {
      id: 3,
      name: 'Ann',
      role: 'Hair Stylist & Nail Technician',
      email: 'ann@vipqueenssalon.com',
      phone: '0723456789',
      specialties: ['Nail Art', 'Hair Styling', 'Manicures & Pedicures'],
      experience: '4+ years',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753687496/Ann_gatgo6.jpg',
      active: true,
      salary: 30000,
      bio: 'Ann brings creativity to both hair and nail services. Her artistic touch and attention to detail ensure every client leaves feeling beautiful.'
    },
    {
      id: 4,
      name: 'Rachael',
      role: 'Junior Stylist & Receptionist',
      email: 'rachael@vipqueenssalon.com',
      phone: '0734567890',
      specialties: ['Customer Service', 'Basic Styling', 'Consultation'],
      experience: '2+ years',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753687504/Rachael_rkzce3.jpg',
      active: true,
      salary: 25000,
      bio: 'Rachael is our friendly face who ensures every client feels welcomed. She\'s also developing her styling skills under our senior team.'
    }
  ])

  const [promotions, setPromotions] = useState([
    {
      id: 1,
      title: 'Ultimate Braiding Package',
      discount: 50,
      originalPrice: 5000,
      newPrice: 2500,
      description: 'Complete braiding service with premium extensions, scalp treatment, and styling consultation.',
      validUntil: '2024-02-28',
      active: true
    },
    {
      id: 2,
      title: 'Complete Nail Makeover',
      discount: 40,
      originalPrice: 3000,
      newPrice: 1800,
      description: 'Manicure, pedicure, nail art, and cuticle care - everything for beautiful nails.',
      validUntil: '2024-02-15',
      active: true
    },
    {
      id: 3,
      title: 'Deep Hair Treatment',
      discount: 35,
      originalPrice: 3200,
      newPrice: 2100,
      description: 'Intensive conditioning, protein treatment, and scalp therapy for healthy hair.',
      validUntil: '2024-02-20',
      active: true
    },
    {
      id: 4,
      title: 'New Client Package',
      discount: 30,
      originalPrice: 0,
      newPrice: 0,
      description: 'Free consultation + 30% off any service for first-time VIP Queens clients.',
      validUntil: '2024-12-31',
      active: true
    }
  ])

  const [bookings] = useState([
    {
      id: 1,
      clientName: 'Aisha Kamau',
      clientPhone: '0722123456',
      service: 'Hair Braiding & Extensions',
      stylist: 'Njeri',
      date: '2024-01-25',
      time: '10:00 AM',
      status: 'confirmed',
      price: 2500
    },
    {
      id: 2,
      clientName: 'Grace Wanjiku',
      clientPhone: '0733987654',
      service: 'Nail Care Services',
      stylist: 'Ann',
      date: '2024-01-25',
      time: '2:00 PM',
      status: 'pending',
      price: 1200
    },
    {
      id: 3,
      clientName: 'Mary Njeri',
      clientPhone: '0744568901',
      service: 'Hair Treatment & Care',
      stylist: 'Catherine',
      date: '2024-01-26',
      time: '11:00 AM',
      status: 'confirmed',
      price: 2000
    }
  ])

  const deleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id))
  }

  const deleteStaff = (id: number) => {
    setStaff(staff.filter(member => member.id !== id))
  }

  const deletePromotion = (id: number) => {
    setPromotions(promotions.filter(promo => promo.id !== id))
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Settings className="w-4 h-4" /> },
    { id: 'staff', label: 'Staff Management', icon: <Users className="w-4 h-4" /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
    { id: 'promotions', label: 'Promotions', icon: <Gift className="w-4 h-4" /> },
    { id: 'gallery', label: 'Gallery', icon: <Image className="w-4 h-4" /> }
  ]

  return (
    <div className="min-h-screen bg-pearl-gradient">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container-mobile py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 font-script">VIP Queens Salon</h1>
                <p className="text-sm text-gray-600 font-inter">Owner Dashboard</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-600 font-inter">Welcome back, Catherine</p>
              <p className="text-xs text-gray-500 font-inter">Owner & Master Stylist</p>
              <p className="text-xs text-gray-500 font-inter">Ronald Ngala Street, RNG Plaza</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-mobile py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 font-inter ${
                      activeTab === tab.id
                        ? 'bg-pearl-rose-dark text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 font-inter">Business Overview</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-pearl-rose-gradient rounded-xl p-6 text-white">
                      <DollarSign className="w-8 h-8 mb-3" />
                      <div className="text-2xl font-bold font-inter">KES 145,000</div>
                      <div className="text-sm opacity-90 font-inter">Monthly Revenue</div>
                    </div>
                    
                    <div className="bg-champagne-gradient rounded-xl p-6 text-white">
                      <Users className="w-8 h-8 mb-3" />
                      <div className="text-2xl font-bold font-inter">92</div>
                      <div className="text-sm opacity-90 font-inter">Clients This Month</div>
                    </div>
                    
                    <div className="bg-rose-gold-gradient rounded-xl p-6 text-white">
                      <Star className="w-8 h-8 mb-3" />
                      <div className="text-2xl font-bold font-inter">4.9</div>
                      <div className="text-sm opacity-90 font-inter">Average Rating</div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                      <CheckCircle className="w-8 h-8 mb-3" />
                      <div className="text-2xl font-bold font-inter">4</div>
                      <div className="text-sm opacity-90 font-inter">Active Staff</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 font-inter">Recent Bookings</h3>
                  <div className="space-y-3">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <div className="font-medium text-gray-800 font-inter">{booking.clientName}</div>
                          <div className="text-sm text-gray-600 font-inter">{booking.service} - {booking.date} at {booking.time}</div>
                          <div className="text-sm text-gray-500 font-inter">Stylist: {booking.stylist}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-pearl-rose-dark font-inter">KES {booking.price.toLocaleString()}</div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium font-inter ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 font-inter">Top Services</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-inter">Hair Braiding</span>
                        <span className="font-semibold text-pearl-rose-dark font-inter">45%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-inter">Hair Treatment</span>
                        <span className="font-semibold text-champagne-silk-dark font-inter">25%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-inter">Nail Care</span>
                        <span className="font-semibold text-rose-gold-dark font-inter">20%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 font-inter">Staff Performance</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-inter">Catherine</span>
                        <span className="font-semibold text-pearl-rose-dark font-inter">35 clients</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-inter">Njeri</span>
                        <span className="font-semibold text-champagne-silk-dark font-inter">28 clients</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-inter">Ann</span>
                        <span className="font-semibold text-rose-gold-dark font-inter">20 clients</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Services Tab - Same as before but with updated data */}
            {activeTab === 'services' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 font-inter">Service Management</h2>
                  <button
                    onClick={() => setShowAddService(true)}
                    className="bg-pearl-rose-dark text-white px-4 py-2 rounded-xl hover:bg-pearl-rose-dark/90 transition-colors flex items-center space-x-2 font-inter"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  {services.map((service) => (
                    <div key={service.id} className="border border-gray-200 rounded-xl p-6">
                      {editingService === service.id ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            defaultValue={service.name}
                            className="w-full p-3 border border-gray-300 rounded-lg font-inter"
                            placeholder="Service Name"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="number"
                              defaultValue={service.price}
                              className="p-3 border border-gray-300 rounded-lg font-inter"
                              placeholder="Price (KES)"
                            />
                            <input
                              type="text"
                              defaultValue={service.duration}
                              className="p-3 border border-gray-300 rounded-lg font-inter"
                              placeholder="Duration"
                            />
                          </div>
                          <textarea
                            defaultValue={service.description}
                            className="w-full p-3 border border-gray-300 rounded-lg font-inter"
                            rows={3}
                            placeholder="Service Description"
                          />
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => setEditingService(null)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 font-inter"
                            >
                              <Save className="w-4 h-4" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => setEditingService(null)}
                              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-inter"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <ImageWithFallback
                              src={service.image}
                              alt={service.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-bold text-gray-800 font-inter">{service.name}</h3>
                              <p className="text-gray-600 text-sm font-inter">{service.description}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-pearl-rose-dark font-semibold font-inter">KES {service.price.toLocaleString()}</span>
                                <span className="text-gray-500 text-sm font-inter">{service.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingService(service.id)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteService(service.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Staff Management Tab with updated team */}
            {activeTab === 'staff' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 font-inter">Staff Management</h2>
                  <button
                    onClick={() => setShowAddStaff(true)}
                    className="bg-pearl-rose-dark text-white px-4 py-2 rounded-xl hover:bg-pearl-rose-dark/90 transition-colors flex items-center space-x-2 font-inter"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Staff</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  {staff.map((member) => (
                    <div key={member.id} className="border border-gray-200 rounded-xl p-6">
                      {editingStaff === member.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              defaultValue={member.name}
                              className="p-3 border border-gray-300 rounded-lg font-inter"
                              placeholder="Full Name"
                            />
                            <input
                              type="text"
                              defaultValue={member.role}
                              className="p-3 border border-gray-300 rounded-lg font-inter"
                              placeholder="Role/Position"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="email"
                              defaultValue={member.email}
                              className="p-3 border border-gray-300 rounded-lg font-inter"
                              placeholder="Email"
                            />
                            <input
                              type="tel"
                              defaultValue={member.phone}
                              className="p-3 border border-gray-300 rounded-lg font-inter"
                              placeholder="Phone"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              defaultValue={member.experience}
                              className="p-3 border border-gray-300 rounded-lg font-inter"
                              placeholder="Experience"
                            />
                            <input
                              type="number"
                              defaultValue={member.salary}
                              className="p-3 border border-gray-300 rounded-lg font-inter"
                              placeholder="Monthly Salary (KES)"
                            />
                          </div>
                          <input
                            type="url"
                            defaultValue={member.image}
                            className="w-full p-3 border border-gray-300 rounded-lg font-inter"
                            placeholder="Profile Image URL"
                          />
                          <textarea
                            defaultValue={member.bio}
                            className="w-full p-3 border border-gray-300 rounded-lg font-inter"
                            rows={3}
                            placeholder="Bio/Description"
                          />
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => setEditingStaff(null)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 font-inter"
                            >
                              <Save className="w-4 h-4" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => setEditingStaff(null)}
                              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-inter"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <ImageWithFallback
                              src={member.image}
                              alt={member.name}
                              className="w-16 h-16 object-cover rounded-full"
                            />
                            <div>
                              <h3 className="font-bold text-gray-800 font-inter">{member.name}</h3>
                              <p className="text-pearl-rose-dark font-medium font-inter">{member.role}</p>
                              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                                <span className="flex items-center space-x-1 font-inter">
                                  <Mail className="w-3 h-3" />
                                  <span>{member.email}</span>
                                </span>
                                <span className="flex items-center space-x-1 font-inter">
                                  <Phone className="w-3 h-3" />
                                  <span>{member.phone}</span>
                                </span>
                              </div>
                              <div className="text-sm text-gray-500 mt-1 font-inter">
                                {member.experience} • {member.salary > 0 ? `KES ${member.salary.toLocaleString()}/month` : 'Owner'}
                              </div>
                              <div className="text-xs text-gray-500 mt-1 font-inter">
                                Specialties: {member.specialties.join(', ')}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingStaff(member.id)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            {member.id !== 1 && ( // Don't allow deleting owner
                              <button
                                onClick={() => deleteStaff(member.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bookings Tab - Enhanced with more details */}
            {activeTab === 'bookings' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 font-inter">Booking Management</h2>
                  <button
                    onClick={() => window.open('https://wa.me/254718779129?text=Hello! I would like to book an appointment for a client.', '_blank')}
                    className="bg-pearl-rose-dark text-white px-4 py-2 rounded-xl hover:bg-pearl-rose-dark/90 transition-colors flex items-center space-x-2 font-inter"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Book for Client</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-4 h-4 rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}></div>
                          <div>
                            <h3 className="font-bold text-gray-800 font-inter">{booking.clientName}</h3>
                            <p className="text-gray-600 font-inter">{booking.service} with {booking.stylist}</p>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                              <span className="flex items-center space-x-1 font-inter">
                                <Calendar className="w-3 h-3" />
                                <span>{booking.date}</span>
                              </span>
                              <span className="flex items-center space-x-1 font-inter">
                                <Clock className="w-3 h-3" />
                                <span>{booking.time}</span>
                              </span>
                              <span className="flex items-center space-x-1 font-inter">
                                <Phone className="w-3 h-3" />
                                <span>{booking.clientPhone}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-pearl-rose-dark font-inter">KES {booking.price.toLocaleString()}</div>
                          <div className={`text-sm font-medium font-inter ${
                            booking.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Promotions Tab with updated promotions */}
            {activeTab === 'promotions' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 font-inter">Promotion Management</h2>
                  <button className="bg-pearl-rose-dark text-white px-4 py-2 rounded-xl hover:bg-pearl-rose-dark/90 transition-colors flex items-center space-x-2 font-inter">
                    <Plus className="w-4 h-4" />
                    <span>Add Promotion</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  {promotions.map((promo) => (
                    <div key={promo.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800 font-inter">{promo.title}</h3>
                          <p className="text-gray-600 font-inter">{promo.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="bg-pearl-rose-dark text-white px-3 py-1 rounded-full text-sm font-bold">
                              {promo.discount}% OFF
                            </span>
                            {promo.originalPrice > 0 && (
                              <span className="text-gray-600 font-inter">
                                <span className="line-through">KES {promo.originalPrice.toLocaleString()}</span>
                                {' → '}
                                <span className="font-bold text-pearl-rose-dark">KES {promo.newPrice.toLocaleString()}</span>
                              </span>
                            )}
                            <span className="text-gray-500 text-sm font-inter">Valid until: {promo.validUntil}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deletePromotion(promo.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 font-inter">Gallery Management</h2>
                  <button className="bg-pearl-rose-dark text-white px-4 py-2 rounded-xl hover:bg-pearl-rose-dark/90 transition-colors flex items-center space-x-2 font-inter">
                    <Plus className="w-4 h-4" />
                    <span>Add Image</span>
                  </button>
                </div>

                <div className="text-center text-gray-600 font-inter">
                  <Image className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Gallery management coming soon...</p>
                  <p className="text-sm">Upload and organize your salon photos</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}