import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { api } from '../../services/api'
import toast from 'react-hot-toast'

export function ForgotPassword() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState<'mobile' | 'otp' | 'reset'>('mobile')
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.sendOtp(mobile)
      setStep('otp')
      toast.success(t('otp_sent', { mobile }))
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
      await api.verifyOtp(mobile, otp)
      setStep('reset')
      toast.success('OTP verified! Set your new password.')
    } catch {
      toast.error('Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error(t('passwords_dont_match'))
      return
    }
    setLoading(true)
    try {
      await api.resetPassword(mobile, otp, password)
      toast.success('Password reset successfully! Please login.')
      navigate('/login')
    } catch {
      toast.error('Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('reset_password')}</h1>
        <p className="text-gray-600 mt-1">{t('forgot_password')}</p>
      </div>

      {step === 'mobile' && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <input className="input-field" placeholder={t('mobile_number')} value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} maxLength={10} required />
          <button type="submit" className="btn-primary w-full" disabled={mobile.length !== 10 || loading}>{loading ? t('loading') : t('send_otp')}</button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <input className="input-field text-center text-2xl tracking-widest" placeholder={t('otp_placeholder')} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} maxLength={6} required />
          <button type="submit" className="btn-primary w-full" disabled={otp.length !== 6 || loading}>{loading ? t('loading') : t('verify')}</button>
          <button type="button" onClick={handleSendOtp} className="text-sm text-sbi-500 hover:underline w-full text-center">{t('resend_otp')}</button>
        </form>
      )}

      {step === 'reset' && (
        <form onSubmit={handleReset} className="space-y-4">
          <input type="password" className="input-field" placeholder={t('new_password')} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          <input type="password" className="input-field" placeholder={t('confirm_password')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} />
          <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? t('loading') : t('reset_password')}</button>
        </form>
      )}

      <p className="text-center text-sm text-gray-600 mt-6">
        <Link to="/login" className="text-sbi-500 font-medium hover:underline">{t('back')} to {t('login')}</Link>
      </p>
    </div>
  )
}
