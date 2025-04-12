const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let player = { x: 400, y: 300, size: 20, speed: 5 };
let bullets = [];

document.addEventListener("keydown", movePlayer);
document.addEventListener("click", shoot);

function movePlayer(e) {
  if (e.key === "ArrowUp") player.y -= player.speed;
  if (e.key === "ArrowDown") player.y += player.speed;
  if (e.key === "ArrowLeft") player.x -= player.speed;
  if (e.key === "ArrowRight") player.x += player.speed;
}

function shoot() {
  bullets.push({
    x: player.x + player.size / 2,
    y: player.y,
    dx: 0,
    dy: -10,
    size: 5,
  });
}

function drawPlayer() {
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawBullets() {
  ctx.fillStyle = "red";
  bullets.forEach((b) => {
    b.x += b.dx;
    b.y += b.dy;
    ctx.fillRect(b.x, b.y, b.size, b.size);
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBullets();
  requestAnimationFrame(gameLoop);
}

gameLoop();
