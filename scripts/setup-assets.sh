#!/bin/bash
set -e
PHOTO="$HOME/Desktop/PERSO/Diagonal/Drop 2/Photo"
ROOT="$HOME/Desktop/PERSO/Diagonal/Drop 2"
PUB="$(pwd)/public"
brctl download "$ROOT" 2>/dev/null || true
brctl download "$PHOTO" 2>/dev/null || true
sleep 5
mkdir -p "$PUB/brand" "$PUB/products" "$PUB/lookbook" "$PUB/icons"
cp_safe() { if [ -e "$1" ] && [ -s "$1" ]; then cp -f "$1" "$2" && echo "  ok $(basename "$2")"; else echo "  ?? manquant: $(basename "$1")"; fi; }

echo "Logos"
cp_safe "$PHOTO/logo diagonal blanc.png"     "$PUB/brand/logo-white.png"
cp_safe "$PHOTO/logo diagonal basique.png"   "$PUB/brand/logo-black.png"

echo "Brand"
cp_safe "$ROOT/Bannière-site.webp"           "$PUB/brand/banner.webp"

echo "Beige"
cp_safe "$PHOTO/photo beige.webp"            "$PUB/products/beige-1.webp"
cp_safe "$PHOTO/1er beige.png"               "$PUB/products/beige-1.png"
cp_safe "$PHOTO/2e Beige.webp"               "$PUB/products/beige-back.webp"

echo "Blanc"
cp_safe "$PHOTO/1er blanc.webp"              "$PUB/products/white-1.webp"
cp_safe "$PHOTO/2e blanc.webp"               "$PUB/products/white-back.webp"

echo "Bleu"
cp_safe "$PHOTO/1er bleu.webp"               "$PUB/products/blue-1.webp"
cp_safe "$PHOTO/2e bleu.png"                 "$PUB/products/blue-back.png"

echo "Noir"
cp_safe "$PHOTO/1er noir.webp"               "$PUB/products/black-1.webp"
cp_safe "$PHOTO/2e noir.png"                 "$PUB/products/black-back.png"

echo "Marron"
cp_safe "$PHOTO/1er marron.png"              "$PUB/products/brown-1.png"

echo ""
echo "Termine. Recharge http://localhost:3000 (Cmd+Shift+R)"
