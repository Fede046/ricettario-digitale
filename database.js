const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'recipes.db');

let db;
let SQL;

// Inizializza il database
async function initDatabase() {
  SQL = await initSqlJs();
  
  // Carica il database esistente o crea uno nuovo
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Creazione della tabella delle ricette
  const createTable = `
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titolo TEXT NOT NULL,
      ingredienti TEXT NOT NULL,
      istruzioni TEXT NOT NULL,
      tempo_preparazione INTEGER DEFAULT 0,
      porzioni INTEGER DEFAULT 1,
      categoria TEXT DEFAULT 'Altro',
      immagine TEXT DEFAULT '',
      calorie INTEGER DEFAULT 0,
      proteine REAL DEFAULT 0,
      carboidrati REAL DEFAULT 0,
      grassi REAL DEFAULT 0,
      data_creazione DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createTable);

  // Seed di alcune ricette iniziali se la tabella è vuota
  const result = db.exec('SELECT COUNT(*) as count FROM recipes');
  const count = result.length > 0 ? result[0].values[0][0] : 0;

  if (count === 0) {
    const seedRecipes = [
      {
        titolo: 'Pasta alla Carbonara',
        ingredienti: `400g spaghetti
200g guanciale
4 tuorli d'uovo
100g pecorino romano
Pepe nero q.b.`,
        istruzioni: `1. Tagliare il guanciale a cubetti e rosolarlo in padella fino a renderlo croccante.
2. In una ciotola, sbattere i tuorli con il pecorino grattugiato e abbondante pepe nero.
3. Cuocere gli spaghetti in acqua salata al dente.
4. Scolare la pasta e versarla nella padella con il guanciale, spegnendo il fuoco.
5. Aggiungere il composto di uova e mescolare rapidamente per creare una crema.
6. Servire immediatamente con altro pecorino e pepe nero.`,
        tempo_preparazione: 25,
        porzioni: 4,
        categoria: 'Primi',
        immagine: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600',
        calorie: 650,
        proteine: 28.5,
        carboidrati: 72.0,
        grassi: 25.0
      },
      {
        titolo: 'Tiramisù Classico',
        ingredienti: `500g mascarpone
300g savoiardi
4 uova
150g zucchero
Caffè espresso q.b.
Cacao in polvere q.b.`,
        istruzioni: `1. Separare i tuorli dagli albumi.
2. Montare i tuorli con lo zucchero fino a ottenere una crema spumosa.
3. Aggiungere il mascarpone ai tuorli e mescolare bene.
4. Montare gli albumi a neve ferma e incorporarli delicatamente al composto.
5. Preparare il caffè espresso e lasciarlo raffreddare.
6. Inzuppare rapidamente i savoiardi nel caffè e disporli in uno strato in una teglia.
7. Coprire con uno strato di crema e ripetere fino ad esaurire gli ingredienti.
8. Refrigerare per almeno 4 ore.
9. Prima di servire, spolverizzare con cacao amaro.`,
        tempo_preparazione: 40,
        porzioni: 8,
        categoria: 'Dolci',
        immagine: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600',
        calorie: 425,
        proteine: 8.5,
        carboidrati: 38.0,
        grassi: 26.0
      },
      {
        titolo: 'Insalata Caprese',
        ingredienti: `4 pomodori maturi
500g mozzarella di bufala
Basilico fresco q.b.
Olio extravergine d'oliva q.b.
Sale e pepe q.b.`,
        istruzioni: `1. Lavare accuratamente i pomodori e tagliarli a fette spesse.
2. Tagliare la mozzarella a fette dello stesso spessore.
3. Disporre alternativamente pomodori e mozzarella su un piatto da portata.
4. Aggiungere alcune foglie di basilico tra le fette.
5. Condire con olio extravergine d'oliva, sale e pepe nero macinato.
6. Servire immediatamente a temperatura ambiente.`,
        tempo_preparazione: 10,
        porzioni: 4,
        categoria: 'Antipasti',
        immagine: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600',
        calorie: 280,
        proteine: 18.0,
        carboidrati: 8.0,
        grassi: 20.0
      },
      {
        titolo: 'Risotto ai Funghi Porcini',
        ingredienti: `300g riso Carnaroli
200g funghi porcini freschi
1 cipolla piccola
100ml vino bianco
1L brodo vegetale
50g burro
50g parmigiano grattugiato
Prezzemolo q.b.`,
        istruzioni: `1. Pulire i funghi e tagliarli a pezzi. Rosolarne metà in padella con un filo d'olio.
2. Tritare la cipolla e stufarla nel burro. Aggiungere il riso e tostarlo per 2 minuti.
3. Sfumare con il vino bianco e mescolare fino a evaporazione.
4. Aggiungere i funghi crudi e cominciare a versare il brodo caldo poco alla volta.
5. Cuocere per circa 18-20 minuti, mescolando frequentemente.
6. A metà cottura, unire i funghi rosolati.
7. A fine cottura, spegnere il fuoco e mantecare con burro e parmigiano.
8. Guarnire con prezzemolo fresco e servire.`,
        tempo_preparazione: 45,
        porzioni: 4,
        categoria: 'Primi',
        immagine: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600',
        calorie: 480,
        proteine: 12.0,
        carboidrati: 65.0,
        grassi: 16.0
      }
    ];

    seedRecipes.forEach(recipe => {
      db.run(`
        INSERT INTO recipes (titolo, ingredienti, istruzioni, tempo_preparazione, porzioni, categoria, immagine, calorie, proteine, carboidrati, grassi)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        recipe.titolo,
        recipe.ingredienti,
        recipe.istruzioni,
        recipe.tempo_preparazione,
        recipe.porzioni,
        recipe.categoria,
        recipe.immagine,
        recipe.calorie,
        recipe.proteine,
        recipe.carboidrati,
        recipe.grassi
      ]);
    });

    console.log('Database inizializzato con ricette di esempio');
  }

  // Salva il database su disco
  saveDatabase();
}

// Funzione per salvare il database su disco
function saveDatabase() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

// Wrapper per eseguire query SELECT
function query(sql, params = []) {
  try {
    const result = db.exec(sql, params);
    if (result.length === 0) return [];
    
    const columns = result[0].columns;
    const values = result[0].values;
    
    return values.map(row => {
      const obj = {};
      columns.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

// Wrapper per eseguire query INSERT/UPDATE/DELETE
function run(sql, params = []) {
  try {
    db.run(sql, params);
    saveDatabase();
    
    // Per INSERT, ottieni l'ultimo ID inserito
    const lastIdResult = db.exec('SELECT last_insert_rowid() as id');
    const lastId = lastIdResult[0]?.values[0]?.[0] || null;
    
    return { lastInsertRowid: lastId, changes: 1 };
  } catch (error) {
    console.error('Run error:', error);
    throw error;
  }
}

// Esporta le funzioni e l'inizializzazione
module.exports = {
  initDatabase,
  query,
  run,
  saveDatabase
};
