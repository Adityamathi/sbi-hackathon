import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { useAppStore } from '../../store/appStore'
import { HiCheckCircle, HiStar, HiUserGroup } from 'react-icons/hi'

const productData: Record<string, { name: string; desc: string; benefits: string[]; eligibility: string[] }> = {
  Student: {
    name: 'digital_savings',
    desc: 'Pehla Kadam Digital Savings Account with zero balance and full digital access.',
    benefits: ['Zero balance account', 'Free debit card', 'UPI & mobile banking', 'Online statements', 'No maintenance fee'],
    eligibility: ['18-25 years', 'Valid Aadhaar', 'Valid PAN', 'Student ID (optional)'],
  },
  Salaried: {
    name: 'salary_account',
    desc: 'Premium Salary Account with exclusive benefits and higher transaction limits.',
    benefits: ['Higher ATM limits', 'Free fund transfers', 'Credit card pre-approval', 'Personal loan offers', 'Investment options'],
    eligibility: ['Employed with salary', 'Valid Aadhaar & PAN', 'Salary certificate', 'Age 21-60'],
  },
  Farmer: {
    name: 'basic_savings',
    desc: 'PM Kisan Samman account with Kisan Credit Card and government scheme linkage.',
    benefits: ['Kisan Credit Card', 'PM Kisan benefits', 'Low interest loans', 'Crop insurance', 'Zero balance option'],
    eligibility: ['Farmer with land records', 'Kisan Credit Card eligible', 'PM Kisan beneficiary'],
  },
  'Senior Citizen': {
    name: 'senior_savings',
    desc: 'Senior Citizen Savings Scheme with higher interest rates and assisted banking.',
    benefits: ['Higher interest rates', 'Priority banking', 'Free checkbook', 'Doorstep banking', 'Tax benefits'],
    eligibility: ['60+ years', 'Valid Aadhaar', 'PAN card', 'Senior Citizen ID'],
  },
}

export function Recommendation() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const profile = useAppStore((s) => s.profile)
  const product = useAppStore((s) => s.product)

  const occ = profile.occupation || 'Salaried'
  const localRec = productData[occ] || productData.Salaried
  const rec = product ? { name: product.name, desc: product.description, benefits: product.benefits, eligibility: product.eligibility } : localRec
  const productName = rec.name

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-xs font-medium text-sbi-500 uppercase tracking-wider mb-2">
          {t('onboarding_step', { step: '4', total: '8' })}
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{t('recommended_products')}</h1>
        <p className="text-gray-600 mt-1">Based on your profile, we recommend:</p>
      </div>

      <div className="card ring-2 ring-accent relative overflow-hidden">
        <div className="absolute top-4 right-4 bg-accent text-sbi-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <HiStar size={14} /> Best Match
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-sbi-50 rounded-xl flex items-center justify-center">
            <HiUserGroup className="text-sbi-500" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{productName}</h2>
            <p className="text-sm text-gray-500">{occ} Account Package</p>
          </div>
        </div>
        <p className="text-gray-700 mb-6">{rec.desc}</p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <HiCheckCircle className="text-success" size={18} /> {t('benefits')}
            </h3>
            <ul className="space-y-2">
              {rec.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-success rounded-full" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t('eligibility')}</h3>
            <ul className="space-y-2">
              {rec.eligibility.map((e) => (
                <li key={e} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-sbi-500 rounded-full" /> {e}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-sbi-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-sbi-700">
            <strong>{t('why_this_product')}:</strong> Based on your profile as a {occ.toLowerCase()} customer 
            in a {profile.area || 'urban'} area with {profile.digital_literacy || 'medium'} digital literacy, 
            this product best matches your needs.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate('/onboarding/kyc')} className="btn-primary flex-1">
            {t('continue')} to KYC →
          </button>
          <button onClick={() => navigate('/onboarding/profile')} className="btn-outline">
            {t('back')}
          </button>
        </div>
      </div>
    </div>
  )
}
