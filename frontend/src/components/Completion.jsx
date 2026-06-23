import { t } from "../i18n"

export default function Completion({ onRestart, lang }) {
  return (
    <div className="screen" style={{ textAlign: "center", alignItems: "center" }}>
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "#00a86b",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "36px",
          marginBottom: "16px",
        }}
      >
        ✓
      </div>
      <h1>{t("complete_title", lang)}</h1>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
        {t("complete_desc", lang)}
      </p>
      <div className="card" style={{ width: "100%", textAlign: "left" }}>
        <p style={{ fontWeight: 600, marginBottom: "8px" }}>{t("complete_next_title", lang)}</p>
        <ul style={{ paddingLeft: "20px", color: "#555", fontSize: "14px", lineHeight: "1.8" }}>
          <li>{t("complete_next_1", lang)}</li>
          <li>{t("complete_next_2", lang)}</li>
          <li>{t("complete_next_3", lang)}</li>
          <li>{t("complete_next_4", lang)}</li>
        </ul>
      </div>
      <button className="btn btn-secondary" onClick={onRestart}>
        {t("complete_restart", lang)}
      </button>
    </div>
  )
}
