# 🍝 Ricettario Digitale

Applicazione web per la gestione di ricette di cucina, ora **senza dipendenze di compilazione C++**!

## ✅ Problema Risolto

Ho sostituito `better-sqlite3` (che richiedeva Visual Studio Build Tools su Windows) con `sql.js`, che funziona in JavaScript puro senza bisogno di compilazione.

## 📦 Installazione

### Passo 1: Installa le dipendenze

```bash
npm install
```

Questo comando ora **funzionerà senza errori** perché non richiede più strumenti di compilazione C++.

### Passo 2: Avvia il server

```bash
npm start
```

### Passo 3: Apri il browser

Vai su: **http://localhost:3000**

## 🎯 Cosa Aspettarsi

Quando avvii il server, vedrai:

```
Database inizializzato con ricette di esempio
Server Ricettario Digitale in esecuzione su porta 3000
Accessibile su http://localhost:3000
Ambiente: development
```

L'applicazione caricherà automaticamente 4 ricette di esempio:
- ✅ Pasta alla Carbonara
- ✅ Tiramisù Classico
- ✅ Insalata Caprese
- ✅ Risotto ai Funghi Porcini

## 📁 Struttura del Progetto

```
ricettario-digitale/
├── server.js          # Server Express (backend)
├── database.js        # Gestione database SQLite con sql.js
├── app.js            # Logica frontend JavaScript
├── index.html        # Interfaccia HTML
├── style.css         # Stili CSS
├── package.json      # Dipendenze del progetto
└── recipes.db        # Database SQLite (creato automaticamente)
```

## 🔧 Modifiche Tecniche Apportate

### Prima (con problemi):
- **Database**: `better-sqlite3` ❌ (richiede Visual Studio Build Tools)
- **Errore**: "Could not find any Visual Studio installation to use"

### Dopo (funzionante):
- **Database**: `sql.js` ✅ (JavaScript puro, nessuna compilazione)
- **Risultato**: Installazione immediata senza errori

## ✨ Funzionalità

- 📖 **Visualizza ricette** con immagini e dettagli
- 🔍 **Cerca ricette** per titolo, categoria o ingredienti
- 🏷️ **Filtra per categoria** (Antipasti, Primi, Secondi, Dolci, Altro)
- ➕ **Aggiungi nuove ricette** con form completo
- ✏️ **Modifica ricette** esistenti
- 🗑️ **Elimina ricette** con conferma
- 💾 **Persistenza dati** automatica su file SQLite

## 🐛 Risoluzione Problemi

### Il server non parte
```bash
# Verifica che la porta 3000 sia libera
netstat -ano | findstr :3000

# Se occupata, cambia porta:
# Modifica package.json:
"start": "set PORT=3001 && node server.js"
```

### "Cannot find module 'sql.js'"
```bash
# Reinstalla le dipendenze
rm -rf node_modules
npm install
```

### Il database non si crea
```bash
# Verifica i permessi della cartella
# Assicurati di avere permessi di scrittura nella directory del progetto
```

### Errori nel browser (Console F12)
- Controlla che il server sia avviato
- Verifica che l'URL sia `http://localhost:3000` (non `file://`)
- Controlla la console per errori JavaScript

## 🚀 Script Disponibili

```bash
npm start     # Avvia il server in modalità produzione
npm run dev   # Avvia il server in modalità sviluppo (uguale a start)
```

## 📝 Note Tecniche

- **Node.js**: Richiede Node.js 14 o superiore
- **Database**: SQLite gestito tramite sql.js (in-memory con persistenza su file)
- **Backend**: Express.js per le API REST
- **Frontend**: Vanilla JavaScript (nessun framework)
- **Stile**: CSS personalizzato con design moderno

## 🎨 API Endpoints

```
GET    /api/recipes          # Ottieni tutte le ricette (opzionale ?search=...)
GET    /api/recipes/:id      # Ottieni una ricetta specifica
POST   /api/recipes          # Crea nuova ricetta
PUT    /api/recipes/:id      # Aggiorna ricetta
DELETE /api/recipes/:id      # Elimina ricetta
```

## 💡 Suggerimenti

1. **Backup del database**: Fai una copia di `recipes.db` periodicamente
2. **Immagini**: Usa URL di immagini online (Unsplash, etc.)
3. **Personalizzazione**: Modifica `style.css` per cambiare colori e stili

## 📸 Screenshots

L'applicazione mostra:
- Header con logo, ricerca e pulsante "Aggiungi Ricetta"
- Filtri per categoria con stile pill
- Griglia di card per le ricette
- Modal per aggiungere/modificare ricette
- Modal per visualizzare i dettagli completi

## 🤝 Supporto

Se hai problemi:
1. Verifica di essere nella cartella corretta (`cd ricettario-digitale`)
2. Controlla che Node.js sia installato (`node --version`)
3. Leggi i messaggi di errore nel terminale
4. Controlla la console del browser (F12)

---

**Buon appetito! 🍕🍰🥗**
