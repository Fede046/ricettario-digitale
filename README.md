# Ricettario Digitale

Applicazione web per gestire le tue ricette di cucina preferite. Il progetto è stato configurato per funzionare senza dipendenze di compilazione C++, quindi l'installazione dovrebbe essere semplice e immediata.

## Problema risolto

Originariamente questo progetto usava `better-sqlite3`, che su Windows richiedeva Visual Studio Build Tools per compilare. L'ho sostituito con `sql.js`, che è scritto completamente in JavaScript e non richiede alcuna compilazione. Questo significa che l'installazione funziona subito senza dover configurare strumenti aggiuntivi.

## Come iniziare

### Installazione

Prima di tutto, installa le dipendenze:

```bash
npm install
```

Questo comando ora dovrebbe completarsi senza problemi, dato che non ci sono più dipendenze native da compilare.

### Avvio del server

Per avviare l'applicazione:

```bash
npm start
```

Poi apri il browser e vai su http://localhost:3000

## Cosa aspettarsi

Quando avvii il server per la prima volta, vedrai un messaggio simile a questo nel terminale:

```
Database inizializzato con ricette di esempio
Server Ricettario Digitale in esecuzione su porta 3000
Accessibile su http://localhost:3000
Ambiente: development
```

L'applicazione viene fornita con 4 ricette di esempio già caricate:
- Pasta alla Carbonara
- Tiramisù Classico
- Insalata Caprese
- Risotto ai Funghi Porcini

## Struttura del progetto

```
ricettario-digitale/
├── server.js          # Server Express (backend)
├── database.js        # Gestione database SQLite
├── app.js            # Logica frontend
├── index.html        # Interfaccia utente
├── style.css         # Stili
├── package.json      # Configurazione progetto
└── recipes.db        # Database (viene creato automaticamente)
```

## Dettagli tecnici

### Cambiamenti dalla versione precedente

**Prima:**
- Database: `better-sqlite3` (richiedeva Visual Studio Build Tools)
- Errore comune: "Could not find any Visual Studio installation to use"

**Adesso:**
- Database: `sql.js` (JavaScript puro, nessuna compilazione necessaria)
- Risultato: installazione senza errori

### Stack tecnologico

- Node.js: versione 14 o superiore
- Database: SQLite gestito tramite sql.js (in-memory con persistenza su file)
- Backend: Express.js per le API REST
- Frontend: Vanilla JavaScript, nessun framework
- Stile: CSS custom con design moderno

## Funzionalità

L'applicazione permette di:

- Visualizzare ricette con immagini e dettagli completi
- Cercare ricette per titolo, categoria o ingredienti
- Filtrare per categoria (Antipasti, Primi, Secondi, Dolci, Altro)
- Aggiungere nuove ricette tramite un form completo
- Modificare ricette esistenti
- Eliminare ricette con conferma
- Tutti i dati vengono salvati automaticamente nel database SQLite

## API Endpoints

L'applicazione espone le seguenti API REST:

```
GET    /api/recipes          # Ottieni tutte le ricette (supporta ?search=...)
GET    /api/recipes/:id      # Ottieni una ricetta specifica
POST   /api/recipes          # Crea una nuova ricetta
PUT    /api/recipes/:id      # Aggiorna una ricetta
DELETE /api/recipes/:id      # Elimina una ricetta
```

## Risoluzione problemi

### Il server non si avvia

Se la porta 3000 è già occupata, puoi verificarlo con:

```bash
netstat -ano | findstr :3000
```

E poi cambiare porta modificando il package.json:

```json
"start": "set PORT=3001 && node server.js"
```

### "Cannot find module 'sql.js'"

Prova a reinstallare le dipendenze:

```bash
rm -rf node_modules
npm install
```

### Il database non viene creato

Controlla di avere i permessi di scrittura nella directory del progetto. Su sistemi Unix/Mac, puoi verificarlo con:

```bash
ls -la
```

### Errori nel browser

Se riscontri problemi nel browser:
- Assicurati che il server sia avviato
- Verifica di usare `http://localhost:3000` e non un percorso file locale
- Apri la console del browser (F12) per vedere eventuali errori JavaScript

## Script disponibili

```bash
npm start     # Avvia il server
npm run dev   # Avvia il server (identico a start)
```

## Suggerimenti

Alcuni consigli per usare al meglio l'applicazione:

1. Fai periodicamente un backup del file `recipes.db` per non perdere i tuoi dati
2. Per le immagini delle ricette, usa URL di immagini online (ad esempio da Unsplash)
3. Puoi personalizzare l'aspetto modificando il file `style.css`

## Interfaccia

L'applicazione include:
- Un header con logo, barra di ricerca e pulsante per aggiungere ricette
- Filtri per categoria con design moderno
- Una griglia responsive di card per visualizzare le ricette
- Un modale per aggiungere o modificare ricette
- Un modale per visualizzare i dettagli completi di ogni ricetta

## Supporto

Se incontri problemi:

1. Verifica di essere nella directory corretta del progetto
2. Controlla che Node.js sia installato correttamente (`node --version`)
3. Leggi attentamente i messaggi di errore nel terminale
4. Controlla la console del browser (premi F12) per errori JavaScript

---

Buon appetito!
