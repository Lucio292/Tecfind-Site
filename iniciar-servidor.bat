@echo off
REM Inicia o servidor HTTP local para Tecfind
REM Este arquivo resolve o erro de Firebase ao fazer login

cls
echo.
echo  ============================================
echo    Iniciando Servidor Tecfind...
echo  ============================================
echo.

cd /d "%~dp0"

REM Verificar se Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Python nao foi encontrado!
    echo.
    echo Por favor, instale Python em: https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

REM Iniciar servidor
echo  Iniciando servidor em: http://localhost:8000
echo.
echo  Pressione CTRL + C para parar o servidor
echo.
python server.py

pause
