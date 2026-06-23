export default function Welcome({ onStart }) {
  return (
    <div className="screen">
      <div className="icon-circle">S</div>
      <h1>SBI Sahaayak</h1>
      <p>Your multilingual AI assistant for SBI banking. Get onboarded digitally in your language.</p>
      <div className="card">
        <p style={{ fontSize: "14px", color: "#666" }}>
          I can help you open a savings account, explore SBI products, or start digital banking — all in English, Hindi, or Tamil.
        </p>
      </div>
      <button className="btn btn-primary" onClick={onStart}>
        Get Started
      </button>
    </div>
  )
}
