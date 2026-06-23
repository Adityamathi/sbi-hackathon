import { useState } from "react"

const AGE_BANDS = [
  { value: "under_25", label: "Under 25" },
  { value: "25_45", label: "25 to 45" },
  { value: "45_plus", label: "Above 45" },
]

const PROFESSIONS = [
  { value: "student", label: "Student" },
  { value: "salaried", label: "Salaried employee" },
  { value: "self_employed", label: "Self-employed" },
  { value: "farmer", label: "Farmer" },
  { value: "retired", label: "Retired" },
  { value: "other", label: "Other" },
]

const AREAS = [
  { value: "urban", label: "Urban" },
  { value: "semi_urban", label: "Semi-urban" },
  { value: "rural", label: "Rural" },
]

export default function ProfileQA({ onSubmit }) {
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState({})

  const questions = [
    {
      title: "What is your age group?",
      key: "age_band",
      options: AGE_BANDS,
    },
    {
      title: "What is your profession?",
      key: "profession",
      options: PROFESSIONS,
    },
    {
      title: "Which area do you live in?",
      key: "area",
      options: AREAS,
    },
  ]

  const current = questions[step]

  const handleSelect = (value) => {
    const updated = { ...profile, [current.key]: value }
    setProfile(updated)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      onSubmit(updated)
    }
  }

  return (
    <div className="screen">
      <div className="progress-bar">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`progress-step ${i <= step ? (i < step ? "completed" : "active") : ""}`}
          />
        ))}
      </div>
      <h2>{current.title}</h2>
      <p style={{ fontSize: "14px", color: "#888", marginBottom: "8px" }}>
        Question {step + 1} of {questions.length}
      </p>
      {current.options.map((opt) => (
        <button
          key={opt.value}
          className="btn btn-option"
          onClick={() => handleSelect(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
