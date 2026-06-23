from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import get_db
from models import User
from auth import hash_password, verify_password, create_access_token, create_refresh_token

router = APIRouter(prefix="/api/auth", tags=["auth"])


class LoginRequest(BaseModel):
    mobile: str
    password: str


class SignupRequest(BaseModel):
    name: str
    mobile: str
    email: str
    password: str
    language: str = "en"


class SendOtpRequest(BaseModel):
    mobile: str


class VerifyOtpRequest(BaseModel):
    mobile: str
    otp: str


class ResetPasswordRequest(BaseModel):
    mobile: str
    otp: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    user_id: str
    name: str


# Simple in-memory OTP store (use Redis in production)
otp_store: dict = {}


@router.post("/signup")
def signup(req: SignupRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.mobile == req.mobile).first()
    if existing:
        raise HTTPException(status_code=400, detail="Mobile number already registered")
    user = User(
        name=req.name,
        mobile=req.mobile,
        email=req.email,
        password_hash=hash_password(req.password),
        language=req.language,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return TokenResponse(
        access_token=create_access_token({"sub": user.id}),
        refresh_token=create_refresh_token({"sub": user.id}),
        user_id=user.id,
        name=user.name,
    )


@router.post("/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.mobile == req.mobile).first()
    if not user or not verify_password(req.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return TokenResponse(
        access_token=create_access_token({"sub": user.id}),
        refresh_token=create_refresh_token({"sub": user.id}),
        user_id=user.id,
        name=user.name,
    )


@router.post("/send-otp")
def send_otp(req: SendOtpRequest):
    # In production, integrate with SMS gateway
    otp = "123456"
    otp_store[req.mobile] = otp
    return {"message": f"OTP sent to {req.mobile}", "otp": otp}


@router.post("/verify-otp")
def verify_otp(req: VerifyOtpRequest, db: Session = Depends(get_db)):
    stored = otp_store.get(req.mobile)
    if not stored:
        raise HTTPException(status_code=400, detail="No OTP requested")
    if stored != req.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    otp_store.pop(req.mobile, None)
    user = db.query(User).filter(User.mobile == req.mobile).first()
    if not user:
        # Auto-create user for OTP login
        user = User(
            name="User",
            mobile=req.mobile,
            email=f"{req.mobile}@sbi-sahaayak.in",
            password_hash=hash_password("welcome"),
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return TokenResponse(
        access_token=create_access_token({"sub": user.id}),
        refresh_token=create_refresh_token({"sub": user.id}),
        user_id=user.id,
        name=user.name,
    )


@router.post("/reset-password")
def reset_password(req: ResetPasswordRequest, db: Session = Depends(get_db)):
    stored = otp_store.get(req.mobile)
    if not stored or stored != req.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    otp_store.pop(req.mobile, None)
    user = db.query(User).filter(User.mobile == req.mobile).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.password_hash = hash_password(req.password)
    db.commit()
    return {"message": "Password reset successfully"}


@router.post("/refresh")
def refresh_token(refresh_token: str):
    from auth import decode_token, create_access_token
    payload = decode_token(refresh_token)
    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    return {"access_token": create_access_token({"sub": payload["sub"]})}
