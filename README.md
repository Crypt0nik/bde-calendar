# BDE — Calendrier Communication

Calendrier de communication interactif pour le BDE. Avril 2026.

## Setup local

```bash
npm install
npm run dev
```

Le site tourne sur `http://localhost:5173`

## Déployer sur Vercel

### Option 1 : Via GitHub (recommandé)
1. Push ce dossier sur un repo GitHub
2. Va sur [vercel.com](https://vercel.com) → "Add New Project"
3. Importe ton repo GitHub
4. Vercel détecte automatiquement Vite → clique "Deploy"
5. C'est en ligne

### Option 2 : Via CLI
```bash
npm i -g vercel
vercel
```

## Modifier pour un nouveau mois

Le fichier principal est `src/App.jsx`. Pour adapter au mois de mai :

1. Modifie l'objet `EVENTS` avec les nouveaux jours et contenus
2. Modifie `EVENT_RECAP` avec les nouvelles fiches events
3. Ajuste `startOffset` (le jour de la semaine du 1er du mois, 0=Lun)
4. Ajuste le nombre total de jours (30 → 31, etc.)
5. Change les titres/dates dans le header

## Stack

- React 18
- Vite 6
- Pas de dépendance CSS externe (tout en inline)
- Fonts : Google Fonts (Instrument Serif, DM Sans, JetBrains Mono)
