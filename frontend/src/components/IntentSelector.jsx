const INTENTS = [
  { id: "open_account", label: "Open a savings account", desc: "Start your banking journey with SBI" },
  { id: "explore_products", label: "Explore SBI products", desc: "Learn about accounts, schemes and more" },
  { id: "start_digital_banking", label: "Start digital banking", desc: "Set up YONO, UPI and mobile banking" },
]

export default function IntentSelector({ onSelect }) {
  return (
    <div className="screen">
      <h1>What would you like to do?</h1>
      <p>Choose an option to get started with your SBI banking journey.</p>
      {INTENTS.map((intent) => (
        <button
          key={intent.id}
          className="btn btn-option"
          onClick={() => onSelect(intent.id)}
        >
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>{intent.label}</div>
          <div style={{ fontSize: "13px", color: "#666", fontWeight: 400 }}>{intent.desc}</div>
        </button>
      ))}
    </div>
  )
}
