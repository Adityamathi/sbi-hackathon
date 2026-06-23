import { useState } from "react"
import { t } from "../i18n"

export default function ChatInterface({ sessionId, language, apiBase }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your SBI assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMsg }])
    setLoading(true)

    try {
      const res = await fetch(`${apiBase}/api/agent/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: userMsg }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }])
    }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="screen" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <h2 style={{ marginBottom: "16px" }}>{t("chat_title", language)}</h2>
      <div
        className="card"
        style={{
          flex: 1,
          minHeight: "300px",
          maxHeight: "400px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#003366" : "#f0f0f0",
              color: msg.role === "user" ? "#fff" : "#333",
              padding: "10px 14px",
              borderRadius: "12px",
              maxWidth: "80%",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: "flex-start", color: "#888", fontSize: "14px" }}>
            {t("chat_typing", language)}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("chat_placeholder", language)}
          rows={2}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "14px",
            resize: "none",
            fontFamily: "inherit",
          }}
        />
        <button
          className="btn btn-primary"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{ width: "auto", padding: "10px 20px", alignSelf: "flex-end" }}
        >
          {t("chat_send", language)}
        </button>
      </div>
    </div>
  )
}
