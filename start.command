#!/usr/bin/env bash
# DESIGNOVA 2026 - start the local dev server (macOS: double-click this file)
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 20.19 or newer is required. Install it from https://nodejs.org and run this again."
  exit 1
fi
if [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 20 ]; then
  echo "Node.js $(node -v) is too old. Please install Node.js 20.19 or newer from https://nodejs.org"
  exit 1
fi
if [ ! -d node_modules ]; then
  echo "Installing dependencies (first run only)..."
  npm install
fi
echo "Starting DESIGNOVA at http://localhost:5173  (Ctrl+C to stop)"
exec npm run dev -- --open
