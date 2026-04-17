@echo off
REM Script para Executar Deploy Automático Tecfind no Vercel
REM Este arquivo facilita a execução do script PowerShell

cls
echo.
echo  ============================================
echo    Tecfind - Deploy Automático no Vercel
echo  ============================================
echo.

REM Verificar se PowerShell está disponível
powershell -Command "exit" >nul 2>&1
if errorlevel 1 (
    echo ERRO: PowerShell nao foi encontrado!
    echo.
    pause
    exit /b 1
)

REM Executar script PowerShell
echo  Iniciando processo de deploy...
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy-vercel.ps1"

if errorlevel 1 (
    echo.
    echo  ERRO durante o deploy!
    echo.
    pause
)

exit /b %errorlevel%
