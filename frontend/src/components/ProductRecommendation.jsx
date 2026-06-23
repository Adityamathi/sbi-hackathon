import { t } from "../i18n"

export default function ProductRecommendation({ product, onAccept, onChangeProfile, lang }) {
  return (
    <div className="screen">
      <div className="icon-circle">P</div>
      <h1>{t("product_title", lang)}</h1>
      <p>{t("product_desc", lang)}</p>
      <div className="card" style={{ borderLeft: "4px solid #003366" }}>
        <h2 style={{ color: "#003366", marginBottom: "8px" }}>
          {product?.name || "SBI Digital Savings Account"}
        </h2>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "12px" }}>
          {product?.description || "Zero-balance digital savings account with YONO integration"}
        </p>
      </div>
      <button className="btn btn-primary" onClick={onAccept}>
        {t("product_accept", lang)}
      </button>
      <button className="btn btn-secondary" onClick={onChangeProfile}>
        {t("product_update", lang)}
      </button>
    </div>
  )
}
