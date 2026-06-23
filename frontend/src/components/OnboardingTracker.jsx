import { useState } from "react"

const STEPS = [
  "Verify Aadhaar",
  "Submit PAN",
  "Take selfie",
  "Set MPIN",
  "Activate YONO",
]

export default function OnboardingTracker({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="screen">
      <div className="icon-circle">O</div>
      <h1>Onboarding Progress</h1>
      <p>Follow these steps to complete your account setup.</p>
      <div className="card">
        {STEPS.map((step, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 0",
              borderBottom: i < STEPS.length - 1 ? "1px solid #eee" : "none",
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
              {step}
            </span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={handleNext}>
        {currentStep < STEPS.length - 1 ? "Next Step" : "Complete"}
      </button>
    </div>
  )
}
