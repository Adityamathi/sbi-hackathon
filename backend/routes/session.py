from fastapi import APIRouter
from pydantic import BaseModel
from session import create_session, get_session

router = APIRouter()


class StartSessionRequest(BaseModel):
    language: str = "en"


class StartSessionResponse(BaseModel):
    session_id: str
    language: str
    message: str


@router.post("/session/start", response_model=StartSessionResponse)
def start_session(req: StartSessionRequest):
    session_id = create_session(req.language)
    return StartSessionResponse(
        session_id=session_id,
        language=req.language,
        message="Session started successfully",
    )
