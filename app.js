document.body.insertAdjacentHTML("beforeend", navbar());

const themeToggle = document.getElementById("theme-toggle");
let dark = false;

themeToggle.addEventListener("click", () => {
  dark = !dark;
  document.body.classList.toggle("dark", dark);
  themeToggle.textContent = dark ? "🌙" : "☀️";
});

function addEntry() {
  const quick = document.getElementById("quick-med");
  let name = document.getElementById("name").value.trim();
  let dose = document.getElementById("dose").value.trim();
  const notes = document.getElementById("notes").value.trim();
  
  if (quick && quick.value && (!name && !dose)) {
    const meds = loadMeds();
    const med = meds[Number(quick.value)];
    if (med) {
      name = med.name;
      dose = med.dose;
    }
  }
  
  if (!name || !dose) return;
  
  const now = new Date();
  const entry = {
    name,
    dose,
    notes,
    date: now.toLocaleDateString("fr-FR"),
    time: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  };
  
  const log = loadLog();
  log.push(entry);
  saveLog(log);
  
  loadTab("today");
}

function loadTab(tab) {
  const app = document.getElementById("app");
  
  if (tab === "home") app.innerHTML = homeView();
  if (tab === "today") app.innerHTML = todayView();
  if (tab === "history") app.innerHTML = historyView();
  if (tab === "meds") app.innerHTML = medsView();
  if (tab === "stats") app.innerHTML = statsView();
}

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    loadTab(item.dataset.tab);
  });
});

document.querySelector(".nav-item[data-tab='today']").classList.add("active");
loadTab("today");