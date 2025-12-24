let rudraa;

function initNPC() {
  rudraa = new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 1),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  rudraa.position.set(5, 1, 0);
  scene.add(rudraa);
}

function checkNPCInteraction() {
  const distance = player.position.distanceTo(rudraa.position);
  if (distance < 2) {
    showDialogue("Rudraa: Ishika… kya tum mere saath drive pe chalogi? ❤️");
    startMission("Car tak jao");
  }
}
