@echo off
title Calculadora de IMC
cd /d "%~dp0"

if not exist "node_modules" (
  echo Instalando dependencias...
  call npm install
  if errorlevel 1 (
    echo.
    echo Nao foi possivel instalar as dependencias.
    pause
    exit /b 1
  )
)

echo Abrindo a Calculadora de IMC...
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:5173'"
call npm run dev

