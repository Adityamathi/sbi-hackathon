export default function ProductRecommendation({ product, onAccept, onChangeProfile }) {
  return (
    <div className="screen">
      <div className="icon-circle">P</div>
      <h1>Recommended Product</h1>
      <p>Based on your profile, we recommend the following SBI product for you.</p>
      <div className="card" style={{ borderLeft: "4px solid #003366" }}>
        <h2 style={{ color: "#003366", marginBottom: "8px" }}>
          {product?.name || "SBI Digital Savings Account"}
        </h2>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "12px" }}>
          {product?.description || "Zero-balance digital savings account with YONO integration"}
        </p>
      </div>
      <button className="btn btn-primary" onClick={onAccept}>
        Proceed to KYC
      </button>
      <button className="btn btn-secondary" onClick={onChangeProfile}>
        Update my profile
      </button>
    </div>
  )
}
