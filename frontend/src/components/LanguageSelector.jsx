const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
]

export default function LanguageSelector({ selected, onSelect }) {
  return (
    <div className="screen">
      <h1>Choose your language</h1>
      <p>Select your preferred language for the onboarding experience.</p>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          className={`btn btn-option ${selected === lang.code ? "selected" : ""}`}
          onClick={() => onSelect(lang.code)}
          style={selected === lang.code ? { borderColor: "#003366", background: "#e0ebff" } : {}}
        >
          <span style={{ fontSize: "24px", marginRight: "12px" }}>{lang.flag}</span>
          {lang.label}
        </button>
      ))}
    </div>
  )
}
