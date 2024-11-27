@echo off
setlocal

rem Suche nach der VSIX-Datei mit der höchsten Versionsnummer im aktuellen Verzeichnis
set "latestVersion="
for /f "delims=" %%a in ('dir /b /on /a-d *.vsix') do (
    set "filename=%%~na"
    set "extension=%%~xa"
    for /f "tokens=1,2 delims=-" %%b in ("!filename!") do (
        set "version=%%c"
        if "!version!" gtr "!latestVersion!" (
            set "latestVersion=!version!"
            set "latestVsix=%%a"
        )
    )
)

rem Prüfe, ob eine VSIX-Datei gefunden wurde
if not defined latestVsix (
    echo Es wurde keine VSIX-Datei gefunden!
    pause
    exit /b 1
)

echo Die neueste VSIX-Datei ist: %latestVsix%

rem Prüfe, ob der Befehl "code" verfügbar ist
where code >nul 2>nul
if %errorlevel% neq 0 (
    echo Visual Studio Code ist nicht installiert oder nicht im Systempfad vorhanden!
    pause
    exit /b 1
)

rem VSIX-Datei installieren
code --install-extension "%latestVsix%"
echo Erfolgreich installiert!
pause

rem Beenden
exit /b 0