import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { useAppStore } from '../../store/appStore'
import { HiCheckCircle, HiStar, HiLightningBolt, HiDeviceMobile, HiBookOpen } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const badges = [
  { icon: HiStar, label: 'Account Holder', color: 'text-accent' },
  { icon: HiDeviceMobile, label: 'YONO Ready', color: 'text-secondary' },
  { icon: HiCheckCircle, label: 'KYC Verified', color: 'text-success' },
  { icon: HiLightningBolt, label: 'Digital Savvy', color: 'text-sbi-500' },
]

export function Completion() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setDigitalReadinessScore = useAppStore((s) => s.setDigitalReadinessScore)
  const [score] = useState(() => Math.floor(60 + Math.random() * 35))
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    setDigitalReadinessScore(score)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [score, setDigitalReadinessScore])

  return (
    <div className="max-w-2xl mx-auto text-center">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                backgroundColor: ['#FFD700', '#005BAC', '#1E88E5', '#00A86B', '#D32F2F'][Math.floor(Math.random() * 5)],
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="mb-8">
        <div className="text-xs font-medium text-sbi-500 uppercase tracking-wider mb-2">
          Step 8 of 8
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t('congratulations')}</h1>
        <p className="text-xl text-gray-600">{t('onboarding_complete')}</p>
      </div>

      <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8">
        <HiCheckCircle className="text-success" size={56} />
      </div>

      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('digital_readiness_score')}</h3>
        <div className="text-5xl font-bold text-sbi-500 mb-2">{score}%</div>
        <div className="progress-bar max-w-xs mx-auto">
          <div className="progress-fill" style={{ width: `${score}%` }} />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {score >= 90 ? 'Excellent! You\'re fully digital-ready!' :
           score >= 70 ? 'Great progress! Almost there!' :
           'Good start! Keep exploring digital features.'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {badges.map((badge) => (
          <div key={badge.label} className="card py-6">
            <badge.icon className={`${badge.color} mx-auto mb-2`} size={28} />
            <p className="text-xs font-medium text-gray-700">{badge.label}</p>
          </div>
        ))}
      </div>

      <div className="card mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">{t('next_recommendations')}</h3>
        <div className="space-y-3 text-left">
          {[
            { icon: HiBookOpen, label: 'Explore Investment Options', desc: 'Start with as little as ₹500' },
            { icon: HiDeviceMobile, label: 'Try YONO Features', desc: 'Bill payments, transfers, and more' },
            { icon: HiLightningBolt, label: 'Enable Auto-Payments', desc: 'Never miss a bill payment again' },
          ].map((rec) => (
            <div key={rec.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50">
              <rec.icon className="text-sbi-500" size={20} />
              <div>
                <p className="font-medium text-sm text-gray-900">{rec.label}</p>
                <p className="text-xs text-gray-500">{rec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Link to="/dashboard" className="btn-primary flex-1">
          Go to Dashboard →
        </Link>
        <button onClick={() => {
          useAppStore.getState().reset()
          navigate('/onboarding/language')
        }} className="btn-outline">
          Start Over
        </button>
      </div>
    </div>
  )
}
