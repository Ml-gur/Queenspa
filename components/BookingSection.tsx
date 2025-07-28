import React, { useState } from 'react'
import { Calendar, Clock, User, Phone, Mail, MessageCircle, Send, Star, CheckCircle } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function BookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    stylist: '',
    date: '',
    time: '',
    message: ''
  })

  const [selectedStylist, setSelectedStylist] = useState<number | null>(null)

  // Team members data matching the Team component
  const teamMembers = [
    {
      id: 1,
      name: 'Catherine',
      role: 'Owner & Master Stylist',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753687019/Catherine_m6vvoq.jpg',
      specialties: ['Hair Relaxing', 'Color Treatments', 'Salon Management'],
      experience: '8+ years'
    },
    {
      id: 2,
      name: 'Njeri',
      role: 'Senior Hair Stylist',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753687020/njeri_momehb.jpg',
      specialties: ['Braiding', 'Natural Hair Care', 'Protective Styles'],
      experience: '5+ years'
    },
    {
      id: 3,
      name: 'Ann',
      role: 'Hair Stylist & Nail Technician',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753687496/Ann_gatgo6.jpg',
      specialties: ['Nail Art', 'Hair Styling', 'Manicures & Pedicures'],
      experience: '4+ years'
    },
    {
      id: 4,
      name: 'Rachael',
      role: 'Junior Stylist & Receptionist',
      image: 'https://res.cloudinary.com/deasyoglq/image/upload/v1753687504/Rachael_rkzce3.jpg',
      specialties: ['Customer Service', 'Basic Styling', 'Consultation'],
      experience: '2+ years'
    }
  ]

  const services = [
    'Haircut & Styling - KES 1,500',
    'Hair Braiding & Extensions - KES 2,500',
    'Hair Treatment & Care - KES 2,000',
    'Hair Relaxing - KES 3,500',
    'Wig Installation & Styling - KES 3,000',
    'Nail Care Services - KES 1,200',
    'Free Consultation - KES 0'
  ]

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const selectedStylistName = teamMembers.find(member => member.id === selectedStylist)?.name || 'Any available stylist'
    
    const whatsappMessage = `🌟 VIP Queens Salon Booking Request 🌟

👤 Client Details:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

💄 Service Request:
Service: ${formData.service}
Preferred Stylist: ${selectedStylistName}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}

💬 Additional Message:
${formData.message || 'No additional requests'}

📞 Please confirm this appointment or suggest alternative times. Thank you!`

    window.open(`https://wa.me/254718779129?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleStylistSelect = (stylistId: number, stylistName: string) => {
    setSelectedStylist(stylistId)
    setFormData({
      ...formData,
      stylist: stylistName
    })
  }

  return (
    <section id="booking" className="py-16 lg:py-24 bg-gradient-to-b from-soft-cream to-pearl-rose-light">
      <div className="container-mobile">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-pearl-rose/20 rounded-full px-6 py-2 mb-6">
            <Calendar className="w-4 h-4 text-pearl-rose-dark mr-2" />
            <span className="text-sm font-medium text-gray-700 font-inter">Book Appointment</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 font-inter">
            Book Your{' '}
            <span className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark bg-clip-text text-transparent">
              Dream Appointment
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Ready for your transformation? Book an appointment with our expert stylists 
            and experience the VIP Queens difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 font-inter">Schedule Your Visit</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors font-inter"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors font-inter"
                    placeholder="0712 345 678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors font-inter"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Service *</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors font-inter"
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              {/* Stylist Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 font-inter">Preferred Stylist</label>
                <div className="grid grid-cols-2 gap-3">
                  {teamMembers.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => handleStylistSelect(member.id, member.name)}
                      className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                        selectedStylist === member.id
                          ? 'border-pearl-rose-dark bg-pearl-rose-light/20'
                          : 'border-gray-200 hover:border-pearl-rose/50 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <ImageWithFallback
                            src={member.image}
                            alt={member.name}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                          {selectedStylist === member.id && (
                            <div className="absolute -top-1 -right-1 bg-pearl-rose-dark rounded-full p-1">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-800 text-sm font-inter">{member.name}</div>
                          <div className="text-xs text-gray-600 font-inter">{member.experience}</div>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500 font-inter">
                        {member.specialties.slice(0, 2).join(', ')}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => handleStylistSelect(0, 'Any available stylist')}
                    className={`w-full p-3 rounded-xl border-2 text-sm transition-all duration-300 font-inter ${
                      selectedStylist === 0
                        ? 'border-pearl-rose-dark bg-pearl-rose-light/20 text-pearl-rose-dark'
                        : 'border-gray-200 hover:border-pearl-rose/50 text-gray-600'
                    }`}
                  >
                    No preference - Any available stylist
                  </button>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Preferred Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors font-inter"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Preferred Time *</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors font-inter"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Special Requests</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pearl-rose-dark focus:border-transparent transition-colors font-inter"
                  placeholder="Any special requests or questions about your appointment..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 font-inter"
              >
                <Send className="w-5 h-5" />
                <span>Book via WhatsApp</span>
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500 font-inter">
                  You'll be redirected to WhatsApp to confirm your booking
                </p>
              </div>
            </form>
          </div>

          {/* Booking Information */}
          <div className="space-y-8">
            {/* Business Hours */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 font-inter">Business Hours</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700 font-inter">Monday - Saturday</span>
                  <span className="text-pearl-rose-dark font-semibold font-inter">6:00 AM - 10:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium text-gray-700 font-inter">Sunday</span>
                  <span className="text-pearl-rose-dark font-semibold font-inter">9:00 AM - 6:00 PM</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-pearl-rose-light/30 rounded-xl">
                <div className="flex items-center space-x-2 text-pearl-rose-dark mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold font-inter">Best Times to Book</span>
                </div>
                <p className="text-sm text-gray-600 font-inter">
                  Weekday mornings (9-11 AM) typically have the best availability. 
                  Weekend appointments fill up quickly, so book in advance!
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 font-inter">Why Choose VIP Queens?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 font-inter">Expert Stylists</h4>
                    <p className="text-sm text-gray-600 font-inter">Experienced professionals specialized in African hair care</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 font-inter">Quality Products</h4>
                    <p className="text-sm text-gray-600 font-inter">Premium hair care products for lasting results</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-5 h-5 text-pearl-rose-dark mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 font-inter">Personalized Service</h4>
                    <p className="text-sm text-gray-600 font-inter">Consultations tailored to your hair type and lifestyle</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-champagne-silk-dark mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 font-inter">Comfortable Environment</h4>
                    <p className="text-sm text-gray-600 font-inter">Relaxing atmosphere where you feel like royalty</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Booking */}
            <div className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4 font-inter">Need Urgent Appointment?</h3>
              <p className="text-pearl-rose-light mb-6 font-inter">
                Call us directly for same-day bookings or urgent beauty emergencies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => window.open('tel:0718779129', '_self')}
                  className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-colors font-inter"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </button>
                
                <button 
                  onClick={() => window.open('https://wa.me/254718779129?text=Hello! I need an urgent appointment at VIP Queens Salon.', '_blank')}
                  className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-colors font-inter"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}