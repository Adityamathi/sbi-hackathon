const KYC_ITEMS = ["Aadhaar card", "PAN card", "Recent photo", "Address proof"]

export default function KYCChecklist({ onReady }) {
  return (
    <div className="screen">
      <div className="icon-circle">K</div>
      <h1>KYC Documents Required</h1>
      <p>Please keep these documents ready for account opening.</p>
      <div className="card">
        {KYC_ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 0",
              borderBottom: i < KYC_ITEMS.length - 1 ? "1px solid #eee" : "none",
            }}
          >
            <span style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid #003366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#003366" }}>
              {i + 1}
            </span>
            <span style={{ fontSize: "15px" }}>{item}</span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={onReady}>
        I have these ready
      </button>
    </div>
  )
}
