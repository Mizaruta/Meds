function homeView() {
  const meds = loadMeds();
  const options = meds.map(m => `<option value="${m.name}|||${m.dose}">${m.name} (${m.dose})</option>`).join("");
  
  return `
    ${card(`
      <h1>Nouvelle prise</h1>
      ${meds.length ? `
        <select id="quick-med">
          <option value="">Choisir un médicament enregistré</option>
          ${options}
        </select>
      ` : `
        <p class="small">Astuce : ajoute tes médicaments dans l’onglet “Médicaments” pour les retrouver ici.</p>
      `}
      <input id="name" placeholder="Nom du médicament">
      <input id="dose" placeholder="Dose">
      <button onclick="addEntry()">Enregistrer la prise</button>
    `)}
  `;
}