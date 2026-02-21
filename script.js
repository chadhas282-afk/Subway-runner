const world = document.getElementById("world")
const scoreEL = document.getElementById("score")
const finalScoreEl = document.getElementById("final-score");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById('game-over-screen');

let score = 0;
let isGameOver = true;
let PlayerPos = 1;
let lanes = [40, 130, 220];

const player = document.getElementById("div")
player.classList.add("player")
world.appendChild(player);

function startGame(){
    score = 0;
    isGameOver = false;
    scoreEL.innerText = score;
    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden")
    document.getElementById("score-display").classList.remove("hidden")
    gameLoop();
}

function gameLoop(){
    if (isGameOver) return;

    if(Math.random < 0.02){
        createObstacle();
    }
    score++;
    scoreEl.innerText = Math.floor(score / 10);
    requestAnimationFrame(gameLoop);
}

function createObstacle(){
    const obstacle = document.getElementById("div")
    const lane = Math.floor(Math.random() * 3);
    obstacle.classList.add("obstacle");
    obstacle.style.left = `${lanes[lane]}px`;
    world.appendChild(obstacle);

    let top= -50;
    const fallInterval = setInterval(() => {
      if (isGameOver){
        clearInterval(fallInterval);
        obstacle.remove();
      }

      top += 5
      obstacle.style.top = `${top}px`;

      if (top > 510 && top < 550 && lanes[lane] === lanes[playerPos]) {
            endGame();
        }

        if(top>660){
            clearInterval(fallInterval);
            obstacle.remove();
        }
    }, 20)

    
}