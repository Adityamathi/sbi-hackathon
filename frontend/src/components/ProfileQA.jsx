import { useState } from "react"
import { t } from "../i18n"

const AGE_BANDS = [
  { value: "under_25", key: "profile_age_under25" },
  { value: "25_45", key: "profile_age_25_45" },
  { value: "45_plus", key: "profile_age_45plus" },
]

const PROFESSIONS = [
  { value: "student", key: "profile_prof_student" },
  { value: "salaried", key: "profile_prof_salaried" },
  { value: "self_employed", key: "profile_prof_self" },
  { value: "farmer", key: "profile_prof_farmer" },
  { value: "retired", key: "profile_prof_retired" },
  { value: "other", key: "profile_prof_other" },
]

const AREAS = [
  { value: "urban", key: "profile_area_urban" },
  { value: "semi_urban", key: "profile_area_semi" },
  { value: "rural", key: "profile_area_rural" },
]

export default function ProfileQA({ onSubmit, lang }) {
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState({})

  const questions = [
    { titleKey: "profile_age", key: "age_band", options: AGE_BANDS },
    { titleKey: "profile_profession", key: "profession", options: PROFESSIONS },
    { titleKey: "profile_area", key: "area", options: AREAS },
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
      <h2>{t(current.titleKey, lang)}</h2>
      <p style={{ fontSize: "14px", color: "#888", marginBottom: "8px" }}>
        {t("profile_q_of", lang)} {step + 1} {t("profile_of", lang)} {questions.length}
      </p>
      {current.options.map((opt) => (
        <button
          key={opt.value}
          className="btn btn-option"
          onClick={() => handleSelect(opt.value)}
        >
          {t(opt.key, lang)}
        </button>
      ))}
    </div>
  )
}
