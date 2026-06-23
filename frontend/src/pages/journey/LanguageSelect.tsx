import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { useAppStore } from '../../store/appStore'
import { api } from '../../services/api'
import { HiCheckCircle } from 'react-icons/hi'
import toast from 'react-hot-toast'

const languages = [
  { code: 'en' as const, label: 'English', flag: '🇬🇧' },
  { code: 'hi' as const, label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta' as const, label: 'தமிழ்', flag: '🇮🇳' },
]

export function LanguageSelect() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const language = useAppStore((s) => s.language)
  const setLanguage = useAppStore((s) => s.setLanguage)
  const setSessionId = useAppStore((s) => s.setSessionId)

  const handleSelect = async (code: typeof language) => {
    setLanguage(code)
    try {
      const data = await api.startSession(code)
      setSessionId(data.session_id)
      navigate('/onboarding/intent')
    } catch {
      toast.error(t('error'))
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-xs font-medium text-sbi-500 uppercase tracking-wider mb-2">
          {t('onboarding_step', { step: '1', total: '8' })}
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{t('select_language')}</h1>
        <p className="text-gray-600 mt-1">{t('language_note')}</p>
      </div>
      <div className="space-y-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={`w-full card flex items-center justify-between p-4 hover:shadow-md transition-all ${
              language === lang.code ? 'ring-2 ring-sbi-500 bg-sbi-50' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{lang.flag}</span>
              <div className="text-left">
                <div className="font-semibold text-gray-900">{lang.label}</div>
                <div className="text-sm text-gray-500">{lang.code === 'en' ? 'English' : lang.code === 'hi' ? 'Hindi' : 'Tamil'}</div>
              </div>
            </div>
            {language === lang.code && <HiCheckCircle className="text-sbi-500" size={24} />}
          </button>
        ))}
      </div>
    </div>
  )
}
