#!/bin/bash
# Hermes Agent Desktop App - Unix Launch Script

echo "========================================"
echo "  Hermes Agent Desktop Launcher"
echo "========================================"
echo ""

# Check if Rust is installed
if ! command -v rustc &> /dev/null; then
    echo "[ERROR] Rust is not installed!"
    echo "Please install Rust from: https://www.rust-lang.org/tools/install"
    echo "Or run: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "[INFO] Checking dependencies..."
cd web || exit 1

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "[INFO] Installing Node.js dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] Failed to install dependencies"
        exit 1
    fi
fi

echo ""
echo "[INFO] Starting Hermes Agent Desktop App..."
echo ""
echo "Available commands:"
echo "  npm run tauri:dev      - Start development mode"
echo "  npm run tauri:build    - Build production version"
echo "  npm run dev            - Start web frontend only"
echo ""
echo "Starting in development mode..."
echo ""

npm run tauri:dev
