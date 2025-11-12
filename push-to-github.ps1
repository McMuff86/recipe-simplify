# Push Recipe Simplify to GitHub
# This script pushes your local repository to GitHub

Write-Host "🚀 Recipe Simplify - GitHub Push Script" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green
Write-Host ""

$repoName = "recipe-simplify"
$username = "McMuff86"
$repoUrl = "https://github.com/$username/$repoName.git"

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Kein Git Repository gefunden!" -ForegroundColor Red
    Write-Host "Führe 'git init' aus zuerst." -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Git Repository gefunden" -ForegroundColor Green
Write-Host ""

# Check current status
Write-Host "📊 Repository Status:" -ForegroundColor Yellow
git status --short
Write-Host ""

# Check if there are uncommitted changes
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️  Uncommitted changes gefunden!" -ForegroundColor Yellow
    Write-Host ""
    $commit = Read-Host "Möchten Sie committen? (y/n)"
    
    if ($commit -eq "y") {
        Write-Host "Committing changes..." -ForegroundColor Yellow
        git add .
        $message = Read-Host "Commit Message"
        git commit -m "$message"
        Write-Host "✓ Changes committed" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "🔗 GitHub Repository Setup" -ForegroundColor Yellow
Write-Host "===========================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Repository wird erstellt unter:" -ForegroundColor Cyan
Write-Host "  $repoUrl" -ForegroundColor White
Write-Host ""

# Ask if the user has created the GitHub repository
Write-Host "⚠️  WICHTIG:" -ForegroundColor Yellow
Write-Host "Haben Sie das Repository auf GitHub erstellt?" -ForegroundColor Yellow
Write-Host "Gehen Sie zu: https://github.com/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repository Name: $repoName" -ForegroundColor White
Write-Host "❌ NICHT 'Initialize with README' ankreuzen!" -ForegroundColor Red
Write-Host ""

$created = Read-Host "Repository auf GitHub erstellt? (y/n)"

if ($created -ne "y") {
    Write-Host ""
    Write-Host "Bitte erstellen Sie zuerst das Repository auf GitHub:" -ForegroundColor Yellow
    Write-Host "  https://github.com/new" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Dann führen Sie dieses Skript nochmal aus." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🔗 Remote hinzufügen..." -ForegroundColor Yellow

# Check if remote already exists
$remotes = git remote
if ($remotes -contains "origin") {
    Write-Host "⚠️  Remote 'origin' existiert bereits" -ForegroundColor Yellow
    $remove = Read-Host "Möchten Sie es entfernen und neu setzen? (y/n)"
    
    if ($remove -eq "y") {
        git remote remove origin
        Write-Host "✓ Remote 'origin' entfernt" -ForegroundColor Green
    } else {
        Write-Host "Verwende existierenden Remote..." -ForegroundColor Yellow
    }
}

if (-not ($remotes -contains "origin")) {
    git remote add origin $repoUrl
    Write-Host "✓ Remote 'origin' hinzugefügt" -ForegroundColor Green
}

Write-Host ""
Write-Host "📤 Branch auf 'main' setzen..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ Branch auf 'main' gesetzt" -ForegroundColor Green

Write-Host ""
Write-Host "🚀 Push to GitHub..." -ForegroundColor Yellow
Write-Host ""

# Push to GitHub
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=======================================" -ForegroundColor Green
    Write-Host "✅ Erfolgreich zu GitHub gepusht!" -ForegroundColor Green
    Write-Host "=======================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository verfügbar unter:" -ForegroundColor Cyan
    Write-Host "  https://github.com/$username/$repoName" -ForegroundColor White
    Write-Host ""
    Write-Host "GitHub Actions:" -ForegroundColor Cyan
    Write-Host "  https://github.com/$username/$repoName/actions" -ForegroundColor White
    Write-Host ""
    Write-Host "🎉 Fertig! Sie können jetzt mit dem Frontend weitermachen!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Push fehlgeschlagen!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Mögliche Lösungen:" -ForegroundColor Yellow
    Write-Host "1. Stellen Sie sicher, dass das Repository auf GitHub existiert" -ForegroundColor Gray
    Write-Host "2. Überprüfen Sie Ihre Git-Credentials" -ForegroundColor Gray
    Write-Host "3. Versuchen Sie: git push -u origin main --force" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Für mehr Hilfe, siehe: setup-github-repo.md" -ForegroundColor Cyan
}

