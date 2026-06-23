from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import User, Profile, KYC, Feedback
from auth import get_current_user_id

router = APIRouter(prefix="/api", tags=["dashboard"])


@router.get("/dashboard")
def get_dashboard(user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    kyc = db.query(KYC).filter(KYC.user_id == user_id).first()

    profile_completion = 0
    if profile:
        fields = [profile.age_band, profile.gender, profile.occupation,
                  profile.income_range, profile.location]
        profile_completion = sum(1 for f in fields if f) * 20

    kyc_completion = 0
    if kyc:
        kyc_fields = [kyc.aadhaar, kyc.pan, kyc.photo, kyc.address_proof]
        kyc_completion = sum(1 for f in kyc_fields if f) * 25

    return {
        "name": user.name if user else "Customer",
        "language": user.language if user else "en",
        "profile_completion": profile_completion,
        "kyc_completion": kyc_completion,
        "digital_adoption_score": min(profile_completion + kyc_completion, 100),
        "quick_actions": [
            {"label": "Open Account", "icon": "HiPlusCircle", "path": "/onboarding/language"},
            {"label": "Check KYC", "icon": "HiDocumentText", "path": "/onboarding/kyc"},
            {"label": "Explore Products", "icon": "HiCube", "path": "/onboarding/recommendation"},
            {"label": "Activate YONO", "icon": "HiDeviceMobile", "path": "/onboarding/yono"},
            {"label": "Learn Digital Banking", "icon": "HiAcademicCap", "path": "/onboarding/intent"},
            {"label": "Get AI Help", "icon": "HiChatAlt2", "path": "/onboarding/intent"},
        ],
    }


@router.get("/products")
def get_products():
    return {
        "products": [
            {
                "id": "digital_savings",
                "name": "Digital Savings Account",
                "description": "Zero balance digital account with full banking access",
                "benefits": ["Zero balance", "Free debit card", "UPI & mobile banking"],
                "eligibility": ["18+ years", "Valid Aadhaar & PAN"],
            },
            {
                "id": "salary_account",
                "name": "Salary Account",
                "description": "Premium salary account with exclusive benefits",
                "benefits": ["Higher ATM limits", "Free transfers", "Credit card offers"],
                "eligibility": ["Employed", "Valid Aadhaar & PAN", "Age 21-60"],
            },
            {
                "id": "basic_savings",
                "name": "Basic Savings Bank Deposit Account",
                "description": "Simple savings account with passbook facility",
                "benefits": ["Passbook facility", "No minimum balance", "Basic banking"],
                "eligibility": ["All individuals", "Valid ID proof"],
            },
            {
                "id": "senior_savings",
                "name": "Senior Citizen Savings Account",
                "description": "Special savings account with higher interest rates",
                "benefits": ["Higher interest", "Priority banking", "Doorstep service"],
                "eligibility": ["60+ years", "Valid Aadhaar & PAN"],
            },
            {
                "id": "kisan_card",
                "name": "Kisan Credit Card",
                "description": "Credit facility for farmers with flexible repayment",
                "benefits": ["Flexible credit", "Low interest", "Insurance cover"],
                "eligibility": ["Farmer", "Land records", "Kisan beneficiary"],
            },
        ]
    }


@router.post("/feedback")
def submit_feedback(
    session_id: str,
    rating: int,
    comment: str = "",
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    feedback = Feedback(user_id=user_id, session_id=session_id, rating=rating, comment=comment)
    db.add(feedback)
    db.commit()
    return {"message": "Feedback submitted", "rating": rating}


@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
    total_users = db.query(User).count()
    total_kyc = db.query(KYC).count()
    completed_kyc = db.query(KYC).filter(KYC.status == "completed").count()
    feedbacks = db.query(Feedback).all()
    avg_rating = sum(f.rating for f in feedbacks) / len(feedbacks) if feedbacks else 0

    return {
        "total_users": total_users,
        "kyc_completion_rate": round((completed_kyc / total_kyc * 100) if total_kyc else 0),
        "average_rating": round(avg_rating, 1),
        "total_feedback": len(feedbacks),
    }
