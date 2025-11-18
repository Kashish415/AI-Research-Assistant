# 🧠 AI Research Assistant

A simple tool that helps you read research papers faster.
Upload a PDF, ask questions, get summaries, explore sections — like chatting with your paper.


---

## What it does?

Upload a research paper PDF or paste an arXiv link

Extracts text and builds a lightweight search index

Ask questions in a clean chat-style interface

Auto-summary, suggested questions, and highlighted sources



---

## Features

Doc Input: Upload a PDF or paste an arXiv link

Auto Sectioning: The app detects and organizes paper sections

Smart Summaries: Quick summaries for full paper or selected sections

Interactive Chat: Ask anything; get context-aware answers

RAG Enhanced: Retrieval-Augmented Generation for more accurate responses



---

## Quick Start

1. Clone the repository

git clone <repo-url>
cd AI-RESEARCH-ASSISTANT

2. Create & activate a virtual environment

python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

3. Install dependencies

pip install -r backend/requirements.txt
pip install -r frontend/requirements.txt

4. Add your API key — create a .env file

GEMINI_API_KEY=your_key_here
BACKEND_URL=http://127.0.0.1:5000

5. Run the project

cd backend
python app.py

Open the frontend at
http://127.0.0.1:8050
