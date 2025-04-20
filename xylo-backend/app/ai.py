from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
import os
import json
import logging

try:
    import litellm
    litellm.set_verbose = True
    LITELLM_AVAILABLE = True
except ImportError:
    logging.warning("litellm not available, using fallback implementation")
    LITELLM_AVAILABLE = False

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: str = "llama3-70b-8192"
    temperature: float = 0.7
    max_tokens: int = 1000

class ChatResponse(BaseModel):
    content: str
    model: str
    usage: Dict[str, Any] = Field(default_factory=dict)

async def chat_completion(request: ChatRequest, api_key: Optional[str] = None) -> ChatResponse:
    """
    Send a chat completion request to Groq AI using LiteLLM or fallback to mock response
    """
    messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
    
    if LITELLM_AVAILABLE:
        try:
            response = litellm.completion(
                model=f"groq/{request.model}",
                messages=messages,
                temperature=request.temperature,
                max_tokens=request.max_tokens,
                api_key=api_key
            )
            
            content = response.choices[0].message.content
            
            return ChatResponse(
                content=content,
                model=response.model,
                usage=response.usage
            )
        except Exception as e:
            logging.error(f"Error calling Groq AI: {str(e)}")
    
    logging.warning("Using fallback AI implementation")
    
    last_user_message = "How can I help you?"
    for msg in reversed(request.messages):
        if msg.role == "user":
            last_user_message = msg.content
            break
    
    response_content = f"I'm a fallback AI assistant for Xylo.dev. You asked: '{last_user_message}'. In production, this would use Groq AI with the {request.model} model."
    
    return ChatResponse(
        content=response_content,
        model=f"fallback-{request.model}",
        usage={"prompt_tokens": len(last_user_message), "completion_tokens": len(response_content), "total_tokens": len(last_user_message) + len(response_content)}
    )

AVAILABLE_MODELS = [
    {
        "id": "llama3-70b-8192",
        "name": "Llama 3 70B",
        "description": "Meta's Llama 3 70B model with 8192 context window"
    },
    {
        "id": "llama3-8b-8192",
        "name": "Llama 3 8B",
        "description": "Meta's Llama 3 8B model with 8192 context window"
    },
    {
        "id": "mixtral-8x7b-32768",
        "name": "Mixtral 8x7B",
        "description": "Mixtral 8x7B model with 32768 context window"
    },
    {
        "id": "gemma-7b-it",
        "name": "Gemma 7B",
        "description": "Google's Gemma 7B instruction-tuned model"
    }
]
