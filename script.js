const actors = ["ExampleActor"]; // List of your actor JSON filenames without extension

const select = document.getElementById("actorSelect");
actors.forEach(actor => {
  const option = document.createElement("option");
  option.value = actor;
  option.textContent = actor;
  select.appendChild(option);
});

select.addEventListener("change", () => loadActor(select.value));

async function loadActor(name) {
  const sheetDiv = document.getElementById("sheet");
  sheetDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(`actors/${name}.json`);
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
    sheetDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

// Load first actor by default
loadActor(actors[0]);
