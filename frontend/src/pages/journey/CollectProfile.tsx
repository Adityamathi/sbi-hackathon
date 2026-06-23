import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { useAppStore } from '../../store/appStore'
import { api } from '../../services/api'
export function CollectProfile() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const sessionId = useAppStore((s) => s.sessionId)
  const setProfile = useAppStore((s) => s.setProfile)
  const setProduct = useAppStore((s) => s.setProduct)

  const [form, setForm] = useState({
    age_band: '',
    gender: '',
    occupation: '',
    income_range: '',
    location: '',
    area: 'urban' as 'urban' | 'rural',
    digital_literacy: 'medium' as 'low' | 'medium' | 'high',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfile(form)
    if (sessionId) {
      try {
        const data = await api.submitProfile(sessionId, form)
        if (data.recommendation) setProduct(data.recommendation)
      } catch { /* use local rules */ }
    }
    navigate('/onboarding/recommendation')
  }

  const fields = [
    { key: 'age_band', label: t('age'), type: 'select', options: ['18-25', '26-35', '36-45', '46-60', '60+'] },
    { key: 'gender', label: t('gender'), type: 'select', options: ['Male', 'Female', 'Other'] },
    { key: 'occupation', label: t('occupation'), type: 'select', options: ['Student', 'Salaried', 'Self-Employed', 'Farmer', 'Senior Citizen', 'Homemaker', 'Other'] },
    { key: 'income_range', label: t('income_range'), type: 'select', options: ['< 2 LPA', '2-5 LPA', '5-10 LPA', '10-20 LPA', '20+ LPA'] },
    { key: 'location', label: t('location'), type: 'text' },
    { key: 'area', label: t('area'), type: 'select', options: ['urban', 'rural'] },
    { key: 'digital_literacy', label: t('digital_literacy'), type: 'select', options: ['low', 'medium', 'high'] },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-xs font-medium text-sbi-500 uppercase tracking-wider mb-2">
          {t('onboarding_step', { step: '3', total: '8' })}
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{t('tell_us_about_you')}</h1>
      </div>
      <form onSubmit={handleSubmit} className="card space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
            {f.type === 'select' ? (
              <select
                className="input-field"
                value={String(form[f.key as keyof typeof form])}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                required
              >
                <option value="">Select {f.label}</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                className="input-field"
                value={String(form[f.key as keyof typeof form])}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                required
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn-primary w-full">
          {t('continue')} →
        </button>
      </form>
    </div>
  )
}
