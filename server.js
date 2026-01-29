const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase, query, run, saveDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// API Routes

// GET: Recupera tutte le ricette (con opzionale ricerca)
app.get('/api/recipes', (req, res) => {
  try {
    const search = req.query.search || '';
    let sql = 'SELECT * FROM recipes';
    let params = [];

    if (search) {
      sql += ' WHERE titolo LIKE ? OR categoria LIKE ? OR ingredienti LIKE ?';
      const searchTerm = `%${search}%`;
      params = [searchTerm, searchTerm, searchTerm];
    }

    sql += ' ORDER BY data_creazione DESC';

    const recipes = query(sql, params);
    res.json(recipes);
  } catch (error) {
    console.error('Errore nel recupero ricette:', error);
    res.status(500).json({ error: 'Errore nel recupero delle ricette' });
  }
});

// GET: Recupera una singola ricetta per ID
app.get('/api/recipes/:id', (req, res) => {
  try {
    const recipes = query('SELECT * FROM recipes WHERE id = ?', [req.params.id]);
    const recipe = recipes[0];

    if (!recipe) {
      return res.status(404).json({ error: 'Ricetta non trovata' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Errore nel recupero ricetta:', error);
    res.status(500).json({ error: 'Errore nel recupero della ricetta' });
  }
});

// POST: Crea una nuova ricetta
app.post('/api/recipes', (req, res) => {
  try {
    const { titolo, ingredienti, istruzioni, tempo_preparazione, porzioni, categoria, immagine, calorie, proteine, carboidrati, grassi } = req.body;

    // Validazione
    if (!titolo || !ingredienti || !istruzioni) {
      return res.status(400).json({ error: 'Titolo, ingredienti e istruzioni sono obbligatori' });
    }

    const result = run(`
      INSERT INTO recipes (titolo, ingredienti, istruzioni, tempo_preparazione, porzioni, categoria, immagine, calorie, proteine, carboidrati, grassi)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      titolo,
      ingredienti,
      istruzioni,
      tempo_preparazione || 0,
      porzioni || 1,
      categoria || 'Altro',
      immagine || '',
      calorie || 0,
      proteine || 0,
      carboidrati || 0,
      grassi || 0
    ]);

    const newRecipes = query('SELECT * FROM recipes WHERE id = ?', [result.lastInsertRowid]);
    const newRecipe = newRecipes[0];

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Errore nella creazione ricetta:', error);
    res.status(500).json({ error: 'Errore nella creazione della ricetta' });
  }
});

// PUT: Aggiorna una ricetta esistente
app.put('/api/recipes/:id', (req, res) => {
  try {
    const { titolo, ingredienti, istruzioni, tempo_preparazione, porzioni, categoria, immagine, calorie, proteine, carboidrati, grassi } = req.body;
    const { id } = req.params;

    // Verifica che la ricetta esista
    const existingRecipes = query('SELECT * FROM recipes WHERE id = ?', [id]);
    const existing = existingRecipes[0];
    
    if (!existing) {
      return res.status(404).json({ error: 'Ricetta non trovata' });
    }

    run(`
      UPDATE recipes
      SET titolo = ?, ingredienti = ?, istruzioni = ?, tempo_preparazione = ?, porzioni = ?, categoria = ?, immagine = ?, calorie = ?, proteine = ?, carboidrati = ?, grassi = ?
      WHERE id = ?
    `, [
      titolo || existing.titolo,
      ingredienti || existing.ingredienti,
      istruzioni || existing.istruzioni,
      tempo_preparazione || existing.tempo_preparazione,
      porzioni || existing.porzioni,
      categoria || existing.categoria,
      immagine !== undefined ? immagine : existing.immagine,
      calorie !== undefined ? calorie : existing.calorie,
      proteine !== undefined ? proteine : existing.proteine,
      carboidrati !== undefined ? carboidrati : existing.carboidrati,
      grassi !== undefined ? grassi : existing.grassi,
      id
    ]);

    const updatedRecipes = query('SELECT * FROM recipes WHERE id = ?', [id]);
    const updatedRecipe = updatedRecipes[0];

    res.json(updatedRecipe);
  } catch (error) {
    console.error('Errore nell\'aggiornamento ricetta:', error);
    res.status(500).json({ error: 'Errore nell\'aggiornamento della ricetta' });
  }
});

// DELETE: Elimina una ricetta
app.delete('/api/recipes/:id', (req, res) => {
  try {
    const result = run('DELETE FROM recipes WHERE id = ?', [req.params.id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Ricetta non trovata' });
    }

    res.json({ message: 'Ricetta eliminata con successo' });
  } catch (error) {
    console.error('Errore nell\'eliminazione ricetta:', error);
    res.status(500).json({ error: 'Errore nell\'eliminazione della ricetta' });
  }
});

// Servi il frontend per tutte le altre rotte
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Avvio del server
async function startServer() {
  try {
    await initDatabase();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server Ricettario Digitale in esecuzione su porta ${PORT}`);
      console.log(`Accessibile su http://localhost:${PORT}`);
      console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Errore nell\'avvio del server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
