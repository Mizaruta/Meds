function navbar() {
  return `
    <div class="navbar">
      <div class="nav-item" data-tab="home">
        <span class="icon">🏠</span>
        <span>Accueil</span>
      </div>
      <div class="nav-item" data-tab="today">
        <span class="icon">📅</span>
        <span>Aujourd’hui</span>
      </div>
      <div class="nav-item" data-tab="history">
        <span class="icon">📜</span>
        <span>Historique</span>
      </div>
      <div class="nav-item" data-tab="meds">
        <span class="icon">💊</span>
        <span>Médicaments</span>
      </div>
      <div class="nav-item" data-tab="stats">
        <span class="icon">📊</span>
        <span>Stats</span>
      </div>
    </div>
  `;
}