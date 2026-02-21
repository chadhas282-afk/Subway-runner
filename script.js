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

// function gameLoop(){
//     if (isGameOver) return;

//     if(Math.random < 0.02){
//         createObstacle();
//     }
//     score++;
//     scoreEl.innerText = Math.floor(score / 10);
//     requestAnimationFrame(gameLoop);
// }

