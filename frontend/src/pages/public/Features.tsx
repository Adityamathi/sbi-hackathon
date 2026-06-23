import { useTranslation } from '../../hooks/useTranslation'
import { 
  HiChatAlt2, HiTranslate, HiShieldCheck, HiLightningBolt, 
  HiUserGroup, HiDeviceMobile, HiBookOpen, HiSupport 
} from 'react-icons/hi'

export function Features() {
  const { t } = useTranslation()

  const featureGroups = [
    {
      title: 'Core Features',
      items: [
        {
          icon: HiChatAlt2,
          name: 'AI Banking Assistant',
          desc: 'Intelligent conversational agent that understands context, remembers preferences, and provides personalized guidance throughout your banking journey.',
        },
        {
          icon: HiTranslate,
          name: '22+ Language Support',
          desc: 'Full support for English, Hindi, Tamil, and architecture designed to extend to 22+ Indian languages with native scripts and dialects.',
        },
        {
          icon: HiShieldCheck,
          name: 'KYC Assistant',
          desc: 'Step-by-step guidance through KYC documentation. Know exactly which documents you need, how to upload them, and track verification status.',
        },
        {
          icon: HiLightningBolt,
          name: 'Instant Account Opening',
          desc: 'Open SBI savings account in under 5 minutes with AI-assisted form filling, document verification, and instant account number generation.',
        },
      ],
    },
    {
      title: 'Digital Banking Features',
      items: [
        {
          icon: HiDeviceMobile,
          name: 'YONO Activation Guide',
          desc: 'Complete walkthrough for YONO app installation, registration, and activation. Includes UPI setup and first transaction guidance.',
        },
        {
          icon: HiUserGroup,
          name: 'Personalized Recommendations',
          desc: 'AI-powered product recommendation engine that analyzes your profile, needs, and banking readiness to suggest the best SBI products.',
        },
        {
          icon: HiBookOpen,
          name: 'Digital Banking Education',
          desc: 'Interactive tutorials for UPI payments, bill payments, balance checks, mini statements, and other digital banking features.',
        },
        {
          icon: HiSupport,
          name: '24/7 Support',
          desc: 'Round-the-clock AI assistance with seamless handoff to human agents for complex queries. Multi-channel support via web and mobile.',
        },
      ],
    },
  ]

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('features')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need for a seamless digital banking experience
          </p>
        </div>

        {featureGroups.map((group) => (
          <div key={group.title} className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{group.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {group.items.map((item) => (
                <div key={item.name} className="card hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-sbi-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-sbi-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
