@echo off
REM Hermes Agent Web Frontend Only (No Tauri/Rust required)

echo ========================================
echo   Hermes Agent Web Frontend
echo ========================================
echo.

cd /d "%~dp0"

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found: 
node --version
echo.

REM Check if web directory exists
if not exist "web" (
    echo [ERROR] web directory not found!
    pause
    exit /b 1
)

cd web

REM Install dependencies if needed
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies!
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo Starting Web Development Server...
echo ========================================
echo.
echo Server will be available at:
echo   http://localhost:5173
echo.
echo Press Ctrl+C to stop.
echo.

call npm run dev

pause
