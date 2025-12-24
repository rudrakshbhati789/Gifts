function showDialogue(text) {
  const d = document.getElementById("dialogue");
  d.style.display = "block";
  d.innerText = text;
}

function startMission(text) {
  document.getElementById("mission").innerText =
    "MISSION: " + text;
}
