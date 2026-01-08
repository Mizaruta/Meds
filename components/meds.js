const MEDS_KEY = "meds_app_final_meds";

function loadMeds() {
  return JSON.parse(localStorage.getItem(MEDS_KEY) || "[]");
}

function saveMeds(meds) {
  localStorage.setItem(MEDS_KEY, JSON.stringify(meds));
}

function medsView() {
  const meds = loadMeds();
  const list = meds.length
    ? meds.map((m, i) =>
        card(`
          <div class="row">
            <div>
              <b>${m.name}</b><br>
              <span class="small">${m.dose}</span><br>
              <span class="small">Fréquence : ${m.frequency || "non précisée"}</span><br>
              ${m.notes ? `<span class="small">Notes : ${m.notes}</span>` : ""}
            </div>
            <div class="row-right">
              <button class="secondary" onclick="editMed(${i})">Modifier</button>
              <button class="danger" onclick="deleteMed(${i})">Supprimer</button>
            </div>
          </div>
        `)
      ).join("")
    : card("Aucun médicament enregistré pour l’instant.");

  return `
    ${card(`
      <h1>Médicaments</h1>
      <input id="med-name" placeholder="Nom du médicament (ex : Doliprane)">
      <input id="med-dose" placeholder="Dose habituelle (ex : 1g, 1 comprimé)">
      <input id="med-frequency" placeholder="Fréquence (ex : 3x/jour, matin/soir)">
      <textarea id="med-notes" rows="2" placeholder="Notes (ex : à prendre avec de l’eau, avant repas)"></textarea>
      <button onclick="saveMedForm()">Enregistrer</button>
      <p class="small">Tu peux ajouter, modifier ou supprimer tes médicaments ici.</p>
    `)}
    ${list}
  `;
}

function saveMedForm() {
  const name = document.getElementById("med-name").value.trim();
  const dose = document.getElementById("med-dose").value.trim();
  const frequency = document.getElementById("med-frequency").value.trim();
  const notes = document.getElementById("med-notes").value.trim();
  if (!name || !dose) return;

  const meds = loadMeds();
  const editIndex = window._editingMedIndex;

  if (editIndex != null) {
    meds[editIndex] = { name, dose, frequency, notes };
    window._editingMedIndex = null;
  } else {
    meds.push({ name, dose, frequency, notes });
  }

  saveMeds(meds);
  loadTab("meds");
}

function deleteMed(index) {
  const meds = loadMeds();
  meds.splice(index, 1);
  saveMeds(meds);
  loadTab("meds");
}

function editMed(index) {
  const meds = loadMeds();
  const med = meds[index];
  if (!med) return;

  window._editingMedIndex = index;
  loadTab("meds");

  setTimeout(() => {
    document.getElementById("med-name").value = med.name;
    document.getElementById("med-dose").value = med.dose;
    document.getElementById("med-frequency").value = med.frequency || "";
    document.getElementById("med-notes").value = med.notes || "";
  }, 0);
}