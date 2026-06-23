import { t } from "../i18n"

const ACTIONS = [
  { id: "yono", labelKey: "digital_yono", descKey: "digital_yono_desc" },
  { id: "upi", labelKey: "digital_upi", descKey: "digital_upi_desc" },
  { id: "bill_pay", labelKey: "digital_bill", descKey: "digital_bill_desc" },
  { id: "balance_check", labelKey: "digital_balance", descKey: "digital_balance_desc" },
]

export default function DigitalNextSteps({ onDone, lang }) {
  return (
    <div className="screen">
      <div className="icon-circle">D</div>
      <h1>{t("digital_title", lang)}</h1>
      <p>{t("digital_desc", lang)}</p>
      {ACTIONS.map((action) => (
        <button key={action.id} className="btn btn-option">
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>{t(action.labelKey, lang)}</div>
          <div style={{ fontSize: "13px", color: "#666", fontWeight: 400 }}>{t(action.descKey, lang)}</div>
        </button>
      ))}
      <button className="btn btn-primary" onClick={onDone}>
        {t("digital_finish", lang)}
      </button>
    </div>
  )
}
