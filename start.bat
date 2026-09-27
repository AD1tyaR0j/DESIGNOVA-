@echo off
rem DESIGNOVA 2026 - start the local dev server (Windows: double-click this file)
setlocal
cd /d "%~dp0"
title DESIGNOVA 2026 - dev server

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 20.19 or newer is required. Install it from https://nodejs.org and run this again.
  pause
  exit /b 1
)
for /f "delims=." %%v in ('node -p "process.versions.node"') do set NODE_MAJOR=%%v
if %NODE_MAJOR% LSS 20 (
  echo Your Node.js is too old. Please install Node.js 20.19 or newer from https://nodejs.org
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing dependencies - first run only...
  call npm install
  if errorlevel 1 (
    echo npm install failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

echo Starting DESIGNOVA at http://localhost:5173  - press Ctrl+C to stop
call npm run dev -- --open
pause
