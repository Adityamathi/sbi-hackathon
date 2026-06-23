import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from routes.session import router as session_router
from routes.intent import router as intent_router
from routes.profile import router as profile_router
from routes.agent import router as agent_router

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

app.include_router(session_router, prefix="/api")
app.include_router(intent_router, prefix="/api")
app.include_router(profile_router, prefix="/api")
app.include_router(agent_router, prefix="/api")


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "sbi-sahaayak"}


static_dir = os.path.join(os.path.dirname(__file__), "static")


@app.get("/{path:path}")
def serve_frontend(path: str):
    file_path = os.path.join(static_dir, path)
    if os.path.isfile(file_path):
        return FileResponse(file_path)
    index_path = os.path.join(static_dir, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path)
    return {"error": "Not found"}, 404
