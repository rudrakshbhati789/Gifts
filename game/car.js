// car.js
let car, driving = false;
let speed = 0;
let steer = 0;

function initCar() {
  car = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 4),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  car.position.set(0, 0.5, -10);
  scene.add(car);
}

function updateCar() {
  if (!driving) return;

  if (keys["w"]) speed = Math.min(speed + 0.002, 0.15);
  else if (keys["s"]) speed = Math.max(speed - 0.003, -0.05);
  else speed *= 0.98;

  if (keys["a"]) steer = Math.min(steer + 0.0015, 0.03);
  else if (keys["d"]) steer = Math.max(steer - 0.0015, -0.03);
  else steer *= 0.9;

  car.rotation.y += steer;
  car.translateZ(speed);

  const camTarget = new THREE.Vector3(
    car.position.x,
    car.position.y + 4,
    car.position.z + 8
  );
  camera.position.lerp(camTarget, 0.05);
  camera.lookAt(car.position);
}
function tryEnterCar() {
  if (!nearCar || driving) return;

  driving = true;
  player.visible = false;
  showDialogue("Car me baith gaye 🚗");
}

function exitCar() {
  if (!driving) return;

  driving = false;
  player.visible = true;
  player.position.copy(car.position).add(new THREE.Vector3(2,0,0));
  showDialogue("Car se bahar aa gaye");
}
