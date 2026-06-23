import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import { useAppStore } from '../store/appStore'
import {
  HiHome, HiUser, HiLogout, HiMenu, HiX,
  HiChatAlt2, HiAcademicCap, HiShieldCheck,
} from 'react-icons/hi'
import { useState } from 'react'

export function DashboardLayout() {
  const { t, language } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const isAuthenticated = useAppStore((s) => s.isAuthenticated)
  const setAuthenticated = useAppStore((s) => s.setAuthenticated)
  const setLanguage = useAppStore((s) => s.setLanguage)
  const [menuOpen, setMenuOpen] = useState(false)

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  const sidebarLinks = [
    { to: '/dashboard', icon: HiHome, label: t('dashboard') },
    { to: '/onboarding/language', icon: HiAcademicCap, label: t('select_language') },
    { to: '/onboarding/intent', icon: HiChatAlt2, label: t('what_brings_you') },
    { to: '/onboarding/profile', icon: HiUser, label: t('profile') },
    { to: '/onboarding/kyc', icon: HiShieldCheck, label: 'KYC' },
    { to: '/onboarding/yono', icon: HiAcademicCap, label: 'YONO' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    setAuthenticated(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-surface flex">
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col fixed h-full">
        <div className="p-4 border-b border-gray-100">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sbi-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SB</span>
            </div>
            <span className="font-bold text-lg text-sbi-500">{t('app_name')}</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-sbi-50 text-sbi-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <link.icon size={20} />
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 space-y-2">
          <div className="flex items-center gap-2 px-4 py-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'ta')}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1 w-full"
            >
              <option value="en">{t('english')}</option>
              <option value="hi">{t('hindi')}</option>
              <option value="ta">{t('tamil')}</option>
            </select>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-danger hover:bg-red-50 w-full transition-colors"
          >
            <HiLogout size={20} />
            {t('logout')}
          </button>
        </div>
      </aside>

      <div className="md:ml-64 flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30 md:hidden">
          <div className="flex items-center justify-between p-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sbi-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SB</span>
              </div>
              <span className="font-bold text-lg text-sbi-500">{t('app_name')}</span>
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
          {menuOpen && (
            <div className="border-t border-gray-100 px-4 py-4 space-y-2">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    location.pathname === link.to ? 'bg-sbi-50 text-sbi-500' : 'text-gray-600'
                  }`}
                >
                  <link.icon size={20} />
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-danger w-full"
              >
                <HiLogout size={20} />
                {t('logout')}
              </button>
            </div>
          )}
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
