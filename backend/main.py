from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from langchain_huggingface import (
    ChatHuggingFace,
    HuggingFaceEndpoint
)

from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


# Hugging Face model
llm = HuggingFaceEndpoint(
    repo_id="openai/gpt-oss-20b",
    task="text-generation"
)

model = ChatHuggingFace(llm=llm)


@app.get("/")
def home():
    return {"message": "FastAPI is running"}


@app.post("/chat")
def chat(request: ChatRequest):
    try:
        print("User message:", request.message)

        result = model.invoke(request.message)

        print("AI response:", result.content)

        return {
            "response": result.content
        }

    except Exception as e:
        print("ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )