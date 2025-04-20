# Xylo.dev Backend

This is the backend for the Xylo.dev application, an AI-powered software development platform inspired by OpenHands.

## Features

- Complete authentication system with JWT
- SQLite database for persistent storage
- Groq AI integration via LiteLLM
- API endpoints for chat, model selection, and user settings

## Database Schema

The backend uses SQLite for lightweight, file-based database storage:

### Tables

1. **users**
   - id (PRIMARY KEY)
   - email (UNIQUE)
   - name
   - hashed_password
   - created_at

2. **chat_history**
   - id (PRIMARY KEY)
   - user_id (FOREIGN KEY)
   - messages (JSON)
   - model
   - created_at

3. **user_settings**
   - user_id (PRIMARY KEY)
   - default_model
   - temperature
   - max_tokens

## API Endpoints

### Authentication
- POST `/api/auth/token` - Get JWT token
- POST `/api/auth/register` - Register new user
- GET `/api/users/me` - Get current user info

### Chat
- POST `/api/chat` - Send chat message
- GET `/api/chat/history` - Get chat history

### Models
- GET `/api/models` - Get available models

### User Settings
- GET `/api/user/settings` - Get user settings
- PUT `/api/user/settings` - Update user settings

## Development

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the server:
   ```
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

3. Environment variables:
   - `GROQ_API_KEY` - Your Groq API key

## Deployment

See the main [DEPLOYMENT.md](../DEPLOYMENT.md) file for deployment instructions.
