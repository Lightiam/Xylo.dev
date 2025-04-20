# Xylo.dev

Xylo.dev is an AI-powered software development platform inspired by OpenHands. It helps developers by providing code assistance, command execution, web browsing capabilities, and specialized AI agents for different development tasks.

## Features

- **AI Assistant**: Chat with an AI assistant to get help with coding tasks
- **Terminal**: Run commands in a secure sandbox environment
- **Browser**: Browse the web and extract information
- **AI Agents**: Specialized agents for different development tasks
- **Microagents**: Domain-specific knowledge and task workflows

## Architecture

Xylo.dev consists of two main components:

1. **Frontend**: React application with TypeScript and Tailwind CSS
   - Modern UI with shadcn/ui components
   - Responsive design for all devices
   - Authentication flow with JWT

2. **Backend**: FastAPI application with JWT authentication
   - RESTful API endpoints
   - Token-based authentication
   - SQLite database for persistent storage
   - Chat history and user settings storage

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

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/xylo-dev/xylo.git
cd xylo
```

2. Install frontend dependencies
```bash
cd xylo-frontend
npm install
```

3. Install backend dependencies
```bash
cd ../xylo-backend
pip install -r requirements.txt
```

### Running Locally

1. Start the backend server
```bash
cd xylo-backend
# Set the Groq API key
export GROQ_API_KEY=your_groq_api_key
uvicorn app.main:app --reload
```

2. Start the frontend development server
```bash
cd xylo-frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Deployment

The application can be deployed using the following methods:

1. Frontend: Vercel, Netlify, or any static hosting service
2. Backend: Fly.io, Heroku, or any Python hosting service

## License

This project is licensed under the MIT License - see the LICENSE file for details.
