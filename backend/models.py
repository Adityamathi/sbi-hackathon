import uuid
from datetime import datetime, timedelta, timezone
from sqlalchemy import Column, String, Boolean, Integer, Float, DateTime, JSON, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    mobile = Column(String(20), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=True)
    password_hash = Column(String(200), nullable=False)
    language = Column(String(10), default="en")
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    profiles = relationship("Profile", back_populates="user", uselist=False)
    sessions = relationship("Session", back_populates="user")


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    age_band = Column(String(20))
    gender = Column(String(20))
    occupation = Column(String(50))
    income_range = Column(String(20))
    location = Column(String(100))
    area = Column(String(20))
    digital_literacy = Column(String(20))
    profile_completion = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="profiles")


class Session(Base):
    __tablename__ = "sessions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    language = Column(String(10), default="en")
    intent = Column(String(50))
    current_step = Column(String(50), default="language")
    profile_data = Column(JSON)
    recommendation = Column(JSON)
    kyc_status = Column(JSON)
    history = Column(JSON, default=list)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="sessions")
    messages = relationship("Message", back_populates="session")


class Message(Base):
    __tablename__ = "messages"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String, ForeignKey("sessions.id"), nullable=False)
    role = Column(String(20))
    content = Column(Text)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    session = relationship("Session", back_populates="messages")


class KYC(Base):
    __tablename__ = "kyc_records"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    aadhaar = Column(Boolean, default=False)
    pan = Column(Boolean, default=False)
    photo = Column(Boolean, default=False)
    address_proof = Column(Boolean, default=False)
    status = Column(String(20), default="pending")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class Feedback(Base):
    __tablename__ = "feedbacks"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    session_id = Column(String, ForeignKey("sessions.id"), nullable=True)
    rating = Column(Integer)
    comment = Column(Text)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    action = Column(String(100))
    details = Column(JSON)
    ip_address = Column(String(50))
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
