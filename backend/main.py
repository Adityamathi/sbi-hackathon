import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from database import init_db
from routes.session import router as session_router
from routes.intent import router as intent_router
from routes.profile import router as profile_router
from routes.agent import router as agent_router
from routes.auth import router as auth_router
from routes.dashboard import router as dashboard_router

app = FastAPI(
    title="SBI Sahaayak API",
    description="Multilingual Agentic AI for Customer Onboarding and Digital Banking Adoption",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(session_router, prefix="/api")
app.include_router(intent_router, prefix="/api")
app.include_router(profile_router, prefix="/api")
app.include_router(agent_router, prefix="/api")
app.include_router(auth_router)
app.include_router(dashboard_router)


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "sbi-sahaayak", "version": "2.0.0"}


@app.on_event("startup")
def on_startup():
    try:
        init_db()
    except Exception as e:
        print(f"Database init skipped (no DB?): {e}")


# Serve frontend static files
static_dir = os.path.join(os.path.dirname(__file__), "static")


@app.get("/{path:path}")
def serve_frontend(path: str):
    if path.startswith("api/") or path == "api/health" or not path:
        index_path = os.path.join(static_dir, "index.html")
        if os.path.isfile(index_path):
            return FileResponse(index_path)
        return {"error": "Not found"}, 404
    file_path = os.path.join(static_dir, path)
    if os.path.isfile(file_path):
        return FileResponse(file_path)
    index_path = os.path.join(static_dir, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path)
    return {"error": "Not found"}, 404
