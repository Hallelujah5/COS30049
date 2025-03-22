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
    echo Updating backend dependencies...
    pip install -r requirements.txt
)

@REM === Attempt to Find and Start MySQL Service ===
echo Attempting to start MySQL service...
for /f "tokens=2 delims=:" %%i in ('sc query ^| findstr /i "MySQL"') do (
    set "SERVICE_NAME=%%i"
    net start %%i 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo MySQL service %%i started successfully.
        goto :mysql_started
    )
)

echo Warning: No MySQL service found or couldn’t start. Starting MySQL manually may be required.
echo Install MySQL if not present: https://dev.mysql.com/downloads/
echo Start it via services.msc or mysqld in MySQL bin folder.
pause
exit /b 1

:mysql_started

@REM === Run schema.sql to Setup Database ===
echo Checking and setting up database...
mysql -u root -proot -P 3306 -e "CREATE DATABASE IF NOT EXISTS nft_db;"
if %ERRORLEVEL% NEQ 0 (
    echo Error: MySQL connection failed. Ensure MySQL is running on port 3306 with credentials root/root.
    pause
    exit /b 1
) else (
    mysql -u root -proot -P 3306 nft_db < database\schema.sql 
    if %ERRORLEVEL% NEQ 0 (
        echo Error: Failed to run schema.sql. Check file path or MySQL credentials.
        pause
        exit /b 1
    ) else (
        echo Database setup completed successfully.
    )
)

@REM === Start Backend in New Window ===
echo Starting FastAPI backend...
start cmd /k "call venv\Scripts\activate && uvicorn main:app --reload --port 9000"

@REM === Start Frontend in New Window ===
cd ..\frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    npm install
)
echo Starting React frontend...
start cmd /k npm run dev

echo Setup complete! Frontend at http://localhost:5173, Backend at http://127.0.0.1:9000
echo If errors occur, ensure MySQL is running and schema.sql is in backend\database folder.