import sqlite3
import os
from contextlib import contextmanager
from typing import Dict, Any, List, Optional
import json

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "xylo.db")

def init_db():
    """Initialize the database with required tables"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            hashed_password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        ''')
        
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            messages TEXT NOT NULL,
            model TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
        ''')
        
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_settings (
            user_id INTEGER PRIMARY KEY,
            default_model TEXT NOT NULL DEFAULT 'llama3-70b-8192',
            temperature REAL NOT NULL DEFAULT 0.7,
            max_tokens INTEGER NOT NULL DEFAULT 1000,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
        ''')
        
        conn.commit()

@contextmanager
def get_db_connection():
    """Get a database connection with context management"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def dict_factory(cursor, row):
    """Convert SQLite row to dictionary"""
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    """Get a user by email"""
    with get_db_connection() as conn:
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
    return user

def get_user_by_id(user_id: int) -> Optional[Dict[str, Any]]:
    """Get a user by ID"""
    with get_db_connection() as conn:
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        user = cursor.fetchone()
    return user

def create_user(email: str, name: str, hashed_password: str) -> Dict[str, Any]:
    """Create a new user"""
    with get_db_connection() as conn:
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (email, name, hashed_password) VALUES (?, ?, ?)",
            (email, name, hashed_password)
        )
        user_id = cursor.lastrowid
        if user_id is None:
            raise ValueError("Failed to create user: no ID returned")
        conn.commit()
        
        cursor.execute(
            "INSERT INTO user_settings (user_id) VALUES (?)",
            (user_id,)
        )
        conn.commit()
        
        user = get_user_by_id(user_id)
        if user is None:
            user = {
                "id": user_id,
                "email": email,
                "name": name,
                "hashed_password": hashed_password,
                "created_at": None
            }
        return user

def update_user(user_id: int, data: Dict[str, Any]) -> Dict[str, Any]:
    """Update user data"""
    valid_fields = ["name", "email", "hashed_password"]
    update_fields = {k: v for k, v in data.items() if k in valid_fields}
    
    if not update_fields:
        user = get_user_by_id(user_id)
        if user is None:
            raise ValueError(f"User with ID {user_id} not found")
        return user
    
    set_clause = ", ".join([f"{field} = ?" for field in update_fields.keys()])
    values = list(update_fields.values())
    values.append(user_id)
    
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            f"UPDATE users SET {set_clause} WHERE id = ?",
            values
        )
        conn.commit()
    
    user = get_user_by_id(user_id)
    if user is None:
        raise ValueError(f"User with ID {user_id} not found after update")
    return user

def save_chat_history(user_id: int, messages: List[Dict[str, str]], model: str) -> int:
    """Save chat history for a user"""
    messages_json = json.dumps(messages)
    
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO chat_history (user_id, messages, model) VALUES (?, ?, ?)",
            (user_id, messages_json, model)
        )
        chat_id = cursor.lastrowid
        conn.commit()
        
        if chat_id is None:
            cursor.execute("SELECT last_insert_rowid()")
            chat_id = cursor.fetchone()[0]
            
            if chat_id is None:
                return -1
                
    return chat_id

def get_chat_history(user_id: int, limit: int = 10) -> List[Dict[str, Any]]:
    """Get chat history for a user"""
    with get_db_connection() as conn:
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM chat_history WHERE user_id = ? ORDER BY created_at DESC LIMIT ?",
            (user_id, limit)
        )
        history = cursor.fetchall()
        
        for item in history:
            item['messages'] = json.loads(item['messages'])
            
    return history

def get_user_settings(user_id: int) -> Dict[str, Any]:
    """Get user settings"""
    with get_db_connection() as conn:
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user_settings WHERE user_id = ?", (user_id,))
        settings = cursor.fetchone()
    return settings or {}

def update_user_settings(user_id: int, settings: Dict[str, Any]) -> Dict[str, Any]:
    """Update user settings"""
    valid_fields = ["default_model", "temperature", "max_tokens"]
    update_fields = {k: v for k, v in settings.items() if k in valid_fields}
    
    if not update_fields:
        return get_user_settings(user_id)
    
    set_clause = ", ".join([f"{field} = ?" for field in update_fields.keys()])
    values = list(update_fields.values())
    values.append(user_id)
    
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            f"UPDATE user_settings SET {set_clause} WHERE user_id = ?",
            values
        )
        conn.commit()
        
    return get_user_settings(user_id)
