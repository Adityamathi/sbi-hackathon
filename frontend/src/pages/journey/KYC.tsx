import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { useAppStore } from '../../store/appStore'
import { HiCheckCircle, HiUpload, HiShieldCheck } from 'react-icons/hi'
import toast from 'react-hot-toast'

const defaultKycItems = [
  { name: 'aadhaar', required: true },
  { name: 'pan', required: true },
  { name: 'photo', required: true },
  { name: 'address_proof', required: true },
]

export function KYC() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const updateKycItem = useAppStore((s) => s.updateKycItem)
  const kycRequirements = useAppStore((s) => s.kycRequirements)
  const [uploading, setUploading] = useState<string | null>(null)

  const items = kycRequirements.length > 0 ? kycRequirements : defaultKycItems.map((k) => ({ ...k, label: t(k.name as keyof typeof import('../../locales/en')['en']), completed: false }))

  const handleUpload = (name: string) => {
    setUploading(name)
    setTimeout(() => {
      updateKycItem(name, true)
      setUploading(null)
      toast.success(t('document_uploaded'))
    }, 1500)
  }

  const allDone = items.every((i) => i.completed)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-xs font-medium text-sbi-500 uppercase tracking-wider mb-2">
          {t('onboarding_step', { step: '5', total: '8' })}
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{t('kyc_requirements')}</h1>
        <p className="text-gray-600 mt-1">{t('kyc_instructions')}</p>
      </div>

      <div className="card space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.name} className={`p-4 rounded-xl border transition-all ${
            item.completed ? 'border-success bg-success/5' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.completed ? 'bg-success/10' : 'bg-gray-100'
                }`}>
                  {item.completed ? (
                    <HiCheckCircle className="text-success" size={24} />
                  ) : (
                    <HiShieldCheck className="text-gray-400" size={24} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{t(item.name as keyof typeof import('../../locales/en')['en'])}</p>
                  <p className="text-xs text-gray-500">
                    {item.completed ? t('verified') : t('pending')}
                  </p>
                </div>
              </div>
              {!item.completed && (
                <button
                  onClick={() => handleUpload(item.name)}
                  className="btn-outline text-sm py-2 px-4 flex items-center gap-2"
                  disabled={uploading === item.name}
                >
                  <HiUpload size={16} />
                  {uploading === item.name ? t('loading') : t('upload_document')}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {allDone && (
        <div className="card bg-success/5 border-success/20 text-center py-8 mb-6">
          <HiCheckCircle className="text-success mx-auto mb-3" size={40} />
          <h3 className="text-lg font-bold text-gray-900 mb-1">{t('kyc_verified')}</h3>
          <p className="text-sm text-gray-600">All documents verified successfully</p>
        </div>
      )}

      <button
        onClick={() => navigate('/onboarding/yono')}
        className="btn-primary w-full"
        disabled={!allDone}
      >
        {t('continue')} to YONO →
      </button>
    </div>
  )
}
