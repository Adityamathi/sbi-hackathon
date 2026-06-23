const ACTIONS = [
  { id: "yono", label: "Set up YONO app", desc: "Manage your account on your phone" },
  { id: "upi", label: "Enable UPI payments", desc: "Send and receive money instantly" },
  { id: "bill_pay", label: "Set up bill payments", desc: "Pay utilities automatically" },
  { id: "balance_check", label: "Balance check", desc: "Check your balance anytime" },
]

export default function DigitalNextSteps({ onDone }) {
  return (
    <div className="screen">
      <div className="icon-circle">D</div>
      <h1>Go Digital with SBI</h1>
      <p>Your account is ready! Here are digital actions you can take now.</p>
      {ACTIONS.map((action) => (
        <button key={action.id} className="btn btn-option">
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>{action.label}</div>
          <div style={{ fontSize: "13px", color: "#666", fontWeight: 400 }}>{action.desc}</div>
        </button>
      ))}
      <button className="btn btn-primary" onClick={onDone}>
        Finish
      </button>
    </div>
  )
}
