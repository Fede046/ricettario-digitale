# 🚀 Guida al Deployment - Ricettario Digitale

## Opzione 1: Render.com (CONSIGLIATO - Più Facile) ⭐

### Passo 1: Crea un account GitHub e carica il progetto

1. **Vai su** [github.com](https://github.com) e crea un account (se non ce l'hai già)

2. **Crea un nuovo repository**:
   - Clicca su "New repository" (pulsante verde in alto a destra)
   - Nome: `ricettario-digitale`
   - Tipo: **Public** (gratis)
   - NON aggiungere README, .gitignore o license (li abbiamo già)
   - Clicca "Create repository"

3. **Carica il codice su GitHub**:
   ```bash
   # Nella cartella ricettario-digitale, esegui:
   git init
   git add .
   git commit -m "First commit"
   git branch -M main
   git remote add origin https://github.com/TUO_USERNAME/ricettario-digitale.git
   git push -u origin main
   ```
   
   Sostituisci `TUO_USERNAME` con il tuo username GitHub!

### Passo 2: Deploy su Render.com

1. **Vai su** [render.com](https://render.com) e clicca "Get Started for Free"

2. **Registrati** usando il tuo account GitHub (più veloce)

3. **Crea un nuovo Web Service**:
   - Clicca "New +" in alto → "Web Service"
   - Connetti il repository GitHub `ricettario-digitale`
   - Clicca "Connect" accanto al repository

4. **Configura il servizio**:
   ```
   Name: ricettario-digitale
   Region: Frankfurt (o più vicino a te)
   Branch: main
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

5. **Clicca "Create Web Service"**

6. **Aspetta 2-3 minuti** per il deploy (vedrai i log in tempo reale)

7. **Il tuo sito sarà disponibile su**: `https://ricettario-digitale-XXXX.onrender.com`

### ⚠️ IMPORTANTE per Render (Piano Free):
- Il servizio si "addormenta" dopo 15 minuti di inattività
- Il primo accesso dopo il "sonno" impiegherà 30-60 secondi
- È gratuito per sempre, nessuna carta di credito richiesta!

---

## Opzione 2: Railway.app (Alternativa Eccellente) 🚂

### Passo 1: Carica su GitHub (vedi sopra se non l'hai già fatto)

### Passo 2: Deploy su Railway

1. **Vai su** [railway.app](https://railway.app)

2. **Clicca "Start a New Project"** e connetti GitHub

3. **Seleziona "Deploy from GitHub repo"**

4. **Scegli** il repository `ricettario-digitale`

5. **Railway rileverà automaticamente** che è un progetto Node.js

6. **Clicca "Deploy"**

7. **Vai su Settings** → **Generate Domain** per ottenere un URL pubblico

8. **Il tuo sito sarà disponibile su**: `https://ricettario-digitale.up.railway.app`

### 💎 Vantaggi di Railway:
- Non si addormenta (sempre attivo)
- Piano free: $5 di credito al mese (sufficiente per un piccolo progetto)
- Più veloce di Render

---

## Opzione 3: Vercel (Solo per test - SQLite limitato) ⚡

Vercel è ottimo ma ha limitazioni con SQLite perché è serverless (il database si resetta ad ogni deploy).

1. **Vai su** [vercel.com](https://vercel.com)
2. **Importa** il repository GitHub
3. **Deploy** automatico

⚠️ **NOTA**: Su Vercel il database SQLite NON persisterà tra i restart. Meglio usare Render o Railway!

---

## 🔧 Comandi Git Essenziali

```bash
# Prima volta - Inizializza il repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/ricettario-digitale.git
git push -u origin main

# Aggiornamenti successivi
git add .
git commit -m "Descrizione delle modifiche"
git push
```

---

## 📝 Checklist Pre-Deployment

✅ File `.gitignore` presente (esclude node_modules)
✅ `package.json` ha le engines specificate
✅ `server.js` usa `process.env.PORT` (già configurato)
✅ Nessun percorso assoluto nel codice
✅ Database usa percorsi relativi (`__dirname`)

---

## 🐛 Troubleshooting

### "Application failed to respond"
- Controlla che il PORT sia corretto: `process.env.PORT || 3000`
- Verifica i log del servizio

### Database si resetta
- Normale su Vercel (usa Render o Railway invece)
- Su Render/Railway, assicurati che la cartella sia scrivibile

### "Build failed"
```bash
# Prova localmente prima:
npm install
npm start
# Se funziona localmente, dovrebbe funzionare anche online
```

### Il sito è lento la prima volta
- Normale su Render piano free (il servizio si risveglia)
- Dopo il primo caricamento, sarà veloce

---

## 🎯 Raccomandazione Finale

**Per questo progetto, usa RENDER.COM**:
- ✅ 100% gratuito
- ✅ Supporta SQLite con persistenza
- ✅ Deploy automatico da GitHub
- ✅ Nessuna carta di credito richiesta
- ✅ Dominio HTTPS incluso
- ⚠️ Solo "svantaggio": si addormenta dopo 15 min (accettabile per un progetto personale)

---

## 📞 Supporto

Dopo il deploy, se hai problemi:
1. Controlla i **logs** sulla dashboard Render/Railway
2. Verifica che il **build** sia completato con successo
3. Testa l'URL generato nel browser
4. Controlla la console del browser (F12) per errori JavaScript

---

**Buon deployment! 🚀**
