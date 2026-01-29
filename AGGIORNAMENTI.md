# 🎉 Aggiornamento: Valori Nutrizionali

## Novità

È stata aggiunta la funzionalità per inserire e visualizzare i **valori nutrizionali** di ogni ricetta!

## Cosa è cambiato

### Database
- Aggiunti 4 nuovi campi alla tabella `recipes`:
  - `calorie` (INTEGER) - Calorie in kcal
  - `proteine` (REAL) - Proteine in grammi
  - `carboidrati` (REAL) - Carboidrati in grammi
  - `grassi` (REAL) - Grassi in grammi

### Interfaccia Utente

#### Form di Aggiunta/Modifica Ricetta
Ora include una nuova sezione "**Valori Nutrizionali (per porzione)**" con campi per:
- Calorie (kcal)
- Proteine (g)
- Carboidrati (g)
- Grassi (g)

Tutti i campi sono opzionali e accettano numeri decimali per maggiore precisione.

#### Visualizzazione Dettaglio Ricetta
Quando visualizzi una ricetta che ha valori nutrizionali inseriti, vedrai una nuova sezione con una griglia colorata che mostra:
- 🔥 Calorie
- 💪 Proteine
- 🍞 Carboidrati
- 🥑 Grassi

La sezione appare solo se almeno uno dei valori nutrizionali è stato inserito.

## Ricette di Esempio Aggiornate

Le 4 ricette di esempio sono state aggiornate con valori nutrizionali realistici:

### Pasta alla Carbonara
- Calorie: 650 kcal
- Proteine: 28.5g
- Carboidrati: 72.0g
- Grassi: 25.0g

### Tiramisù Classico
- Calorie: 425 kcal
- Proteine: 8.5g
- Carboidrati: 38.0g
- Grassi: 26.0g

### Insalata Caprese
- Calorie: 280 kcal
- Proteine: 18.0g
- Carboidrati: 8.0g
- Grassi: 20.0g

### Risotto ai Funghi Porcini
- Calorie: 480 kcal
- Proteine: 12.0g
- Carboidrati: 65.0g
- Grassi: 16.0g

## Come Usare la Nuova Funzionalità

### Aggiungere una Nuova Ricetta con Valori Nutrizionali

1. Clicca su "**Aggiungi Ricetta**"
2. Inserisci il PIN (2004)
3. Compila i campi normali (titolo, ingredienti, ecc.)
4. Scorri fino alla sezione "**Valori Nutrizionali (per porzione)**"
5. Inserisci i valori che conosci (tutti opzionali)
6. Salva la ricetta

### Modificare i Valori Nutrizionali di una Ricetta Esistente

1. Clicca su una ricetta per visualizzare i dettagli
2. Clicca su "**Modifica**"
3. Inserisci il PIN (2004)
4. Scorri fino alla sezione valori nutrizionali
5. Modifica o aggiungi i valori
6. Clicca su "**Aggiorna Ricetta**"

## Note Tecniche

### Compatibilità con Database Esistenti

⚠️ **IMPORTANTE**: Se hai già un database `recipes.db` esistente, dovrai eliminarlo per far sì che il sistema crei uno nuovo con i campi aggiornati.

```bash
# Nella cartella del progetto:
rm recipes.db
npm start
```

Il database verrà ricreato automaticamente con le 4 ricette di esempio aggiornate.

### Migrazione Manuale (Opzionale)

Se vuoi mantenere le tue ricette esistenti, puoi aggiungere i nuovi campi manualmente al database:

```sql
ALTER TABLE recipes ADD COLUMN calorie INTEGER DEFAULT 0;
ALTER TABLE recipes ADD COLUMN proteine REAL DEFAULT 0;
ALTER TABLE recipes ADD COLUMN carboidrati REAL DEFAULT 0;
ALTER TABLE recipes ADD COLUMN grassi REAL DEFAULT 0;
```

## API Aggiornata

Gli endpoint API ora accettano e restituiscono i nuovi campi:

### POST /api/recipes
```json
{
  "titolo": "Pasta al Pomodoro",
  "ingredienti": "...",
  "istruzioni": "...",
  "categoria": "Primi",
  "tempo_preparazione": 20,
  "porzioni": 4,
  "immagine": "...",
  "calorie": 380,
  "proteine": 12.5,
  "carboidrati": 68.0,
  "grassi": 6.5
}
```

### PUT /api/recipes/:id
Stesso formato del POST, tutti i campi nutrizionali sono opzionali.

### GET /api/recipes & GET /api/recipes/:id
La risposta ora include i campi nutrizionali:
```json
{
  "id": 1,
  "titolo": "...",
  ...
  "calorie": 380,
  "proteine": 12.5,
  "carboidrati": 68.0,
  "grassi": 6.5
}
```

## Design e Styling

### Nuovi Stili CSS

Sono stati aggiunti stili per:
- `.form-section-title` - Titolo delle sezioni nel form
- `.nutrition-grid` - Griglia per i valori nutrizionali
- `.nutrition-item` - Singolo elemento nutrizionale
- `.nutrition-value` - Valore numerico grande
- `.nutrition-label` - Etichetta descrittiva

### Responsive Design
La griglia dei valori nutrizionali si adatta automaticamente:
- Desktop: 4 colonne
- Tablet: 2 colonne
- Mobile: 1-2 colonne (a seconda dello spazio disponibile)

## Benefici

✅ **Tracciamento nutrizionale** - Monitora l'apporto calorico e i macronutrienti
✅ **Pianificazione pasti** - Scegli ricette in base ai tuoi obiettivi nutrizionali
✅ **Informazione completa** - Tutte le info in un unico posto
✅ **Flessibilità** - I campi sono opzionali, non obbligatori
✅ **Precisione** - Supporto per valori decimali (es. 12.5g)

## Prossimi Passi Consigliati

Se vuoi estendere ulteriormente questa funzionalità, potresti considerare:

1. **Calcolo automatico** - Integrazione con API di dati nutrizionali
2. **Micronutrienti** - Aggiungere vitamine, minerali, fibre
3. **Grafici** - Visualizzazione grafica della composizione nutrizionale
4. **Filtri** - Filtrare ricette per range di calorie o macro
5. **Obiettivi giornalieri** - Tracciamento dei pasti giornalieri
6. **Porzioni personalizzate** - Ricalcolo automatico per N porzioni

---

**Buon appetito (e buona salute)! 🍽️💚**
