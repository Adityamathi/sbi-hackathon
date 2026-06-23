export default function Completion({ onRestart }) {
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
      <h1>Welcome to SBI!</h1>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
        You are now digitally onboarded with State Bank of India. You can manage your account anytime via the YONO app.
      </p>
      <div className="card" style={{ width: "100%", textAlign: "left" }}>
        <p style={{ fontWeight: 600, marginBottom: "8px" }}>What you can do next:</p>
        <ul style={{ paddingLeft: "20px", color: "#555", fontSize: "14px", lineHeight: "1.8" }}>
          <li>Download YONO from Play Store / App Store</li>
          <li>Log in with your registered mobile number</li>
          <li>Check balance, transfer funds, pay bills</li>
          <li>Visit your nearest branch for assistance</li>
        </ul>
      </div>
      <button className="btn btn-secondary" onClick={onRestart}>
        Start over
      </button>
    </div>
  )
}
