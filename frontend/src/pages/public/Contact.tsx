import { useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'
import toast from 'react-hot-toast'

export function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Message sent successfully! We will get back to you soon.')
    setSubmitted(true)
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('contact')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond promptly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            {submitted ? (
              <div className="card text-center py-12">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-success text-3xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                <p className="text-gray-600">Your message has been received. We'll contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('full_name')}</label>
                  <input
                    className="input-field"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                  <input
                    type="email"
                    className="input-field"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('mobile_number')}</label>
                  <input
                    className="input-field"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    className="input-field h-32"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">1800 1234 5678</p>
              <p className="text-sm text-gray-500">Toll-free, 24/7</p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">support@sbi-sahaayak.in</p>
              <p className="text-sm text-gray-500">We reply within 24 hours</p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Office</h3>
              <p className="text-gray-600">State Bank of India, Corporate Centre</p>
              <p className="text-gray-500 text-sm">Madame Cama Road, Mumbai - 400021</p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Feedback</h3>
              <p className="text-gray-600 text-sm">
                Your feedback helps us improve. Share your experience using SBI Sahaayak.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
