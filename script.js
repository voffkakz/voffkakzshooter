const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const gameOverScreen = document.getElementById("gameOverScreen");
const restartButton = document.getElementById("restartButton");

canvas.width = 800;
canvas.height = 600;

let player, bullets, enemies, score, lives, gameOver;

function initGame() {
  player = { x: 400, y: 500, size: 30, speed: 6 };
  bullets = [];
  enemies = [];
  score = 0;
  lives = 3;
  gameOver = false;
  scoreDisplay.textContent = "Score: 0";
  livesDisplay.textContent = "❤️ x3";
  gameOverScreen.style.display = "none";
}

document.addEventListener("keydown", handleKeyDown);
restartButton.addEventListener("click", () => {
  initGame();
});

function handleKeyDown(e) {
  if (gameOver) return;
  if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
    player.x -= player.speed;
  } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
    player.x += player.speed;
  } else if (e.key === " " || e.key.toLowerCase() === "w") {
    shoot();
  }
}

function shoot() {
  bullets.push({
    x: player.x + player.size / 2 - 2,
    y: player.y,
    dy: -10,
    size: 5,
  });
}

function spawnEnemy() {
  if (gameOver) return;
  const size = 30;
  const x = Math.random() * (canvas.width - size);
  enemies.push({
    x,
    y: 0,
    dy: 2,
    size,
  });
}

function drawPlayer() {
  ctx.fillStyle = "#00FF00";
  ctx.beginPath();
  ctx.arc(player.x + player.size / 2, player.y + player.size / 2, player.size / 2, 0, Math.PI * 2);
  ctx.fill();
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
    ctx.beginPath();
    ctx.arc(e.x + e.size / 2, e.y + e.size / 2, e.size / 2, 0, Math.PI * 2);
    ctx.fill();

    if (e.y > canvas.height) {
      enemies.splice(index, 1);
      loseLife();
    }
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

function loseLife() {
  lives--;
  livesDisplay.textContent = `❤️ x${lives}`;
  if (lives <= 0) {
    gameOver = true;
    gameOverScreen.style.display = "flex";
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!gameOver) {
    drawPlayer();
    drawBullets();
    drawEnemies();
    checkCollisions();
  }
  requestAnimationFrame(gameLoop);
}

initGame();
setInterval(spawnEnemy, 1000);
gameLoop();
