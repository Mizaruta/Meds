const LOG_KEY = "meds_app_final_log";

function loadLog() {
  return JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
}

function saveLog(log) {
  localStorage.setItem(LOG_KEY, JSON.stringify(log));
}

function deleteEntry(index) {
  const log = loadLog();
  log.splice(index, 1);
  saveLog(log);
  loadTab("history");
}

function groupByDate(log) {
  const groups = {};
  log.forEach((e, idx) => {
    if (!groups[e.date]) groups[e.date] = [];
    groups[e.date].push({ ...e, _index: idx });
  });
  return groups;
}

function historyView() {
  const log = loadLog();
  if (!log.length) {
    return card("Aucune prise enregistrée pour le moment.");
  }

  const groups = groupByDate(log);
  const dates = Object.keys(groups).sort((a, b) => {
    const [da, ma, ya] = a.split("/");
    const [db, mb, yb] = b.split("/");
    return new Date(yb, mb - 1, db) - new Date(ya, ma - 1, da);
  });

  return dates.map(date => {
    const entries = groups[date]
      .sort((a, b) => a.time.localeCompare(b.time))
      .map(e =>
        card(`
          <div class="row">
            <div>
              <b>${e.name}</b> — ${e.dose}<br>
              <span class="small">${e.time}</span><br>
              ${e.notes ? `<span class="small">Notes : ${e.notes}</span>` : ""}
            </div>
            <div class="row-right">
              <button class="danger" onclick="deleteEntry(${e._index})">Supprimer</button>
            </div>
          </div>
        `)
      ).join("");

    return `
      <div class="group-title">${date}</div>
      ${entries}
    `;
  }).join("");
}

function todayView() {
  const log = loadLog();
  const today = new Date().toLocaleDateString("fr-FR");
  const meds = loadMeds();

  const todayEntries = log.filter(e => e.date === today);

  const taken = todayEntries.length
    ? todayEntries.map(e =>
        card(`
          <b>${e.name}</b> — ${e.dose}<br>
          <span class="small">${e.time}</span><br>
          ${e.notes ? `<span class="small">Notes : ${e.notes}</span>` : ""}
        `)
      ).join("")
    : card("Aucune prise enregistrée aujourd’hui.");

  const expected = meds.length
    ? meds.map(m => {
        const count = todayEntries.filter(e => e.name === m.name).length;
        return `<p>${m.name} : <b>${count}</b> prise(s) aujourd’hui — <span class="small">${m.frequency || "fréquence non précisée"}</span></p>`;
      }).join("")
    : "<p class='small'>Ajoute des médicaments pour suivre ce que tu devrais prendre.</p>";

  return `
    ${card(`
      <h1>Aujourd’hui</h1>
      <p class="small">${today}</p>
    `)}
    ${card(`
      <h2>Prises effectuées</h2>
      ${taken}
    `)}
    ${card(`
      <h2>Résumé par médicament</h2>
      ${expected}
    `)}
  `;
}