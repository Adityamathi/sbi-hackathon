from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.session import router as session_router
from .routes.intent import router as intent_router
from .routes.profile import router as profile_router
from .routes.agent import router as agent_router

app = FastAPI(
    title="SBI Sahaayak API",
    description="Multilingual Agentic AI for Customer Onboarding and Digital Adoption",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(session_router)
app.include_router(intent_router)
app.include_router(profile_router)
app.include_router(agent_router)


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "sbi-sahaayak"}
