import { HiTranslate, HiGlobeAlt, HiLightningBolt, HiShieldCheck, HiChartBar, HiHeart } from 'react-icons/hi'

export function About() {

  const stats = [
    { value: '10M+', label: 'Customers Served' },
    { value: '22+', label: 'Languages Supported' },
    { value: '99.9%', label: 'Uptime' },
    { value: '5 min', label: 'Avg. Onboarding' },
  ]

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About SBI Sahaayak</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Making banking accessible, understandable, and usable for every Indian — in their language.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {stats.map((s) => (
            <div key={s.value} className="card text-center">
              <div className="text-3xl font-bold text-sbi-500 mb-1">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              SBI Sahaayak is an AI-powered multilingual banking assistant designed to bridge the digital divide 
              in Indian banking. Our mission is to make banking accessible to every Indian, regardless of language 
              or digital literacy level.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By combining the power of Generative AI with deep banking expertise, we provide personalized 
              guidance for account opening, KYC completion, product selection, and digital banking adoption.
            </p>
          </div>
          <div className="bg-gradient-to-br from-sbi-50 to-blue-50 rounded-3xl p-8">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: HiTranslate, label: 'Multilingual AI' },
                { icon: HiLightningBolt, label: 'Instant Processing' },
                { icon: HiShieldCheck, label: 'Bank-Grade Security' },
                { icon: HiHeart, label: 'Customer First' },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 bg-white rounded-2xl">
                  <item.icon className="text-sbi-500 mx-auto mb-2" size={28} />
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Technology Behind Sahaayak</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: HiGlobeAlt, title: 'Generative AI', desc: 'Powered by advanced LLMs through Groq and OpenAI for intelligent, context-aware conversations.' },
              { icon: HiChartBar, title: 'Smart Recommendations', desc: 'Our recommendation engine combines rule-based logic with ML models for personalized product suggestions.' },
              { icon: HiTranslate, title: 'Multilingual Engine', desc: 'Real-time translation and response generation in 22+ Indian languages using state-of-the-art NLP.' },
            ].map((item) => (
              <div key={item.title} className="card">
                <item.icon className="text-sbi-500 mb-3" size={32} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
