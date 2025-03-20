@REM ===.bat FILE TO HELP RUN EVERYTHING WITH EASE===

@echo off
cd frontend
start cmd /k npm run dev
cd ..\backend
call venv\Scripts\activate
uvicorn main:app --reload