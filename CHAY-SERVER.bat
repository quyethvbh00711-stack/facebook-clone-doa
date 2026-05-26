@echo off
cd /d "%~dp0"
title Facebook Clone Server - Port 3001
echo.
echo  Dang khoi dong server...
echo  Mo trinh duyet: http://localhost:3001
echo  Xem du lieu:    http://localhost:3001/admin.html
echo.
echo  Nhan Ctrl+C de tat server
echo.
npm start
pause
