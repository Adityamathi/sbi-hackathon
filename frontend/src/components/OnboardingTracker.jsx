import { useState } from "react"
import { t } from "../i18n"

const STEP_KEYS = ["onboard_verify", "onboard_pan", "onboard_selfie", "onboard_mpin", "onboard_yono"]

export default function OnboardingTracker({ onComplete, lang }) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < STEP_KEYS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="screen">
      <div className="icon-circle">O</div>
      <h1>{t("onboard_title", lang)}</h1>
      <p>{t("onboard_desc", lang)}</p>
      <div className="card">
        {STEP_KEYS.map((key, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 0",
              borderBottom: i < STEP_KEYS.length - 1 ? "1px solid #eee" : "none",
              opacity: i <= currentStep ? 1 : 0.4,
            }}
          >
            <span
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: i < currentStep ? "#00a86b" : i === currentStep ? "#003366" : "#e0e0e0",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              {i < currentStep ? "✓" : i + 1}
            </span>
            <span style={{ fontSize: "15px", fontWeight: i === currentStep ? 600 : 400 }}>
              {t(key, lang)}
            </span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={handleNext}>
        {currentStep < STEP_KEYS.length - 1 ? t("onboard_next", lang) : t("onboard_complete", lang)}
      </button>
    </div>
  )
}
