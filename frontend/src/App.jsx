import { useState, useEffect } from "react"
import Welcome from "./components/Welcome"
import LanguageSelector from "./components/LanguageSelector"
import IntentSelector from "./components/IntentSelector"
import ProfileQA from "./components/ProfileQA"
import ProductRecommendation from "./components/ProductRecommendation"
import KYCChecklist from "./components/KYCChecklist"
import OnboardingTracker from "./components/OnboardingTracker"
import DigitalNextSteps from "./components/DigitalNextSteps"
import Completion from "./components/Completion"
import ChatInterface from "./components/ChatInterface"
import "./App.css"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000"

const SCREENS = {
  WELCOME: "welcome",
  LANGUAGE: "language",
  INTENT: "intent",
  PROFILE: "profile",
  RECOMMENDATION: "recommendation",
  KYC: "kyc",
  ONBOARDING: "onboarding",
  DIGITAL: "digital",
  COMPLETION: "completion",
  CHAT: "chat",
}

function App() {
  const [screen, setScreen] = useState(SCREENS.WELCOME)
  const [sessionId, setSessionId] = useState(null)
  const [language, setLanguage] = useState("en")
  const [intent, setIntent] = useState(null)
  const [profile, setProfile] = useState({})
  const [product, setProduct] = useState(null)

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch(`${API_BASE}/session/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language }),
        })
        const data = await res.json()
        setSessionId(data.session_id)
      } catch (e) {
        console.error("Failed to start session", e)
      }
    }
    init()
  }, [])

  const goTo = (nextScreen) => setScreen(nextScreen)

  return (
    <div className="app">
      <header className="app-header">
        <div className="sbi-branding">
          <img src="/sbi-logo.png" alt="SBI" className="sbi-logo" />
          <span className="sbi-title">SBI Sahaayak</span>
        </div>
      </header>
      <main className="app-main">
        {screen === SCREENS.WELCOME && (
          <Welcome onStart={() => goTo(SCREENS.LANGUAGE)} />
        )}
        {screen === SCREENS.LANGUAGE && (
          <LanguageSelector
            selected={language}
            onSelect={(lang) => {
              setLanguage(lang)
              goTo(SCREENS.INTENT)
            }}
          />
        )}
        {screen === SCREENS.INTENT && (
          <IntentSelector
            onSelect={(selectedIntent) => {
              setIntent(selectedIntent)
              goTo(SCREENS.PROFILE)
            }}
          />
        )}
        {screen === SCREENS.PROFILE && (
          <ProfileQA
            onSubmit={(p) => {
              setProfile(p)
              goTo(SCREENS.RECOMMENDATION)
            }}
          />
        )}
        {screen === SCREENS.RECOMMENDATION && (
          <ProductRecommendation
            product={product}
            onAccept={() => goTo(SCREENS.KYC)}
            onChangeProfile={() => goTo(SCREENS.PROFILE)}
          />
        )}
        {screen === SCREENS.KYC && (
          <KYCChecklist onReady={() => goTo(SCREENS.ONBOARDING)} />
        )}
        {screen === SCREENS.ONBOARDING && (
          <OnboardingTracker onComplete={() => goTo(SCREENS.DIGITAL)} />
        )}
        {screen === SCREENS.DIGITAL && (
          <DigitalNextSteps onDone={() => goTo(SCREENS.COMPLETION)} />
        )}
        {screen === SCREENS.COMPLETION && (
          <Completion onRestart={() => goTo(SCREENS.WELCOME)} />
        )}
        {screen === SCREENS.CHAT && sessionId && (
          <ChatInterface
            sessionId={sessionId}
            language={language}
            apiBase={API_BASE}
          />
        )}
      </main>
    </div>
  )
}

export default App
