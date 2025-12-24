initWorld();
initPlayer();
initNPC();

function animate() {
  requestAnimationFrame(animate);
  updatePlayer();
  checkNPCInteraction();
  renderer.render(scene, camera);
}

animate();
