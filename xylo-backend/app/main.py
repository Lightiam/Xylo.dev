from fastapi import FastAPI, Depends, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
import os
from typing import Optional, List, Dict, Any

from .models import UserCreate, User, Token
from .sql_auth import (
    authenticate_user, 
    create_access_token, 
    get_current_user, 
    create_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from .ai import ChatRequest, ChatResponse, chat_completion, AVAILABLE_MODELS
from .database import init_db, save_chat_history, get_chat_history, get_user_settings, update_user_settings

DEFAULT_GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")

app = FastAPI(title="Xylo.dev API", description="AI-powered software development platform")

@app.on_event("startup")
async def startup_event():
    init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://openhands-tool-tunnel-x1qacw9e.devinapps.com",
        "https://user:ec56f0360fb752c3a290a185e3d814bb@openhands-tool-tunnel-x1qacw9e.devinapps.com",
        "https://openhands-tool-tunnel-zwdi3ogg.devinapps.com",
        "https://user:ac39e2eb4b685a87ffcea7f146b83b66@openhands-tool-tunnel-zwdi3ogg.devinapps.com",
        "https://xylo-frontend-91n60f7jl-lightiams-projects.vercel.app",
        "https://xylo-frontend.vercel.app",
        "https://openhands-tool-x4f21wo6.devinapps.com",
        "https://xylo-dev.vercel.app",
        "https://xylo-dev-lightiam.vercel.app",
        "https://xylodev.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.post("/api/auth/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/auth/register", response_model=User)
async def register_user(user_data: UserCreate):
    try:
        from .database import get_user_by_email
        existing_user = get_user_by_email(user_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        user = create_user(
            email=user_data.email,
            name=user_data.name,
            password=user_data.password
        )
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )

@app.get("/api/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.get("/api/features")
async def get_features(current_user: User = Depends(get_current_user)):
    """Get available features for the authenticated user"""
    return {
        "features": [
            {
                "id": "code-assistance",
                "name": "Code Assistance",
                "description": "Modify code, run commands, and browse the web"
            },
            {
                "id": "ai-agents",
                "name": "AI Agents",
                "description": "Specialized agents for different development tasks"
            },
            {
                "id": "microagents",
                "name": "Microagents",
                "description": "Domain-specific knowledge and task workflows"
            },
            {
                "id": "runtime",
                "name": "Runtime",
                "description": "Secure sandbox for running commands and code"
            }
        ]
    }


@app.get("/api/models")
async def get_models(current_user: User = Depends(get_current_user)):
    """Get available Groq AI models"""
    return {"models": AVAILABLE_MODELS}

@app.get("/api/chat/history")
async def get_user_chat_history(
    limit: int = 10,
    current_user: User = Depends(get_current_user)
):
    """Get chat history for the current user"""
    history = get_chat_history(current_user.id, limit)
    return {"history": history}

@app.get("/api/user/settings")
async def get_current_user_settings(current_user: User = Depends(get_current_user)):
    """Get settings for the current user"""
    settings = get_user_settings(current_user.id)
    return settings

@app.put("/api/user/settings")
async def update_current_user_settings(
    settings: Dict[str, Any],
    current_user: User = Depends(get_current_user)
):
    """Update settings for the current user"""
    updated_settings = update_user_settings(current_user.id, settings)
    return updated_settings

@app.post("/api/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest, 
    current_user: User = Depends(get_current_user),
    x_api_key: Optional[str] = Header(None)
):
    """Send a chat completion request to Groq AI"""
    try:
        api_key = x_api_key or DEFAULT_GROQ_API_KEY
        if not api_key:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Groq API key is required. Please provide it in the X-API-Key header or set it as an environment variable."
            )
        
        response = await chat_completion(request, api_key)
        
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        save_chat_history(current_user.id, messages, request.model)
        
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
