import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { HiCheckCircle, HiDeviceMobile, HiLightningBolt, HiCash, HiDocumentText, HiChartBar } from 'react-icons/hi'
import toast from 'react-hot-toast'

const steps = [
  { id: 'install', icon: HiDeviceMobile, label: 'install_yono', desc: 'Download YONO from Play Store or App Store' },
  { id: 'activate', icon: HiLightningBolt, label: 'activate_yono', desc: 'Register using your account number and mobile' },
  { id: 'upi', icon: HiCash, label: 'setup_upi', desc: 'Set up UPI PIN and link your accounts' },
  { id: 'payments', icon: HiDocumentText, label: 'learn_payments', desc: 'Practice bill payments and mobile recharge' },
  { id: 'balance', icon: HiChartBar, label: 'check_balance', desc: 'Check balance and view mini statements' },
  { id: 'finish', icon: HiCheckCircle, label: 'mini_statement', desc: 'View recent transactions and download statements' },
]

export function YONO() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [completed, setCompleted] = useState<string[]>([])
  const [step, setStep] = useState(0)

  const currentStep = steps[step]

  const handleComplete = () => {
    if (!completed.includes(currentStep.id)) {
      setCompleted([...completed, currentStep.id])
      toast.success(t(`${currentStep.label}`))
    }
    if (step < steps.length - 1) {
      setStep(step + 1)
    }
  }

  const progress = (completed.length / steps.length) * 100

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-xs font-medium text-sbi-500 uppercase tracking-wider mb-2">
          {t('onboarding_step', { step: '6', total: '8' })}
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{t('yono_onboarding')}</h1>
        <p className="text-gray-600 mt-1">Set up your digital banking in 6 easy steps</p>
        <div className="progress-bar mt-4 max-w-md mx-auto">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-sm text-gray-500 mt-2">{completed.length} of {steps.length} steps done</p>
      </div>

      <div className="card mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-sbi-50 rounded-2xl flex items-center justify-center">
            <currentStep.icon className="text-sbi-500" size={28} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900">{t(currentStep.label as keyof typeof import('../../locales/en')['en'])}</h2>
            <p className="text-sm text-gray-500">{currentStep.desc}</p>
          </div>
          {completed.includes(currentStep.id) && (
            <HiCheckCircle className="text-success" size={24} />
          )}
        </div>

        <div className="bg-sbi-50 rounded-xl p-4 mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            {currentStep.id === 'install' && (
              <>
                <li>Open Google Play Store (Android) or App Store (iOS)</li>
                <li>Search for "YONO SBI"</li>
                <li>Tap Install and wait for download</li>
                <li>Open the app once installed</li>
              </>
            )}
            {currentStep.id === 'activate' && (
              <>
                <li>Open YONO app and tap "Register"</li>
                <li>Enter your account number and registered mobile</li>
                <li>Enter the OTP sent to your mobile</li>
                <li>Create your YONO MPIN (4-8 digits)</li>
              </>
            )}
            {currentStep.id === 'upi' && (
              <>
                <li>In YONO, go to "UPI Services"</li>
                <li>Select your account and create UPI PIN</li>
                <li>Link your debit card for UPI PIN setup</li>
                <li>Your UPI ID will be auto-generated</li>
              </>
            )}
            {currentStep.id === 'payments' && (
              <>
                <li>Go to "Payments" in YONO</li>
                <li>Select "Mobile Recharge" or "Bill Payment"</li>
                <li>Enter the required details</li>
                <li>Authorize using your UPI PIN</li>
              </>
            )}
            {currentStep.id === 'balance' && (
              <>
                <li>On YONO home screen, tap "Account Summary"</li>
                <li>Your balance will be displayed</li>
                <li>Scroll down to view recent transactions</li>
                <li>Tap "Mini Statement" for last 10 transactions</li>
              </>
            )}
            {currentStep.id === 'finish' && (
              <>
                <li>Congratulations! You're now fully digital</li>
                <li>Download your account statement</li>
                <li>Set up recurring payments (optional)</li>
                <li>Explore other YONO features</li>
              </>
            )}
          </ol>
        </div>

        {!completed.includes(currentStep.id) ? (
          <button onClick={handleComplete} className="btn-primary w-full">
            Mark Complete ✓
          </button>
        ) : (
          <button onClick={() => { if (step < steps.length - 1) setStep(step + 1) }} className="btn-primary w-full">
            {t('continue')} →
          </button>
        )}
      </div>

      <div className="grid grid-cols-6 gap-2">
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setStep(i)}
            className={`p-2 rounded-lg text-center transition-all ${
              completed.includes(s.id) ? 'bg-success/10 text-success' : i === step ? 'bg-sbi-50 text-sbi-500' : 'bg-gray-50 text-gray-400'
            }`}
          >
            <s.icon className="mx-auto" size={18} />
          </button>
        ))}
      </div>

      {completed.length === steps.length && (
        <button onClick={() => navigate('/onboarding/complete')} className="btn-primary w-full mt-6">
          {t('continue')} →
        </button>
      )}
    </div>
  )
}
