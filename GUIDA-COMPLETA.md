# 📋 Guida Visuale Step-by-Step

## 🎯 OBIETTIVO
Mettere online il tuo Ricettario Digitale GRATIS usando GitHub + Render.com

---

## PARTE 1: PREPARAZIONE (5 minuti) 📦

### Step 1: Verifica che Git sia installato

Apri il terminale/PowerShell nella cartella del progetto e digita:
```bash
git --version
```

**Se NON hai Git installato:**
1. Vai su: https://git-scm.com/download/win
2. Scarica e installa Git
3. Riavvia il terminale

---

## PARTE 2: GITHUB (10 minuti) 🐙

### Step 2: Crea un account GitHub

1. Vai su: **https://github.com**
2. Clicca "Sign up" in alto a destra
3. Inserisci:
   - Email
   - Password
   - Username (es: `mariosrossi`)
4. Verifica l'email e completa la registrazione

### Step 3: Crea un nuovo repository

1. Una volta loggato, clicca il **pulsante verde "New"** (o l'icona + in alto a destra → "New repository")

2. Compila il form:
   ```
   Repository name: ricettario-digitale
   Description: La mia app per gestire ricette
   Visibilità: Public (deve essere pubblico per il piano free di Render)
   
   NON selezionare:
   ❌ Add a README file
   ❌ Add .gitignore
   ❌ Choose a license
   ```

3. Clicca **"Create repository"**

4. **IMPORTANTE**: GitHub ti mostrerà una pagina con i comandi da eseguire. **TIENI APERTA QUESTA PAGINA!**

### Step 4: Carica il codice su GitHub

1. **Apri PowerShell** nella cartella `ricettario-digitale`
   - (Shift + Click destro nella cartella → "Apri finestra PowerShell qui")

2. **Esegui questi comandi UNO ALLA VOLTA**:

```bash
# Inizializza Git
git init

# Aggiungi tutti i file
git add .

# Crea il primo commit
git commit -m "First commit"

# Rinomina il branch in main
git branch -M main

# Collega al repository GitHub (SOSTITUISCI con il TUO URL!)
git remote add origin https://github.com/TUO_USERNAME/ricettario-digitale.git

# Carica su GitHub
git push -u origin main
```

**⚠️ ATTENZIONE**: Nella riga `git remote add origin`, sostituisci `TUO_USERNAME` con il tuo username GitHub!

3. GitHub ti chiederà username e password:
   - Username: il tuo username GitHub
   - Password: **NON la password!** Devi creare un **Personal Access Token**

### Step 4b: Crea un Personal Access Token (se necessario)

Se Git chiede la password e non funziona:

1. Vai su: https://github.com/settings/tokens
2. Clicca "Generate new token" → "Generate new token (classic)"
3. Nome: `Ricettario Deploy`
4. Scadenza: `No expiration`
5. Seleziona **solo**: `repo` (seleziona tutta la sezione)
6. Clicca "Generate token" in fondo
7. **COPIA IL TOKEN** (lo vedrai solo una volta!)
8. Usa questo token al posto della password quando Git lo chiede

---

## PARTE 3: RENDER.COM (5 minuti) 🚀

### Step 5: Crea account su Render

1. Vai su: **https://render.com**
2. Clicca **"Get Started for Free"**
3. Scegli **"Sign in with GitHub"** (più veloce!)
4. Autorizza Render ad accedere al tuo GitHub

### Step 6: Crea il Web Service

1. Clicca il pulsante **"New +"** in alto a destra
2. Seleziona **"Web Service"**
3. Clicca **"Connect account"** per dare accesso ai tuoi repository
4. Trova `ricettario-digitale` nella lista e clicca **"Connect"**

### Step 7: Configura il deployment

Compila il form con questi valori:

```
Name: ricettario-digitale

Region: Frankfurt (o la più vicina)

Branch: main

Root Directory: (lascia vuoto)

Runtime: Node

Build Command: npm install

Start Command: npm start

Instance Type: Free
```

### Step 8: Deploy!

1. Scorri in fondo e clicca il grosso pulsante blu **"Create Web Service"**

2. Render inizierà a:
   - ✅ Scaricare il codice da GitHub
   - ✅ Installare le dipendenze (`npm install`)
   - ✅ Avviare il server

3. **Vedrai i log in tempo reale!** Aspetta fino a vedere:
   ```
   ==> Build successful 🎉
   ==> Starting service...
   ```

4. In alto vedrai l'URL del tuo sito:
   ```
   https://ricettario-digitale-xxxx.onrender.com
   ```

5. **Clicca sull'URL** e... 🎉 **IL TUO SITO È ONLINE!**

---

## ✅ VERIFICA CHE FUNZIONI

Apri il tuo sito e controlla:
- ✅ Si vedono le 4 ricette di esempio
- ✅ La ricerca funziona
- ✅ Puoi aggiungere una nuova ricetta
- ✅ Puoi modificare ed eliminare ricette

---

## 🔄 COME AGGIORNARE IL SITO

Quando modifichi il codice in locale:

```bash
# Salva le modifiche
git add .
git commit -m "Descrivi cosa hai modificato"
git push

# Render farà automaticamente il re-deploy!
```

---

## ⚠️ NOTA IMPORTANTE (Piano Free di Render)

**Il servizio si "addormenta" dopo 15 minuti di inattività**

Quando qualcuno visita il sito dopo che si è addormentato:
- Prima richiesta: **30-60 secondi** (si sta risvegliando)
- Richieste successive: **velocissime**

**È completamente normale!** È così che funziona il piano free.

---

## 🎁 BONUS: Condividi il tuo sito!

Ora puoi condividere l'URL con amici e famiglia:
```
https://ricettario-digitale-xxxx.onrender.com
```

Tutti possono:
- ✅ Vedere le ricette
- ✅ Aggiungere nuove ricette
- ✅ Modificare ricette esistenti
- ✅ Cercare e filtrare

---

## 🐛 Problemi Comuni

### "git is not recognized"
→ Git non è installato. Scarica da: https://git-scm.com

### "Permission denied" durante git push
→ Hai inserito la password sbagliata. Usa il Personal Access Token!

### Il sito Render dice "Build failed"
→ Controlla i log. Probabilmente manca un file. Verifica su GitHub che tutti i file siano stati caricati.

### Il sito è lento
→ È normale la prima volta (si sta risvegliando). Aspetta 30-60 secondi.

### Modifico il codice ma il sito non cambia
→ Hai fatto `git push`? Render aggiorna solo quando riceve nuovi commit.

---

## 📞 Hai bisogno di aiuto?

1. Controlla i **logs** su Render (tab "Logs")
2. Controlla su GitHub che i file siano stati caricati correttamente
3. Prova a fare un nuovo deployment da Render: "Manual Deploy" → "Deploy latest commit"

---

**🎉 CONGRATULAZIONI! Il tuo sito è online! 🎉**
