@echo off
REM Quick diagnostic script for Tauri Desktop

echo ========================================
echo   Hermes Agent Desktop - Diagnostics
echo ========================================
echo.

cd /d "%~dp0"

echo 1. Checking Rust...
where rustc >nul 2>&1
if %errorlevel% equ 0 (
    echo    [OK] Rust installed
    rustc --version
) else (
    echo    [FAIL] Rust NOT installed
    echo    Install with: winget install --id Rustlang.Rustup
)
echo.

echo 2. Checking Node.js...
where node >nul 2>&1
if %errorlevel% equ 0 (
    echo    [OK] Node.js installed
    node --version
) else (
    echo    [FAIL] Node.js NOT installed
    echo    Install from: https://nodejs.org/
)
echo.

echo 3. Checking npm...
where npm >nul 2>&1
if %errorlevel% equ 0 (
    echo    [OK] npm available
    npm --version
) else (
    echo    [FAIL] npm NOT found
)
echo.

echo 4. Checking web directory...
if exist "web" (
    echo    [OK] web directory exists
) else (
    echo    [FAIL] web directory NOT found
)
echo.

echo 5. Checking web/node_modules...
if exist "web\node_modules" (
    echo    [OK] Dependencies installed
) else (
    echo    [WARN] Dependencies NOT installed
    echo    Run: cd web ^&^& npm install
)
echo.

echo 6. Checking Tauri CLI...
if exist "web\node_modules\.bin\tauri.cmd" (
    echo    [OK] Tauri CLI found
) else (
    echo    [WARN] Tauri CLI NOT found
    echo    Run: cd web ^&^& npm install
)
echo.

echo ========================================
echo Next steps:
echo ========================================
echo.
echo If all checks passed, run:
echo   .\launch-desktop.bat
echo.
echo If Rust is missing:
echo   winget install --id Rustlang.Rustup
echo.
echo If dependencies are missing:
echo   cd web
echo   npm install
echo.

pause
