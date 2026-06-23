import { t } from "../i18n"

const INTENTS = [
  { id: "open_account", labelKey: "intent_open", descKey: "intent_open_desc" },
  { id: "explore_products", labelKey: "intent_explore", descKey: "intent_explore_desc" },
  { id: "start_digital_banking", labelKey: "intent_digital", descKey: "intent_digital_desc" },
]

export default function IntentSelector({ onSelect, lang }) {
  return (
    <div className="screen">
      <h1>{t("intent_title", lang)}</h1>
      <p>{t("intent_desc", lang)}</p>
      {INTENTS.map((intent) => (
        <button
          key={intent.id}
          className="btn btn-option"
          onClick={() => onSelect(intent.id)}
        >
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>{t(intent.labelKey, lang)}</div>
          <div style={{ fontSize: "13px", color: "#666", fontWeight: 400 }}>{t(intent.descKey, lang)}</div>
        </button>
      ))}
    </div>
  )
}
