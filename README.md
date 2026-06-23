# SBI Sahaayak

A Multilingual Agentic AI for Customer Onboarding and Digital Adoption.

> Any new customer walks in speaking their language, walks out digitally onboarded.

## Architecture

```
Frontend (React + Vite) → FastAPI → Agent Core → Tools
                        ↕              ↕
                   Language Layer    Recommender Engine
                                    ↕
                              Mock SBI Adapter
```

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** FastAPI
- **Agent:** LangChain / OpenAI function calling
- **LLM:** Groq Llama-3.1-70B or GPT-4o
- **Deployment:** Vercel + Railway

## Phases

| Phase | Dates | Deliverable |
|-------|-------|-------------|
| 0 – Strategy Lock | Jun 16–17 | Decisions, MVP scope, repo |
| 1 – Architecture & Setup | Jun 18–19 | Backend + frontend skeleton |
| 2 – Frontend Build | Jun 20–22 | All screens |
| 3 – Backend & Agent Core | Jun 23–25 | Real endpoints, agent loop, recommender |
| 4 – Multilingual Layer | Jun 25–27 | i18n JSON files |
| 5 – Polish, Deploy & Submit | Jun 27–30 | Live demo, pitch deck, submission |

## Folder Structure

```
sbi-sahaayak/
├── frontend/          (React app)
├── backend/
│   ├── agent/         (LLM + tool calling)
│   ├── recommender/   (ML logic)
│   ├── i18n/          (language JSON files)
│   └── routes/        (API endpoints)
├── docs/              (architecture, pitch deck)
└── README.md
```
