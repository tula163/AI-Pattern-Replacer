#!/bin/bash
echo "👉 Activating backend virtual environment..."
source  .env/bin/activate
echo "🚀 Starting Django backend..."
cd backend
python manage.py runserver &
cd ..

echo "🚀 Starting React frontend..."
cd frontend
npm run dev
