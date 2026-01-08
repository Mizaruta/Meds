function homeView() {
  const meds = loadMeds();
  const options = meds.map((m, i) =>
    `<option value="${i}">${m.name} (${m.dose})</option>`
  ).join("");
  
  const quickInfo = window._quickMed ?
    `<p class="small">Pré-sélection : <b>${_quickMed.name}</b> (${_quickMed.dose})</p>` :
    "";
  
  return `
    ${card(`
      <h1>Nouvelle prise</h1>
      ${meds.length ? `
        <select id="quick-med">
          <option value="">Choisir un médicament enregistré</option>
          ${options}
        </select>
      ` : `
        <p class="small">Ajoute d’abord des médicaments dans l’onglet “Médicaments”.</p>
      `}
      ${quickInfo}
      <input id="name" placeholder="Nom du médicament">
      <input id="dose" placeholder="Dose">
      <textarea id="notes" rows="2" placeholder="Notes (facultatif)"></textarea>
      <button onclick="addEntry()">Enregistrer la prise</button>
      <p class="small">Tu peux choisir un médicament enregistré ou remplir les champs manuellement.</p>
    `)}
  `;
}