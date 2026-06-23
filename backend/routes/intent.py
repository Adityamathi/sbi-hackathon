from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from session import get_session, update_session

router = APIRouter()


class CaptureIntentRequest(BaseModel):
    session_id: str
    intent: str


class CaptureIntentResponse(BaseModel):
    session_id: str
    intent: str
    message: str


@router.post("/intent/capture", response_model=CaptureIntentResponse)
def capture_intent(req: CaptureIntentRequest):
    session = get_session(req.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    update_session(req.session_id, intent=req.intent, step="profile")
    return CaptureIntentResponse(
        session_id=req.session_id,
        intent=req.intent,
        message=f"Intent '{req.intent}' captured",
    )
