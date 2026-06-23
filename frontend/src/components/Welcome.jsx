import { t } from "../i18n"

export default function Welcome({ onStart, lang }) {
  return (
    <div className="screen">
      <div className="icon-circle">S</div>
      <h1>{t("welcome_title", lang)}</h1>
      <p>{t("welcome_desc", lang)}</p>
      <div className="card">
        <p style={{ fontSize: "14px", color: "#666" }}>
          {t("welcome_card", lang)}
        </p>
      </div>
      <button className="btn btn-primary" onClick={onStart}>
        {t("welcome_btn", lang)}
      </button>
    </div>
  )
}
