const actorFolder = "foundry-actors/";
const select = document.getElementById("actorSelect");
const sheetDiv = document.getElementById("sheet");

// Fetch list of JSON files from GitHub Pages
// Since we are static, we can pre-generate a JSON index file
fetch(`${actorFolder}index.json`)
  .then(res => res.json())
  .then(actors => {
    // Populate dropdown
    actors.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });

    // Load first actor by default
    loadActor(actors[0]);
  })
  .catch(err => {
    sheetDiv.innerHTML = `<p style="color:red;">Could not load actor list: ${err}</p>`;
  });

// Load actor JSON and render
async function loadActor(name) {
  sheetDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(`${actorFolder}${name}.json`);
    if (!res.ok) throw new Error("Actor not found");
    const actor = await res.json();

    let html = `<h2>${actor.name}</h2>`;
    if(actor.data?.attributes) {
      html += '<ul>';
      for (const [key, value] of Object.entries(actor.data.attributes)) {
        html += `<li><strong>${key}:</strong> ${value.value}</li>`;
      }
      html += '</ul>';
    }
    sheetDiv.innerHTML = html;
  } catch(err) {
    sheetDiv.innerHTML = `<p style="color:
