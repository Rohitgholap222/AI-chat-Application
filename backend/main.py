from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from langchain_huggingface import (
    ChatHuggingFace,
    HuggingFaceEndpoint
)

from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


llm = HuggingFaceEndpoint(
    repo_id="openai/gpt-oss-20b",
    task="text-generation"
)

model = ChatHuggingFace(llm=llm)


@app.post("/chat")
def chat(request: ChatRequest):

    result = model.invoke(request.message)

    return {
        "response": result.content
    }