@echo off
echo ========================================
echo   Ricettario Digitale - Git Setup
echo ========================================
echo.

REM Verifica se git è installato
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERRORE] Git non è installato!
    echo.
    echo Scarica Git da: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo [1/5] Inizializzazione repository Git...
git init
if errorlevel 1 goto error

echo.
echo [2/5] Aggiunta files al repository...
git add .
if errorlevel 1 goto error

echo.
echo [3/5] Creazione primo commit...
git commit -m "Initial commit - Ricettario Digitale"
if errorlevel 1 goto error

echo.
echo [4/5] Rinomina branch in 'main'...
git branch -M main
if errorlevel 1 goto error

echo.
echo ========================================
echo   Setup Git completato con successo!
echo ========================================
echo.
echo PROSSIMI PASSI:
echo.
echo 1. Vai su https://github.com e crea un account (se non ce l'hai)
echo 2. Crea un nuovo repository chiamato "ricettario-digitale"
echo 3. Copia il comando git remote add origin che GitHub ti mostra
echo 4. Incolla il comando in questo terminale e premi INVIO
echo 5. Infine esegui: git push -u origin main
echo.
echo Esempio:
echo   git remote add origin https://github.com/TUO_USERNAME/ricettario-digitale.git
echo   git push -u origin main
echo.
echo Dopo aver caricato su GitHub, vai su https://render.com per il deploy!
echo.
pause
exit /b 0

:error
echo.
echo [ERRORE] Qualcosa è andato storto!
echo.
pause
exit /b 1
