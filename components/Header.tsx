import React, { useState, useEffect } from 'react'
import { Menu, X, Calendar, Users, Settings, Phone, User } from 'lucide-react'

interface HeaderProps {
  currentView: string
  onNavigate: (view: string) => void
}

export function Header({ currentView, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Team', href: '#team' },
    { name: 'Offers', href: '#offers' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    if (currentView !== 'home') {
      onNavigate('home')
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  const handleLogoClick = () => {
    onNavigate('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-mobile">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-pearl-rose-dark to-champagne-silk-dark rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white text-lg md:text-xl font-bold font-script">VQ</span>
              </div>
              {/* Sparkle effect */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-gold rounded-full opacity-75 animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl md:text-2xl font-bold font-script transition-colors duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
              }`}>
                VIP Queens Salon
              </span>
              <span className={`text-xs md:text-sm font-medium font-inter transition-colors duration-300 ${
                isScrolled ? 'text-pearl-rose-dark' : 'text-pearl-rose-light'
              }`}>
                Best Salon in Town
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-pearl-rose-dark' 
                    : 'text-white/90 hover:text-white drop-shadow-sm'
                } font-inter`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Staff Portal */}
            <button
              onClick={() => onNavigate('staff-portal')}
              className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                isScrolled 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
              }`}
              title="Staff Portal"
            >
              <Users className="w-5 h-5" />
            </button>

            {/* Owner Portal */}
            <button
              onClick={() => onNavigate('owner-portal')}
              className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                isScrolled 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
              }`}
              title="Owner Portal"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Book Appointment */}
            <button
              onClick={() => scrollToSection('#booking')}
              className="bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark hover:from-champagne-silk-dark hover:to-pearl-rose-dark text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2 font-inter"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-all duration-300 ${
              isScrolled 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg animate-fadeIn">
            <div className="py-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-6 py-3 text-gray-700 hover:text-pearl-rose-dark hover:bg-gray-50 transition-colors duration-200 font-inter"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Portal Access */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <button
                  onClick={() => {
                    onNavigate('staff-portal')
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center space-x-3 w-full text-left px-6 py-3 text-gray-700 hover:text-pearl-rose-dark hover:bg-gray-50 transition-colors duration-200 font-inter"
                >
                  <Users className="w-4 h-4" />
                  <span>Staff Portal</span>
                </button>
                
                <button
                  onClick={() => {
                    onNavigate('owner-portal')
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center space-x-3 w-full text-left px-6 py-3 text-gray-700 hover:text-pearl-rose-dark hover:bg-gray-50 transition-colors duration-200 font-inter"
                >
                  <Settings className="w-4 h-4" />
                  <span>Owner Portal</span>
                </button>
              </div>

              {/* Mobile Book Button */}
              <div className="px-6 pt-4">
                <button
                  onClick={() => {
                    scrollToSection('#booking')
                    setIsMenuOpen(false)
                  }}
                  className="w-full bg-gradient-to-r from-pearl-rose-dark to-champagne-silk-dark text-white px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center space-x-2 font-inter"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
              </div>

              {/* Mobile Call Button */}
              <div className="px-6 pb-2">
                <a
                  href="tel:0718779129"
                  className="w-full bg-champagne-silk-dark hover:bg-champagne-silk-dark/90 text-white px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center space-x-2 transition-colors duration-200 font-inter"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}