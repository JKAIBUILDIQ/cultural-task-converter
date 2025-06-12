from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import ollama

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use ["https://crella.ai"] in production
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/claudia")
async def chat(request: Request):
    data = await request.json()
    response = ollama.chat(model="claudia", messages=data["messages"])
    return {"response": response["message"]["content"]}

@app.get("/api/claudia/health")
def health():
    return {"status": "Claudia is alive on the GPU"}
