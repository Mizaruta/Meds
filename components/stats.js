function statsView() {
  const log = loadLog();
  const meds = loadMeds();
  
  const total = log.length;
  
  const perMed = {};
  log.forEach(e => {
    perMed[e.name] = (perMed[e.name] || 0) + 1;
  });
  
  const perDay = {};
  log.forEach(e => {
    perDay[e.date] = (perDay[e.date] || 0) + 1;
  });
  
  const medList = Object.keys(perMed).length ?
    Object.entries(perMed)
    .map(([name, count]) => `<p>${name} : <b>${count}</b> prise(s)</p>`)
    .join("") :
    "<p class='small'>Pas encore assez de données par médicament.</p>";
  
  const dayList = Object.keys(perDay).length ?
    Object.entries(perDay)
    .sort((a, b) => {
      const [da, ma, ya] = a[0].split("/");
      const [db, mb, yb] = b[0].split("/");
      return new Date(yb, mb - 1, db) - new Date(ya, ma - 1, da);
    })
    .map(([date, count]) => `<p>${date} : <b>${count}</b> prise(s)</p>`)
    .join("") :
    "<p class='small'>Pas encore assez de données par jour.</p>";
  
  const medsCount = meds.length;
  
  return `
    ${card(`
      <h1>Statistiques</h1>
      <p>Total des prises : <b>${total}</b></p>
      <p>Médicaments enregistrés : <b>${medsCount}</b></p>
    `)}
    ${card(`
      <h2>Par médicament</h2>
      ${medList}
    `)}
    ${card(`
      <h2>Par jour</h2>
      ${dayList}
    `)}
  `;
}