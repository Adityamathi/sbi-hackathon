import { t } from "../i18n"

const KYC_KEYS = ["kyc_aadhaar", "kyc_pan", "kyc_photo", "kyc_address"]

export default function KYCChecklist({ onReady, lang }) {
  return (
    <div className="screen">
      <div className="icon-circle">K</div>
      <h1>{t("kyc_title", lang)}</h1>
      <p>{t("kyc_desc", lang)}</p>
      <div className="card">
        {KYC_KEYS.map((key, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 0",
              borderBottom: i < KYC_KEYS.length - 1 ? "1px solid #eee" : "none",
            }}
          >
            <span style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid #003366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#003366" }}>
              {i + 1}
            </span>
            <span style={{ fontSize: "15px" }}>{t(key, lang)}</span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={onReady}>
        {t("kyc_btn", lang)}
      </button>
    </div>
  )
}
