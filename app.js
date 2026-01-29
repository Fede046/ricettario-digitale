// API Base URL
const API_URL = '/api/recipes';

// Security PIN
const SECURITY_PIN = '2004';

// State
let allRecipes = [];
let currentCategory = 'tutti';
let editingRecipeId = null;

// DOM Elements
const recipesGrid = document.getElementById('recipesGrid');
const loading = document.getElementById('loading');
const noRecipes = document.getElementById('noRecipes');
const searchInput = document.getElementById('searchInput');
const recipeModal = document.getElementById('recipeModal');
const detailModal = document.getElementById('detailModal');
const recipeForm = document.getElementById('recipeForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  fetchRecipes();
  setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
  // Search input
  searchInput.addEventListener('input', debounce(handleSearch, 300));

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => handleFilterClick(btn));
  });

  // Modal buttons
  document.getElementById('openModalBtn').addEventListener('click', () => openAddModal());
  document.getElementById('firstRecipeBtn').addEventListener('click', () => openAddModal());
  document.getElementById('closeModalBtn').addEventListener('click', closeAddModal);
  document.getElementById('cancelBtn').addEventListener('click', closeAddModal);
  document.getElementById('closeDetailBtn').addEventListener('click', closeDetailModal);

  // Form submission
  recipeForm.addEventListener('submit', handleFormSubmit);

  // Modal overlay click to close
  recipeModal.addEventListener('click', (e) => {
    if (e.target === recipeModal) closeAddModal();
  });

  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) closeDetailModal();
  });

  // Detail modal actions
  document.getElementById('deleteBtn').addEventListener('click', handleDelete);
  document.getElementById('editBtn').addEventListener('click', handleEdit);
}

// Fetch all recipes
async function fetchRecipes() {
  try {
    loading.style.display = 'flex';
    noRecipes.style.display = 'none';
    recipesGrid.innerHTML = '';

    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Errore nel caricamento delle ricette');

    allRecipes = await response.json();
    renderRecipes();
  } catch (error) {
    console.error('Errore:', error);
    showToast('Errore nel caricamento delle ricette', 'error');
  } finally {
    loading.style.display = 'none';
  }
}

// Render recipes
function renderRecipes() {
  const filteredRecipes = filterRecipes();

  if (filteredRecipes.length === 0) {
    noRecipes.style.display = 'flex';
    recipesGrid.innerHTML = '';
    return;
  }

  noRecipes.style.display = 'none';
  recipesGrid.innerHTML = filteredRecipes.map(recipe => createRecipeCard(recipe)).join('');

  // Add click listeners to cards
  document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      openDetailModal(id);
    });
  });
}

// Create recipe card HTML
function createRecipeCard(recipe) {
  const imageHtml = recipe.immagine
    ? `<img src="${recipe.immagine}" alt="${recipe.titolo}" class="recipe-image" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">`
    : '';
  const placeholderHtml = `
    <div class="recipe-image-placeholder" style="display: ${recipe.immagine ? 'none' : 'flex'};">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20"/>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
      </svg>
    </div>
  `;

  return `
    <article class="recipe-card" data-id="${recipe.id}">
      ${imageHtml}
      ${placeholderHtml}
      <div class="recipe-content">
        <span class="recipe-category">${recipe.categoria}</span>
        <h3 class="recipe-title">${escapeHtml(recipe.titolo)}</h3>
        <div class="recipe-meta">
          <div class="recipe-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>${recipe.tempo_preparazione} min</span>
          </div>
          <div class="recipe-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>${recipe.porzioni} porzioni</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

// Filter recipes
function filterRecipes() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  return allRecipes.filter(recipe => {
    const matchesCategory = currentCategory === 'tutti' || recipe.categoria === currentCategory;
    const matchesSearch = !searchTerm ||
      recipe.titolo.toLowerCase().includes(searchTerm) ||
      recipe.categoria.toLowerCase().includes(searchTerm) ||
      recipe.ingredienti.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });
}

// Search handler
function handleSearch() {
  renderRecipes();
}

// Filter click handler
function handleFilterClick(btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentCategory = btn.dataset.category;
  renderRecipes();
}

// Funzione per richiedere il PIN
function requestPIN(action) {
  const pin = prompt(`🔒 Inserisci il PIN per ${action}:`);
  if (pin === null) return false; // Annullato
  if (pin === SECURITY_PIN) return true;
  
  showToast('❌ PIN errato!', 'error');
  return false;
}

// Modal handlers
function openAddModal() {
  if (!requestPIN('aggiungere una ricetta')) return;
  
  editingRecipeId = null;
  document.getElementById('modalTitle').textContent = 'Aggiungi Nuova Ricetta';
  document.getElementById('submitBtn').textContent = 'Salva Ricetta';
  recipeForm.reset();
  recipeModal.classList.add('active');
}

function closeAddModal() {
  recipeModal.classList.remove('active');
  editingRecipeId = null;
}

function openDetailModal(id) {
  const recipe = allRecipes.find(r => r.id === id);
  if (!recipe) return;

  document.getElementById('detailTitle').textContent = recipe.titolo;

  const detailContent = document.getElementById('recipeDetail');
  const imageHtml = recipe.immagine
    ? `<img src="${recipe.immagine}" alt="${recipe.titolo}" class="recipe-detail-image" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">`
    : '';

  detailContent.innerHTML = `
    ${imageHtml}
    <div class="recipe-detail-placeholder" style="display: ${recipe.immagine ? 'none' : 'flex'};">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20"/>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
      </svg>
    </div>
    <div class="recipe-detail-header">
      <span class="recipe-category">${recipe.categoria}</span>
      <div class="recipe-detail-meta">
        <div class="recipe-detail-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>Tempo: ${recipe.tempo_preparazione} minuti</span>
        </div>
        <div class="recipe-detail-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Porzioni: ${recipe.porzioni}</span>
        </div>
      </div>
    </div>
    <div class="recipe-detail-section">
      <h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
          <rect width="20" height="14" x="2" y="3" rx="2"/>
          <path d="M8 12h8"/>
          <path d="M8 16h8"/>
        </svg>
        Ingredienti
      </h4>
      <ul>
        ${recipe.ingredienti.split('\n').filter(i => i.trim()).map(ingrediente =>
          `<li>${escapeHtml(ingrediente.trim())}</li>`
        ).join('')}
      </ul>
    </div>
    <div class="recipe-detail-section">
      <h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" x2="8" y1="13" y2="13"/>
          <line x1="16" x2="8" y1="17" y2="17"/>
          <line x1="10" x2="8" y1="9" y2="9"/>
        </svg>
        Istruzioni
      </h4>
      <p style="white-space: pre-line;">${escapeHtml(recipe.istruzioni)}</p>
    </div>
    ${recipe.calorie > 0 || recipe.proteine > 0 || recipe.carboidrati > 0 || recipe.grassi > 0 ? `
    <div class="recipe-detail-section">
      <h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
        Valori Nutrizionali (per porzione)
      </h4>
      <div class="nutrition-grid">
        <div class="nutrition-item">
          <div class="nutrition-value">${recipe.calorie}</div>
          <div class="nutrition-label">Calorie (kcal)</div>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-value">${recipe.proteine}g</div>
          <div class="nutrition-label">Proteine</div>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-value">${recipe.carboidrati}g</div>
          <div class="nutrition-label">Carboidrati</div>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-value">${recipe.grassi}g</div>
          <div class="nutrition-label">Grassi</div>
        </div>
      </div>
    </div>
    ` : ''}
  `;

  document.getElementById('deleteBtn').dataset.id = id;
  document.getElementById('editBtn').dataset.id = id;
  detailModal.classList.add('active');
}

function closeDetailModal() {
  detailModal.classList.remove('active');
}

// Form handlers
async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    titolo: document.getElementById('titolo').value.trim(),
    categoria: document.getElementById('categoria').value,
    tempo_preparazione: parseInt(document.getElementById('tempo_preparazione').value) || 0,
    porzioni: parseInt(document.getElementById('porzioni').value) || 1,
    ingredienti: document.getElementById('ingredienti').value.trim(),
    istruzioni: document.getElementById('istruzioni').value.trim(),
    immagine: document.getElementById('immagine').value.trim(),
    calorie: parseInt(document.getElementById('calorie').value) || 0,
    proteine: parseFloat(document.getElementById('proteine').value) || 0,
    carboidrati: parseFloat(document.getElementById('carboidrati').value) || 0,
    grassi: parseFloat(document.getElementById('grassi').value) || 0
  };

  try {
    const url = editingRecipeId ? `${API_URL}/${editingRecipeId}` : API_URL;
    const method = editingRecipeId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Errore nel salvataggio');
    }

    showToast(editingRecipeId ? 'Ricetta aggiornata!' : 'Ricetta salvata!', 'success');
    closeAddModal();
    fetchRecipes();
  } catch (error) {
    console.error('Errore:', error);
    showToast(error.message, 'error');
  }
}

async function handleDelete() {
  if (!requestPIN('eliminare questa ricetta')) return;
  
  const id = parseInt(document.getElementById('deleteBtn').dataset.id);
  if (!confirm('Sei sicuro di voler eliminare questa ricetta?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Errore nell\'eliminazione');

    showToast('Ricetta eliminata', 'success');
    closeDetailModal();
    fetchRecipes();
  } catch (error) {
    console.error('Errore:', error);
    showToast('Errore nell\'eliminazione della ricetta', 'error');
  }
}

function handleEdit() {
  if (!requestPIN('modificare questa ricetta')) return;
  
  const id = parseInt(document.getElementById('editBtn').dataset.id);
  const recipe = allRecipes.find(r => r.id === id);
  if (!recipe) return;

  editingRecipeId = id;
  document.getElementById('modalTitle').textContent = 'Modifica Ricetta';
  document.getElementById('submitBtn').textContent = 'Aggiorna Ricetta';

  document.getElementById('titolo').value = recipe.titolo;
  document.getElementById('categoria').value = recipe.categoria;
  document.getElementById('tempo_preparazione').value = recipe.tempo_preparazione;
  document.getElementById('porzioni').value = recipe.porzioni;
  document.getElementById('ingredienti').value = recipe.ingredienti;
  document.getElementById('istruzioni').value = recipe.istruzioni;
  document.getElementById('immagine').value = recipe.immagine || '';
  document.getElementById('calorie').value = recipe.calorie || '';
  document.getElementById('proteine').value = recipe.proteine || '';
  document.getElementById('carboidrati').value = recipe.carboidrati || '';
  document.getElementById('grassi').value = recipe.grassi || '';

  closeDetailModal();
  recipeModal.classList.add('active');
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showToast(message, type = '') {
  toastMessage.textContent = message;
  toast.className = 'toast active';
  if (type) toast.classList.add(type);

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}
