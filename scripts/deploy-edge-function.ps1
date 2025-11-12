# Deployment Script für Recipe Extraction Edge Function

Write-Host "Recipe Extraction Edge Function - Deployment Script" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green
Write-Host ""

# Check if Supabase CLI is installed
Write-Host "Checking Supabase CLI..." -ForegroundColor Yellow
$supabaseInstalled = Get-Command supabase -ErrorAction SilentlyContinue

if (-not $supabaseInstalled) {
    Write-Host "❌ Supabase CLI ist nicht installiert!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Installationsoptionen:" -ForegroundColor Yellow
    Write-Host "1. Mit Scoop (empfohlen):" -ForegroundColor Cyan
    Write-Host "   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Gray
    Write-Host "   irm get.scoop.sh | iex" -ForegroundColor Gray
    Write-Host "   scoop bucket add supabase https://github.com/supabase/scoop-bucket.git" -ForegroundColor Gray
    Write-Host "   scoop install supabase" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Manueller Download:" -ForegroundColor Cyan
    Write-Host "   https://github.com/supabase/cli/releases" -ForegroundColor Gray
    Write-Host ""
    exit 1
}

Write-Host "✓ Supabase CLI gefunden" -ForegroundColor Green
Write-Host ""

# Project details
$projectRef = "lpxagwasrquoiknmkccw"
$functionName = "extract-recipe"

# Check if logged in
Write-Host "Checking Supabase Login Status..." -ForegroundColor Yellow
$loginCheck = supabase projects list 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Nicht bei Supabase eingeloggt!" -ForegroundColor Red
    Write-Host "Bitte führen Sie aus: supabase login" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ Bei Supabase eingeloggt" -ForegroundColor Green
Write-Host ""

# Link project
Write-Host "Verknüpfe Projekt..." -ForegroundColor Yellow
supabase link --project-ref $projectRef

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Fehler beim Verknüpfen des Projekts!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Projekt verknüpft" -ForegroundColor Green
Write-Host ""

# Check for OpenAI API Key
Write-Host "OpenAI API Key Setup..." -ForegroundColor Yellow
$openaiKey = Read-Host "Bitte geben Sie Ihren OpenAI API Key ein (oder Enter zum Überspringen)"

if ($openaiKey -ne "") {
    Write-Host "Setze OpenAI API Key als Secret..." -ForegroundColor Yellow
    $env:SUPABASE_SECRET_VALUE = $openaiKey
    supabase secrets set OPENAI_API_KEY=$openaiKey
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ OpenAI API Key gesetzt" -ForegroundColor Green
    } else {
        Write-Host "⚠ Fehler beim Setzen des API Keys" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠ OpenAI API Key übersprungen - bitte später manuell setzen mit:" -ForegroundColor Yellow
    Write-Host "  supabase secrets set OPENAI_API_KEY=your_key_here" -ForegroundColor Gray
}
Write-Host ""

# Deploy function
Write-Host "Deploying Edge Function '$functionName'..." -ForegroundColor Yellow
supabase functions deploy $functionName

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=====================================================" -ForegroundColor Green
    Write-Host "✓ Edge Function erfolgreich deployed!" -ForegroundColor Green
    Write-Host "=====================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Function URL:" -ForegroundColor Cyan
    Write-Host "https://$projectRef.supabase.co/functions/v1/$functionName" -ForegroundColor White
    Write-Host ""
    Write-Host "Beispiel-Request:" -ForegroundColor Cyan
    Write-Host @"
fetch('https://$projectRef.supabase.co/functions/v1/$functionName', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_SUPABASE_ANON_KEY'
  },
  body: JSON.stringify({
    url: 'https://example.com/recipe-page'
  })
})
"@ -ForegroundColor White
} else {
    Write-Host "❌ Fehler beim Deployen der Edge Function!" -ForegroundColor Red
    exit 1
}

