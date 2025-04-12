const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

canvas.width = 800;
canvas.height = 600;

let player = { x: 400, y: 500, size: 20, speed: 5 };
let bullets = [];
let enemies = [];
let score = 0;

document.addEventListener("keydown", movePlayer);
document.addEventListener("click", shoot);

function movePlayer(e) {
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= player.speed;
  if (e.key === "ArrowRight" && player.x < canvas.width - player.size) player.x += player.speed;
}

function shoot() {
  bullets.push({
    x: player.x + player.size / 2 - 2,
    y: player.y,
    dx: 0,
    dy: -8,
    size: 5,
  });
}

function spawnEnemy() {
  const size = 20;
  const x = Math.random() * (canvas.width - size);
  enemies.push({
    x,
    y: 0,
    dy: 2,
    size,
  });
}

function drawPlayer() {
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawBullets() {
  ctx.fillStyle = "red";
  bullets.forEach((b, index) => {
    b.y += b.dy;
    ctx.fillRect(b.x, b.y, b.size, b.size);

    if (b.y < 0) bullets.splice(index, 1);
  });
}

function drawEnemies() {
  ctx.fillStyle = "orange";
  enemies.forEach((e, index) => {
    e.y += e.dy;
    ctx.fillRect(e.x, e.y, e.size, e.size);

    if (e.y > canvas.height) enemies.splice(index, 1);
  });
}

function checkCollisions() {
  bullets.forEach((b, bIndex) => {
    enemies.forEach((e, eIndex) => {
      if (
        b.x < e.x + e.size &&
        b.x + b.size > e.x &&
        b.y < e.y + e.size &&
        b.y + b.size > e.y
      ) {
        bullets.splice(bIndex, 1);
        enemies.splice(eIndex, 1);
        score++;
        scoreDisplay.textContent = "Score: " + score;
      }
    });
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBullets();
  drawEnemies();
  checkCollisions();
  requestAnimationFrame(gameLoop);
}

setInterval(spawnEnemy, 1000);
gameLoop();
