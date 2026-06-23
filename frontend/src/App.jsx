import { useState } from "react"
import { t } from "./i18n"
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

const API_BASE = ""

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

  const startSession = async (lang) => {
    setLanguage(lang)
    try {
      const res = await fetch(`${API_BASE}/api/session/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: lang }),
      })
      const data = await res.json()
      setSessionId(data.session_id)
      setScreen(SCREENS.INTENT)
    } catch (e) {
      console.error("Failed to start session", e)
    }
  }

  const goTo = (nextScreen) => setScreen(nextScreen)

  return (
    <div className="app">
      <header className="app-header">
        <div className="sbi-branding">
          <span className="sbi-title">{t("sbi_title", language)}</span>
        </div>
      </header>
      <main className="app-main">
        {screen === SCREENS.WELCOME && (
          <Welcome onStart={() => goTo(SCREENS.LANGUAGE)} lang={language} />
        )}
        {screen === SCREENS.LANGUAGE && (
          <LanguageSelector
            selected={language}
            onSelect={startSession}
          />
        )}
        {screen === SCREENS.INTENT && (
          <IntentSelector
            onSelect={(selectedIntent) => {
              setIntent(selectedIntent)
              goTo(SCREENS.PROFILE)
            }}
            lang={language}
          />
        )}
        {screen === SCREENS.PROFILE && (
          <ProfileQA
            onSubmit={(p) => {
              setProfile(p)
              goTo(SCREENS.RECOMMENDATION)
            }}
            lang={language}
          />
        )}
        {screen === SCREENS.RECOMMENDATION && (
          <ProductRecommendation
            product={product}
            onAccept={() => goTo(SCREENS.KYC)}
            onChangeProfile={() => goTo(SCREENS.PROFILE)}
            lang={language}
          />
        )}
        {screen === SCREENS.KYC && (
          <KYCChecklist onReady={() => goTo(SCREENS.ONBOARDING)} lang={language} />
        )}
        {screen === SCREENS.ONBOARDING && (
          <OnboardingTracker onComplete={() => goTo(SCREENS.DIGITAL)} lang={language} />
        )}
        {screen === SCREENS.DIGITAL && (
          <DigitalNextSteps onDone={() => goTo(SCREENS.COMPLETION)} lang={language} />
        )}
        {screen === SCREENS.COMPLETION && (
          <Completion onRestart={() => { setSessionId(null); goTo(SCREENS.WELCOME) }} lang={language} />
        )}
        {screen === SCREENS.CHAT && sessionId && (
          <ChatInterface
            sessionId={sessionId}
            language={language}
            apiBase=""
          />
        )}
      </main>
    </div>
  )
}

export default App
