from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..session import get_session, update_session
from ..recommender.rules import recommend

router = APIRouter()


class SubmitProfileRequest(BaseModel):
    session_id: str
    age_band: str
    profession: str
    area: str


class SubmitProfileResponse(BaseModel):
    session_id: str
    profile: dict
    recommendation: dict


@router.post("/profile/submit", response_model=SubmitProfileResponse)
def submit_profile(req: SubmitProfileRequest):
    session = get_session(req.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    profile = {"age_band": req.age_band, "profession": req.profession, "area": req.area}
    update_session(req.session_id, profile=profile, step="recommendation")
    product = recommend(profile)
    return SubmitProfileResponse(
        session_id=req.session_id,
        profile=profile,
        recommendation=product,
    )
