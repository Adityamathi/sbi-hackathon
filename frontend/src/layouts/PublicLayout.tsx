import { Outlet, Link, useLocation } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import { useAppStore } from '../store/appStore'
import { HiMenu, HiX } from 'react-icons/hi'
import { useState } from 'react'

export function PublicLayout() {
  const { t } = useTranslation()
  const location = useLocation()
  const isAuthenticated = useAppStore((s) => s.isAuthenticated)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/about', label: t('about') },
    { to: '/features', label: t('features') },
    { to: '/contact', label: t('contact') },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sbi-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SB</span>
              </div>
              <span className="font-bold text-lg text-sbi-500">{t('app_name')}</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-sbi-500'
                      : 'text-gray-600 hover:text-sbi-500'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn-primary text-sm py-2 px-4">
                  {t('dashboard')}
                </Link>
              ) : (
                <>
                  <Link to="/login" className="btn-outline text-sm py-2 px-4">
                    {t('login')}
                  </Link>
                  <Link to="/signup" className="btn-primary text-sm py-2 px-4">
                    {t('signup')}
                  </Link>
                </>
              )}
            </nav>
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-medium text-gray-600 hover:text-sbi-500"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <Link to="/dashboard" className="block btn-primary text-center text-sm">
                {t('dashboard')}
              </Link>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="flex-1 btn-outline text-center text-sm py-2">
                  {t('login')}
                </Link>
                <Link to="/signup" className="flex-1 btn-primary text-center text-sm py-2">
                  {t('signup')}
                </Link>
              </div>
            )}
          </div>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-sbi-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-sbi-900 font-bold text-sm">SB</span>
                </div>
                <span className="font-bold text-lg">{t('app_name')}</span>
              </div>
              <p className="text-gray-400 text-sm">{t('tagline')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t('features')}</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>AI Assistant</p>
                <p>Multilingual Support</p>
                <p>Digital Banking Guide</p>
                <p>Product Recommendations</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t('help')}</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>FAQ</p>
                <p>Support</p>
                <p>Contact Us</p>
                <p>Feedback</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t('contact')}</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>1800 1234 5678</p>
                <p>support@sbi-sahaayak.in</p>
                <p>State Bank of India</p>
                <p>Mumbai, India</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>{t('footer_rights')}</p>
            <p className="mt-1">{t('footer_disclaimer')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
