import { Link } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { useAppStore } from '../../store/appStore'
import {
  HiUser, HiShieldCheck, HiChartBar,
  HiPlusCircle, HiDocumentText, HiCube, HiDeviceMobile,
  HiAcademicCap, HiChatAlt2,
} from 'react-icons/hi'

export function Dashboard() {
  const { t } = useTranslation()
  const profile = useAppStore((s) => s.profile)
  const digitalReadinessScore = useAppStore((s) => s.digitalReadinessScore)

  const profileCompletion = profile.age_band ? 60 : 0
  const kycCompletion = 0
  const adoptionScore = digitalReadinessScore || 0

  const quickActions = [
    { icon: HiPlusCircle, label: t('open_account'), path: '/onboarding/language', color: 'text-sbi-500' },
    { icon: HiDocumentText, label: 'Check KYC', path: '/onboarding/kyc', color: 'text-secondary' },
    { icon: HiCube, label: t('explore_products'), path: '/onboarding/recommendation', color: 'text-accent-500' },
    { icon: HiDeviceMobile, label: 'Activate YONO', path: '/onboarding/yono', color: 'text-success' },
    { icon: HiAcademicCap, label: 'Learn Digital Banking', path: '/onboarding/intent', color: 'text-purple-500' },
    { icon: HiChatAlt2, label: 'AI Help', path: '/onboarding/intent', color: 'text-orange-500' },
  ]

  const recentActivity = [
    { action: 'Profile created', time: 'Today', status: 'done' },
    { action: 'Language selected', time: 'Today', status: 'done' },
    { action: 'KYC pending', time: '-', status: 'pending' },
    { action: 'YONO activation', time: '-', status: 'pending' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="card bg-gradient-to-r from-sbi-500 to-sbi-600 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-blue-100 text-sm">{t('welcome_back')}</p>
            <h1 className="text-2xl font-bold mt-1">{profile.occupation || 'Customer'}</h1>
            <p className="text-blue-100 text-sm mt-1">{t('track_progress')}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{adoptionScore}%</div>
            <div className="text-blue-100 text-sm">{t('digital_adoption')}</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: HiUser, label: t('profile_completion'), value: profileCompletion, color: 'text-sbi-500' },
          { icon: HiShieldCheck, label: t('kyc_completion'), value: kycCompletion, color: 'text-secondary' },
          { icon: HiChartBar, label: t('digital_adoption'), value: adoptionScore, color: 'text-success' },
        ].map((item) => (
          <div key={item.label} className="card">
            <div className="flex items-center justify-between mb-3">
              <item.icon className={item.color} size={24} />
              <span className="text-2xl font-bold text-gray-900">{item.value}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${item.value}%` }} />
            </div>
            <p className="text-sm text-gray-600 mt-2">{item.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('quick_actions')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="card hover:shadow-md transition-shadow flex flex-col items-center text-center gap-2 py-6"
            >
              <action.icon className={action.color} size={28} />
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((item) => (
            <div key={item.action} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${item.status === 'done' ? 'bg-success' : 'bg-gray-300'}`} />
                <span className="text-sm text-gray-700">{item.action}</span>
              </div>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-gradient-to-r from-sbi-50 to-blue-50 border-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Start Your Banking Journey</h3>
            <p className="text-sm text-gray-600 mt-1">Complete onboarding in under 5 minutes</p>
          </div>
          <Link to="/onboarding/language" className="btn-primary">
            {t('continue')} →
          </Link>
        </div>
      </div>
    </div>
  )
}
