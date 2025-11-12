#!/bin/bash
# Quick push to GitHub after repository creation

echo "🚀 Pushing to GitHub..."
git remote add origin https://github.com/McMuff86/recipe-simplify.git
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Repository available at:"
echo "   https://github.com/McMuff86/recipe-simplify"

