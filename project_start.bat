@REM ===.bat FILE TO RUN FRONTEND, BACKEND, AND SETUP DEPENDENCIES===

@echo off
echo Starting NFT Website Setup...

@REM === Check and Create Virtual Environment ===
cd backend
if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
    call venv\Scripts\activate
    echo Installing backend dependencies...
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate
)

@REM @REM === Check and Create .env ===
@REM if not exist .env (
@REM     echo Creating .env file... Please update with your Pinata API keys.
@REM     echo PINATA_API_KEY=your-pinata-api-key > .env
@REM     echo PINATA_SECRET_API_KEY=your-pinata-secret-api-key >> .env
@REM     echo Edit .env with your Pinata keys from https://pinata.cloud/
@REM ) else (
@REM     echo .env file exists. Skipping creation.
@REM )


@REM @REM === Attempt to Find and Start MySQL Service ===
@REM echo Attempting to start MySQL service...
@REM for /f "tokens=2 delims=:" %%i in ('sc query ^| findstr /i "MySQL"') do (
@REM     set "SERVICE_NAME=%%i"
@REM     net start %%i 2>nul
@REM     if %ERRORLEVEL% EQU 0 (
@REM         echo MySQL service %%i started successfully.
@REM         goto :mysql_started
@REM     )
@REM )


@REM echo Warning: No MySQL service found or couldn’t start. Starting MySQL manually may be required.
@REM echo Install MySQL if not present: https://dev.mysql.com/downloads/
@REM echo Start it via services.msc or mysqld in MySQL bin folder.

@REM :mysql_started

@REM @REM === Run schema.sql to Setup Database ===
@REM echo Checking and setting up database...
@REM mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS nft_db;" 2>nul
@REM if %ERRORLEVEL% NEQ 0 (
@REM     echo Error: MySQL connection failed. Ensure MySQL is running and credentials are root/root.
@REM     echo Try: mysql -u root -pYourPassword nft_db ^< schema.sql
@REM ) else (
@REM     mysql -u root -proot nft_db < schema.sql 2>nul
@REM     if %ERRORLEVEL% NEQ 0 (
@REM         echo Error: Failed to run schema.sql. Check file path or MySQL credentials.
@REM     ) else (
@REM         echo Database setup complete.
@REM     )
@REM )

@REM === Start Backend in New Window ===
echo Starting FastAPI backend...
start cmd /k "uvicorn main:app --reload --port 9000"

@REM === Start Frontend in New Window ===
cd ..\frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    npm install
)
echo Starting React frontend...
start cmd /k npm run dev

echo Setup complete! Frontend at http://localhost:5173, Backend at http://127.0.0.1:8000
echo If errors occur, ensure MySQL is running and schema.sql is in backend folder.