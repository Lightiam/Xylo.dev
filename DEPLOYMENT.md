# Deployment Guide for Xylo.dev

This guide explains how to deploy the Xylo.dev application to production.

## Backend Deployment

The backend is a FastAPI application with SQLite database that can be deployed to any platform that supports Python applications. Here are the steps to deploy it:

### Option 1: Deploy to Fly.io

1. Install the Fly.io CLI: https://fly.io/docs/hands-on/install-flyctl/
2. Navigate to the backend directory: `cd xylo-backend`
3. Create a `fly.toml` file:

```toml
app = "xylo-backend"
primary_region = "your-region"

[build]
  builder = "paketobuildpacks/builder:base"

[env]
  PORT = "8000"
  GROQ_API_KEY = "your-groq-api-key"

[http_service]
  internal_port = 8000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]

[mounts]
  source = "xylo_data"
  destination = "/app/data"
```

4. Deploy the application: `fly launch`

### Option 2: Deploy to Heroku

1. Install the Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Navigate to the backend directory: `cd xylo-backend`
3. Create a `Procfile`:

```
web: uvicorn app.main:app --host=0.0.0.0 --port=$PORT
```

4. Create a `requirements.txt` file:

```
fastapi
uvicorn
python-jose
passlib
python-multipart
litellm
groq
```

5. Deploy the application:

```bash
heroku create xylo-backend
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a xylo-backend
git push heroku main
```

6. Set environment variables:

```bash
heroku config:set GROQ_API_KEY=your-groq-api-key
```

### Database Persistence

The backend uses SQLite for database storage. For production deployments, you need to ensure the database file is stored in a persistent volume:

#### Fly.io
The `fly.toml` configuration above includes a volume mount for database persistence.

#### Heroku
For Heroku, you'll need to use a database add-on or modify the code to use PostgreSQL instead of SQLite, as Heroku's filesystem is ephemeral.

#### Custom Configuration
You can modify the database path in `app/database.py` to store the SQLite file in a specific location:

```python
# Change this line in database.py
DB_PATH = os.environ.get("DATABASE_PATH", os.path.join(os.path.dirname(os.path.dirname(__file__)), "xylo.db"))
```

Then set the `DATABASE_PATH` environment variable to your preferred location.

## Frontend Deployment

The frontend is a React application that can be deployed to Vercel. Here are the steps to deploy it:

### Deploy to Vercel

1. Install the Vercel CLI: `npm install -g vercel`
2. Navigate to the frontend directory: `cd xylo-frontend`
3. Deploy the application: `vercel`
4. Set environment variables in the Vercel dashboard:
   - `VITE_API_URL`: The URL of your deployed backend (e.g., https://xylo-backend.fly.dev)

Alternatively, you can deploy directly from the Vercel dashboard:

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Set environment variables:
   - `VITE_API_URL`: The URL of your deployed backend

## Environment Variables

### Backend

- `GROQ_API_KEY`: Your Groq API key

### Frontend

- `VITE_API_URL`: The URL of your deployed backend

## Testing the Deployment

1. Open your deployed frontend URL in a browser
2. Sign up for a new account
3. Log in with your credentials
4. Test the chat functionality with Groq AI

## Troubleshooting

- If you encounter CORS issues, make sure your backend's CORS configuration includes your frontend's URL
- If the chat functionality doesn't work, check that your Groq API key is correctly set
- If authentication fails, ensure that your frontend is correctly configured to use the deployed backend URL
