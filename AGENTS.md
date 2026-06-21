# AGENTS.md

## Working Directory
Before running any command, always `cd /media/tm23/NewVolume/playing_aws` and activate the venv with `source backend/.venv/bin/activate` when working in the backend.

## Project Context
Building a todo list application with:
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL via async SQLAlchemy + asyncpg
- **ORM:** SQLAlchemy async (not psycopg2)
- **Infrastructure:** AWS EC2 (key: `tms-key-pair.pem`)

## Standards
- Use async/await patterns with FastAPI routes
- Use SQLAlchemy async session for all DB operations
- Use Pydantic v2 for request/response schemas
- Follow RESTful API conventions (plural endpoints, proper HTTP verbs)
- Use Alembic for database migrations

## Common Commands
```bash
# Activate backend venv
source backend/.venv/bin/activate

# Run the dev server (local, no Docker)
uvicorn app.main:app --reload

# Run migrations (from backend/)
alembic upgrade head

# Generate a migration (from backend/)
alembic revision --autogenerate -m "description"

# Docker - build images
docker build -t todo-backend ./backend
docker build -t todo-frontend ./frontend

# Docker - run with Supabase
export DATABASE_URL="postgresql+asyncpg://postgres:password@db.xxx.supabase.co:5432/postgres"
docker compose up -d

# Docker - stop
docker compose down
```
