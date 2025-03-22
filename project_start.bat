@REM @REM ===.bat FILE TO RUN FRONTEND, BACKEND, AND SETUP DEPENDENCIES===

@REM @echo off
@REM echo Starting NFT Website Setup...

@REM @REM === Check and Create Virtual Environment ===
@REM cd backend
@REM if not exist venv (
@REM     echo Creating Python virtual environment...
@REM     python -m venv venv
@REM     call venv\Scripts\activate
@REM     echo Installing backend dependencies...
@REM     pip install -r requirements.txt
@REM ) else (
@REM     call venv\Scripts\activate
@REM )

@REM @REM @REM === Check and Create .env ===
@REM @REM if not exist .env (
@REM @REM     echo Creating .env file... Please update with your Pinata API keys.
@REM @REM     echo PINATA_API_KEY=your-pinata-api-key > .env
@REM @REM     echo PINATA_SECRET_API_KEY=your-pinata-secret-api-key >> .env
@REM @REM     echo Edit .env with your Pinata keys from https://pinata.cloud/
@REM @REM ) else (
@REM @REM     echo .env file exists. Skipping creation.
@REM @REM )


@REM @REM @REM === Attempt to Find and Start MySQL Service ===
@REM @REM echo Attempting to start MySQL service...
@REM @REM for /f "tokens=2 delims=:" %%i in ('sc query ^| findstr /i "MySQL"') do (
@REM @REM     set "SERVICE_NAME=%%i"
@REM @REM     net start %%i 2>nul
@REM @REM     if %ERRORLEVEL% EQU 0 (
@REM @REM         echo MySQL service %%i started successfully.
@REM @REM         goto :mysql_started
@REM @REM     )
@REM @REM )


@REM @REM echo Warning: No MySQL service found or couldn’t start. Starting MySQL manually may be required.
@REM @REM echo Install MySQL if not present: https://dev.mysql.com/downloads/
@REM @REM echo Start it via services.msc or mysqld in MySQL bin folder.

@REM @REM :mysql_started

@REM @REM === Run schema.sql to Setup Database ===
@REM echo Checking and setting up database...
@REM mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS nft_db;" 2>nul
@REM if %ERRORLEVEL% NEQ 0 (
@REM     echo Error: MySQL connection failed. Ensure MySQL is running and credentials are root/root.
@REM     echo Try: mysql -u root -pYourPassword nft_db ^< \backend\database\schema.sql
@REM ) else (
@REM     mysql -u root -proot nft_db < \backend\database\schema.sql 2>nul
@REM     if %ERRORLEVEL% NEQ 0 (
@REM         echo Error: Failed to run schema.sql. Check file path or MySQL credentials.
@REM     ) else (
@REM         echo Database setup complete.
@REM     )
@REM )

@REM @REM === Start Backend in New Window ===
@REM echo Starting FastAPI backend...
@REM start cmd /k "uvicorn main:app --reload --port 9000"

@REM @REM === Start Frontend in New Window ===
@REM cd ..\frontend
@REM if not exist node_modules (
@REM     echo Installing frontend dependencies...
@REM     npm install
@REM )
@REM echo Starting React frontend...
@REM start cmd /k npm run dev

@REM echo Setup complete! Frontend at http://localhost:5173, Backend at http://127.0.0.1:8000
@REM echo If errors occur, ensure MySQL is running and schema.sql is in backend folder.

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
mysql -u root -proot -P 3306 -e "CREATE DATABASE IF NOT EXISTS nft_db;" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: MySQL connection failed. Ensure MySQL is running on port 3306 with credentials root/root.
    pause
    exit /b 1
) else (
    mysql -u root -proot -P 3306 nft_db < backend\database\schema.sql 2>nul
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