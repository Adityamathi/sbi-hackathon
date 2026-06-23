import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { useAppStore } from '../../store/appStore'
import { api } from '../../services/api'
import toast from 'react-hot-toast'

export function Signup() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setAuthenticated = useAppStore((s) => s.setAuthenticated)
  const [step, setStep] = useState<'form' | 'otp'>('form')
  const [form, setForm] = useState({ name: '', mobile: '', email: '', password: '', language: 'en' })
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.sendOtp(form.mobile)
      setStep('otp')
      toast.success(t('otp_sent', { mobile: form.mobile }))
    } catch {
      toast.error('Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await api.signup({ ...form, otp })
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('refreshToken', data.refresh_token)
      setAuthenticated(true)
      toast.success('Account created successfully!')
      useAppStore.getState().setLanguage(form.language as 'en' | 'hi' | 'ta')
      navigate('/dashboard')
    } catch {
      toast.error('Verification failed')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'otp') {
    return (
      <div className="card">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t('verify')} OTP</h1>
          <p className="text-gray-600 mt-1">{t('otp_sent', { mobile: form.mobile })}</p>
        </div>
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <input
            className="input-field text-center text-2xl tracking-widest"
            placeholder={t('otp_placeholder')}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength={6}
            required
          />
          <button type="submit" className="btn-primary w-full" disabled={otp.length !== 6 || loading}>
            {loading ? t('loading') : t('verify')}
          </button>
          <button type="button" onClick={handleSubmit} className="text-sm text-sbi-500 hover:underline w-full text-center">
            {t('resend_otp')}
          </button>
          <button type="button" onClick={() => setStep('form')} className="text-sm text-gray-500 hover:underline w-full text-center">
            {t('back')}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('signup')}</h1>
        <p className="text-gray-600 mt-1">Create your {t('app_name')} account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('full_name')}</label>
          <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('mobile_number')}</label>
          <input className="input-field" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })} maxLength={10} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
          <input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('password')}</label>
          <input type="password" className="input-field" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('language')}</label>
          <select className="input-field" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>
            <option value="en">{t('english')}</option>
            <option value="hi">{t('hindi')}</option>
            <option value="ta">{t('tamil')}</option>
          </select>
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? t('loading') : `${t('signup')} →`}
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-sbi-500 font-medium hover:underline">{t('login')}</Link>
      </p>
    </div>
  )
}
