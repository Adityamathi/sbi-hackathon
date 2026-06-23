from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..session import get_session
from ..agent.core import agent_respond

router = APIRouter()


class AgentRespondRequest(BaseModel):
    session_id: str
    message: str


class AgentRespondResponse(BaseModel):
    session_id: str
    response: str
    step: str
    language: str


@router.post("/agent/respond", response_model=AgentRespondResponse)
def agent_respond_endpoint(req: AgentRespondRequest):
    session = get_session(req.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    response = agent_respond(session, req.message)
    return AgentRespondResponse(
        session_id=req.session_id,
        response=response,
        step=session.get("step", "unknown"),
        language=session.get("language", "en"),
    )
