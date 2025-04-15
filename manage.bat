@echo off
setlocal enabledelayedexpansion

:menu
cls
echo ========================================
echo 🚀 Gigranger App - Docker Manager
echo ========================================
echo 1. Run the app
echo 2. Stop containers (keep DB data)
echo 3. Reset everything (containers, images, volumes)
echo 4. Rebuild from scratch
echo 5. Exit
echo ========================================
set /p choice=Choose an option [1-5]: 

if "%choice%"=="1" goto run
if "%choice%"=="2" goto stop
if "%choice%"=="3" goto reset
if "%choice%"=="4" goto rebuild
if "%choice%"=="5" exit

goto menu

:run
echo 🔄 Starting Docker Compose...
docker-compose up -d
pause
goto menu

:stop
echo 🛑 Stopping containers (preserving data)...
docker-compose down
pause
goto menu

:reset
echo 🔥 Removing containers, images, volumes...
docker-compose down -v --rmi all --remove-orphans
pause
goto menu

:rebuild
echo 🧼 Clean build: removing everything, rebuilding...
docker-compose down -v --rmi all --remove-orphans
docker-compose build --no-cache
docker-compose up -d
pause
goto menu
