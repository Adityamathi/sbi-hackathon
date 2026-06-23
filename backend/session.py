import uuid
from typing import Optional

_sessions: dict[str, dict] = {}

def create_session(language: str = "en") -> str:
    session_id = str(uuid.uuid4())
    _sessions[session_id] = {
        "session_id": session_id,
        "language": language,
        "intent": None,
        "profile": {},
        "step": "welcome",
        "history": [],
    }
    return session_id

def get_session(session_id: str) -> Optional[dict]:
    return _sessions.get(session_id)

def update_session(session_id: str, **kwargs) -> Optional[dict]:
    session = _sessions.get(session_id)
    if session:
        session.update(kwargs)
    return session

def append_history(session_id: str, role: str, content: str):
    session = _sessions.get(session_id)
    if session:
        session["history"].append({"role": role, "content": content})
