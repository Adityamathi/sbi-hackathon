import { Link } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { HiChatAlt2, HiTranslate, HiShieldCheck, HiLightningBolt, HiUserGroup, HiDeviceMobile } from 'react-icons/hi'

export function Home() {
  const { t } = useTranslation()

  const features = [
    { icon: HiChatAlt2, title: 'AI Assistant', desc: 'Intelligent banking assistant available 24/7 in your language' },
    { icon: HiTranslate, title: 'Multilingual', desc: 'Support for Hindi, Tamil, English and 22+ Indian languages' },
    { icon: HiShieldCheck, title: 'KYC Assistant', desc: 'Step-by-step guidance through KYC documentation process' },
    { icon: HiLightningBolt, title: 'Instant Account', desc: 'Open SBI savings account in minutes, not days' },
    { icon: HiUserGroup, title: 'Personalized', desc: 'Product recommendations based on your unique profile' },
    { icon: HiDeviceMobile, title: 'YONO Ready', desc: 'Complete YONO activation and UPI setup assistance' },
  ]

  const steps = [
    { num: '1', title: 'Choose Language', desc: 'Select your preferred language' },
    { num: '2', title: 'Tell Your Need', desc: 'Share what brings you to banking' },
    { num: '3', title: 'Profile Setup', desc: 'Complete your profile in 2 minutes' },
    { num: '4', title: 'Get Recommendations', desc: 'AI-powered product suggestions' },
    { num: '5', title: 'Complete KYC', desc: 'Document upload with assistance' },
    { num: '6', title: 'Start Banking', desc: 'Activate YONO and digital banking' },
  ]

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-sbi-500 via-sbi-600 to-sbi-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYtMkgyNHYyaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              AI-Powered Banking Assistant
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {t('welcome')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              {t('tagline')} — Open accounts, complete KYC, learn digital banking, 
              and get personalized product recommendations in your language.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="btn-accent text-lg px-8 py-4">
                {t('get_started')}
              </Link>
              <Link to="/about" className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all">
                {t('about')}
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-12 text-sm text-blue-200">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> No paperwork</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> 5-minute onboarding</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> 22+ languages</span>
            </div>
          </div>
        </div>
        <div className="h-16 bg-surface rounded-t-[3rem]" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Digital Banking
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From account opening to YONO activation, SBI Sahaayak guides you through every step.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="card hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-sbi-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sbi-100 transition-colors">
                  <f.icon className="text-sbi-500" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Complete your banking journey in 6 simple steps</p>
          </div>
          <div className="grid md:grid-cols-6 gap-4">
            {steps.map((s, i) => (
              <div key={s.num} className="text-center relative">
                <div className="w-12 h-12 bg-sbi-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  {s.num}
                </div>
                <h4 className="font-semibold text-sm text-gray-900">{s.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-sbi-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sbi-500 to-sbi-600 rounded-3xl p-8 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Banking Journey Today</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join millions of SBI customers. Open your account in minutes with AI-powered guidance.
            </p>
            <Link to="/signup" className="btn-accent text-lg px-8 py-4 inline-block">
              {t('get_started')} — It's Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
