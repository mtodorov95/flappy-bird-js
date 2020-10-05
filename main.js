const bird = document.querySelector(".bird");
const container = document.querySelector(".container");
const ground = document.querySelector(".ground");

document.addEventListener("keyup", controls);

let birdLeft = 220;
let birdBottom = 100;
let gravity = 2;
let isGameOver = false;
let gap = 430;

function generateObstacle() {
  let obstacleLeft = 500;
  let randomHeight = Math.random() * 60;
  let obstacleBottom = randomHeight;
  const obstacle = document.createElement("div");
  const topObstacle = document.createElement("div");
  if (!isGameOver) {
    obstacle.classList.add("obstacle");
    topObstacle.classList.add("topObstacle");
  }

  container.appendChild(obstacle);
  container.appendChild(topObstacle);
  obstacle.style.left = obstacleLeft + "px";
  topObstacle.style.left = obstacleLeft + "px";
  obstacle.style.bottom = obstacleBottom + "px";
  topObstacle.style.bottom = obstacleBottom + gap + "px";

  function moveObstacle() {
    obstacleLeft -= 2;
    obstacle.style.left = obstacleLeft + "px";
    topObstacle.style.left = obstacleLeft + "px";
    if (obstacleLeft === -60) {
      clearInterval(moveTimer);
      container.removeChild(obstacle);
      container.removeChild(topObstacle);
    }
    if (
      (obstacleLeft > 200 &&
        obstacleLeft < 280 &&
        birdLeft === 220 &&
        birdBottom < obstacleBottom - 153) ||
      birdBottom > obstacleBottom + gap - 200 ||
      birdBottom <= 0
    ) {
      gameOver();
      clearInterval(moveTimer);
    }
  }

  let moveTimer = setInterval(moveObstacle, 20);

  if (!isGameOver) {
    setTimeout(generateObstacle, 3000);
  }
}

function gameOver() {
  clearInterval(startGame);
  isGameOver = true;
  document.removeEventListener("keyup", controls);
}

function controls(e) {
  if (e.keyCode === 32) {
    jump();
  }
}

function jump() {
  if (birdBottom < 500) {
    birdBottom += 50;
    bird.style.bottom = birdBottom + "px";
  }
}

generateObstacle();

function startGame() {
  if (!isGameOver) {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }
}

setInterval(startGame, 20);
