import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { useAppStore } from '../../store/appStore'
import { api } from '../../services/api'
import toast from 'react-hot-toast'

export function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setAuthenticated = useAppStore((s) => s.setAuthenticated)
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [otpMode, setOtpMode] = useState(false)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await api.login(mobile, password)
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('refreshToken', data.refresh_token)
      setAuthenticated(true)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch {
      toast.error('Invalid credentials. Try OTP login instead.')
    } finally {
      setLoading(false)
    }
  }

  const handleSendOtp = async () => {
    setLoading(true)
    try {
      await api.sendOtp(mobile)
      setOtpMode(true)
      toast.success(t('otp_sent', { mobile }))
    } catch {
      toast.error('Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await api.verifyOtp(mobile, otp)
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('refreshToken', data.refresh_token)
      setAuthenticated(true)
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch {
      toast.error('Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('login')}</h1>
        <p className="text-gray-600 mt-1">Welcome back to {t('app_name')}</p>
      </div>

      {otpMode ? (
        <form onSubmit={handleOtpLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('otp')}</label>
            <input
              className="input-field text-center text-2xl tracking-widest"
              placeholder={t('otp_placeholder')}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              required
            />
            <p className="text-xs text-gray-500 mt-1">{t('otp_sent', { mobile })}</p>
          </div>
          <button type="submit" className="btn-primary w-full" disabled={otp.length !== 6 || loading}>
            {loading ? t('loading') : t('verify')}
          </button>
          <button type="button" onClick={handleSendOtp} className="text-sm text-sbi-500 hover:underline w-full text-center">
            {t('resend_otp')}
          </button>
          <button type="button" onClick={() => setOtpMode(false)} className="text-sm text-gray-500 hover:underline w-full text-center">
            {t('back')}
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('mobile_number')}</label>
            <input
              className="input-field"
              placeholder="Enter 10-digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              maxLength={10}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('password')}</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Link to="/forgot-password" className="text-sm text-sbi-500 hover:underline">
              {t('forgot_password')}
            </Link>
            <button type="button" onClick={handleSendOtp} className="text-sm text-sbi-500 hover:underline">
              {t('send_otp')}
            </button>
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? t('loading') : t('login')}
          </button>
        </form>
      )}

      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{' '}
        <Link to="/signup" className="text-sbi-500 font-medium hover:underline">
          {t('signup')}
        </Link>
      </p>
    </div>
  )
}
