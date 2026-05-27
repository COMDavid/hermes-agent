@echo off
REM Hermes Agent Desktop App - Windows Launch Script

echo ========================================
echo   Hermes Agent Desktop Launcher
echo ========================================
echo.

REM Change to script directory
cd /d "%~dp0"

REM Check if Rust is installed
echo [INFO] Checking Rust installation...
where rustc >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Rust is not installed!
    echo.
    echo Please install Rust from: https://www.rust-lang.org/tools/install
    echo Or run: winget install --id Rustlang.Rustup
    echo.
    pause
    exit /b 1
)
echo [OK] Rust found: 
rustc --version
echo.

REM Check if Node.js is installed
echo [INFO] Checking Node.js installation...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo [OK] Node.js found:
node --version
echo.

REM Check if web directory exists
if not exist "web" (
    echo [ERROR] web directory not found!
    echo Please make sure you are in the hermes-agent-main directory.
    echo.
    pause
    exit /b 1
)

echo [INFO] Changing to web directory...
cd web
if %errorlevel% neq 0 (
    echo [ERROR] Failed to change to web directory!
    pause
    exit /b 1
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo [INFO] Installing Node.js dependencies...
    echo This may take a few minutes...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Failed to install dependencies!
        echo Please check your internet connection and try again.
        echo.
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed successfully.
    echo.
) else (
    echo [OK] Dependencies already installed.
    echo.
)

echo ========================================
echo [INFO] Starting Hermes Agent Desktop App...
echo ========================================
echo.
echo Available commands:
echo   npm run tauri:dev      - Start development mode
echo   npm run tauri:build    - Build production version
echo   npm run dev            - Start web frontend only
echo.
echo Starting in development mode...
echo This will open a desktop window shortly.
echo Press Ctrl+C to stop.
echo.

call npm run tauri:dev

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Application exited with error code: %errorlevel%
    echo.
    echo Common issues:
    echo 1. Rust not installed - Run: winget install --id Rustlang.Rustup
    echo 2. Port 5173 in use - Close other apps using this port
    echo 3. Missing system dependencies - See TAURI_SETUP_GUIDE.md
    echo.
)

pause
