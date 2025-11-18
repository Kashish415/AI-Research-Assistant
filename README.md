# AI Research Assistant

A simple tool that helps you read research papers faster. Upload a PDF, ask questions, get explanations, summaries, and section highlights — like chatting with the paper.


---

## What it does?

Upload PDF of the research paper/ paste arXiv link

Extracts text and builds a lightweight search index

Ask questions in a chat-style UI 

Auto-summary, suggested questions, and source highlights

---
## Features 

Doc Input: Upload a PDF or paste an arXiv link.

Auto Sectioning: The app detects and organizes paper sections.

Smart Summaries: Generate quick summaries for full papers or selected sections.

Interactive Chat: Ask questions and get personalised, paper-aware answers.

RAG Enhanced: Uses Retrieval-Augmented Generation for accurate, grounded responses.



---

---

## Quick start

1. Clone



git clone <repo-url>
cd AI-RESEARCH-ASSISTANT

2. Create & activate venv



python -m venv venv
# Windows
venv\Scripts\activate
# mac/linux
source venv/bin/activate

3. Install



pip install -r backend/requirements.txt
pip install -r frontend/requirements.txt

4. Add keys — create .env (example)


GEMINI_API_KEY=your_key_here
BACKEND_URL=http://127.0.0.1:5000

5. Run



# Terminal 1
cd backend
python app.py

# Terminal 2
cd frontend
python app.py

Open the frontend (usually http://127.0.0.1:8050) and upload a PDF.
---

