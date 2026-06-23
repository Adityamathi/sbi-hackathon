import { useState, useRef, useEffect } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { useAppStore } from '../store/appStore'
import { api } from '../services/api'
import { HiChatAlt2, HiX, HiMicrophone, HiVolumeUp, HiPaperAirplane } from 'react-icons/hi'
import type { Message } from '../types'

const suggestedQueries = [
  'How do I open an account?',
  'What documents do I need for KYC?',
  'How do I activate YONO?',
  'What is UPI and how does it work?',
  'Tell me about SBI savings accounts',
]

export function AiAssistant() {
  const { t, language } = useTranslation()
  const sessionId = useAppStore((s) => s.sessionId)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', content: 'Hello! I\'m your SBI assistant. How can I help you today?', timestamp: Date.now() },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text?: string) => {
    const msg = (text || input).trim()
    if (!msg) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: msg, timestamp: Date.now() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      let response: string
      if (sessionId) {
        const data = await api.agentRespond(sessionId, msg)
        response = data.response
      } else {
        response = getLocalResponse(msg)
      }
      const agentMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: Date.now() }
      setMessages((prev) => [...prev, agentMsg])
    } catch {
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: getLocalResponse(msg), timestamp: Date.now() }])
    } finally {
      setLoading(false)
    }
  }

  const toggleVoice = () => {
    if (!isListening) {
      setIsListening(true)
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-IN'
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          setIsListening(false)
        }
        recognition.onerror = () => setIsListening(false)
        recognition.start()
      } else {
        setIsListening(false)
      }
    } else {
      setIsListening(false)
    }
  }

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-IN'
    speechSynthesis.speak(utterance)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-assistant shadow-xl hover:scale-105 active:scale-95"
      >
        {isOpen ? <HiX size={24} /> : <HiChatAlt2 size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col max-h-[600px]">
          <div className="bg-sbi-500 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="font-semibold">{t('ai_assistant')}</span>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <HiX size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[400px]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-sbi-500 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  <p>{msg.content}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] opacity-60">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.role === 'assistant' && (
                      <button onClick={() => speakText(msg.content)} className="opacity-60 hover:opacity-100">
                        <HiVolumeUp size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {messages.length === 1 && !loading && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">{t('suggested')}:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-xs bg-gray-100 hover:bg-sbi-50 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleVoice}
                className={`p-2 rounded-xl transition-colors ${isListening ? 'bg-danger text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <HiMicrophone size={18} />
              </button>
              <input
                className="input-field flex-1"
                placeholder={isListening ? t('listening') : t('type_message')}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={() => handleSend()}
                className="p-2 bg-sbi-500 text-white rounded-xl hover:bg-sbi-600 transition-colors"
                disabled={!input.trim() || loading}
              >
                <HiPaperAirplane size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function getLocalResponse(msg: string): string {
  const lower = msg.toLowerCase()
  if (lower.includes('account') && lower.includes('open')) {
    return 'To open an SBI account, you need: 1) Aadhaar card, 2) PAN card, 3) Passport-size photo, 4) Address proof. You can start the process by clicking "Get Started" on the home page!'
  }
  if (lower.includes('kyc') || lower.includes('document')) {
    return 'For KYC verification, you need: Aadhaar Card, PAN Card, Passport-size photo, and Address proof. You can upload these in the KYC section of your dashboard.'
  }
  if (lower.includes('yono')) {
    return 'YONO is SBI\'s mobile banking app. Download it from Play Store/App Store, register with your account number and mobile, and set up your MPIN. I can guide you through each step!'
  }
  if (lower.includes('upi')) {
    return 'UPI (Unified Payments Interface) lets you send/receive money instantly using your mobile. Set up UPI through YONO app. You\'ll need your debit card to create a UPI PIN.'
  }
  if (lower.includes('saving') || lower.includes('account')) {
    return 'SBI offers several savings accounts: Digital Savings (zero balance), Basic Savings (with passbook), and Salary Accounts. Based on your profile, I can recommend the best one!'
  }
  return 'I understand you need help. Could you please provide more details so I can assist you better? You can also start the guided onboarding process from your dashboard.'
}
