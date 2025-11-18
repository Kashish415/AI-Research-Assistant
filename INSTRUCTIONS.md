Run the minimal dev project locally (two terminals)

1) Backend (Flask)

Open a terminal in `backend/` and run:

  python app.py

This starts the backend at http://127.0.0.1:5000

2) Frontend (static)

Open a second terminal in `frontend/` and run:

  python app.py

This starts a simple static server at http://127.0.0.1:8050. Open that URL in your browser.

Notes and dev-fallbacks
- This minimal setup avoids heavy dependencies. PDF text extraction and LLM calls are optional and will gracefully fall back if the required packages are not installed.
- To enable PDF extraction, install PyMuPDF in your venv: `pip install PyMuPDF`
- To enable Google Gemini (generative AI) integration, install the appropriate client and set `GEMINI_API_KEY` in a `.env` file in the workspace root.

.env example:

GEMINI_API_KEY=your_api_key_here

If you want the full original project (TF-IDF vectorization and advanced retrieval), install `scikit-learn` and `numpy` and restore the previous code from the backup folder `backup_2025-11-08_0001/`.
