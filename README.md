# Pattern Replacer
A web-based tool that allows users to upload tabular data (e.g. CSV, Excel), describe a natural language instruction (e.g. “Find email address in Email column and replace them with REDACTED”), and automatically apply regex-based modifications to the data.

# Tech Stack
- Frontend: React + Vite + TypeScript + MUI + Tailwind + Zustand

- Backend: Django + Python 3.11 + simpleui

- AI Regex Engine: OpenRouter : mistralai/mistral-7b-instruct

- Database: SQLite3 

# Getting Started (initial)
1. Clone the repo

- git clone https://github.com/yourname/pattern-replacer.git
- cd pattern-replacer

2. Create and activate backend virtual environment

- cd backend
- python -m venv .env
- source .env/bin/activate  # Mac/Linux
# .env\Scripts\activate    # Windows
- pip install -r requirements.txt


3. Run backend

- python manage.py migrate
- python manage.py runserver

4. Start frontend
- cd frontend
- npm install
- npm run dev

# Quick start(fordevloper)


- do in root directionary : bash ./start.sh

#  Usage

1. Upload a .csv file with tabular data.

2. Enter a natural language instruction, such as: "Find phone numbers in the Phone column and replace them with 'REDACTED'"

3. Click Transform.

4. Modified cells will be highlighted.

5. Export the cleaned table.(if you want)

# Project Structure
pattern-replacer/
├── backend/
│   ├── api/                    # Django app (models, views)
│   ├── llm/                    # GPT client & prompt handler
│   ├── media/uploads/         # Uploaded + merged files
│   └── manage.py
├── frontend/
│   ├── src/pages/             # Upload, Preview, Transform pages
│   ├── src/components/        # Snackbar, Loader, etc.
│   └── vite.config.ts
└── start.sh                   # One-click startup script


# Features

- Natural language to regex transformation

- llm  regex matching

- Regex and file modification history

- Cell-level highlight for changed values

- Export modified tables as a new file


