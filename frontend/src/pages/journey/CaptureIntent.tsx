import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { useAppStore } from '../../store/appStore'
import { api } from '../../services/api'
import {
  HiCurrencyRupee, HiCube, HiDeviceMobile, HiCash, HiChatAlt2,
} from 'react-icons/hi'

const intents = [
  { id: 'open_account', icon: HiCurrencyRupee, label: 'open_account', desc: 'Get a new SBI savings or salary account' },
  { id: 'explore_products', icon: HiCube, label: 'explore_products', desc: 'Browse SBI products and services' },
  { id: 'digital_banking', icon: HiDeviceMobile, label: 'digital_banking', desc: 'Learn about YONO, UPI, and digital banking' },
  { id: 'loan', icon: HiCash, label: 'loan_info', desc: 'Home, auto, education, or personal loan' },
  { id: 'general_help', icon: HiChatAlt2, label: 'general_help', desc: 'General assistance and support' },
]

export function CaptureIntent() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const sessionId = useAppStore((s) => s.sessionId)
  const setIntent = useAppStore((s) => s.setIntent)

  const handleSelect = async (intentId: string) => {
    setIntent(intentId)
    if (sessionId) {
      try {
        await api.captureIntent(sessionId, intentId)
      } catch { /* continue anyway */ }
    }
    navigate('/onboarding/profile')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-xs font-medium text-sbi-500 uppercase tracking-wider mb-2">
          {t('onboarding_step', { step: '2', total: '8' })}
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{t('what_brings_you')}</h1>
      </div>
      <div className="space-y-3">
        {intents.map((intent) => (
          <button
            key={intent.id}
            onClick={() => handleSelect(intent.id)}
            className="w-full card flex items-center gap-4 p-4 hover:shadow-md hover:border-sbi-200 transition-all text-left"
          >
            <div className="w-12 h-12 bg-sbi-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <intent.icon className="text-sbi-500" size={24} />
            </div>
            <div>
              <div className="font-semibold text-gray-900">{t(intent.label as keyof typeof import('../../locales/en')['en'])}</div>
              <div className="text-sm text-gray-500">{intent.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
