document.addEventListener('DOMContentLoaded', () => {
    const world = document.getElementById('world');
    const scoreDisplay = document.getElementById('score');
    const finalScoreDisplay = document.getElementById('final-score');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const startScreen = document.getElementById('start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const scoreUI = document.getElementById('score-display');

    let score = 0;
    let isGameOver = true;
    let playerPos = 1; 
    const lanes = [40, 130, 220]; 

    const player = document.createElement('div');
    player.classList.add('player');
    if (world) {
        player.style.left = `${lanes[playerPos]}px`;
        world.appendChild(player);
    } else {
        console.error("Could not find div with id='world'. Check your HTML!");
    }

    function startGame() {
        score = 0;
        isGameOver = false;
        playerPos = 1;
        player.style.left = `${lanes[playerPos]}px`;
        
        if (scoreDisplay) scoreDisplay.innerText = "0";
        if (startScreen) startScreen.classList.add('hidden');
        if (gameOverScreen) gameOverScreen.classList.add('hidden');
        if (scoreUI) scoreUI.classList.remove('hidden');
        
        requestAnimationFrame(gameLoop);
    }

    function gameLoop() {
        if (isGameOver) return;
        
        if (Math.random() < 0.02) {
            createObstacle();
        }
        
        score++;
        if (scoreDisplay) {
            scoreDisplay.innerText = Math.floor(score / 10);
        }
        
        requestAnimationFrame(gameLoop);
    }

    function createObstacle() {
        if (!world) return;

        const obstacle = document.createElement('div');
        const laneIndex = Math.floor(Math.random() * 3);
        
        obstacle.classList.add('obstacle');
        obstacle.style.left = `${lanes[laneIndex]}px`;
        world.appendChild(obstacle);

        let topPosition = -50;
        
        const fallInterval = setInterval(() => {
            if (isGameOver) {
                clearInterval(fallInterval);
                obstacle.remove();
                return;
            }
            
            topPosition += 6; 
            obstacle.style.top = `${topPosition}px`;
            if (topPosition > 480 && topPosition < 540 && lanes[laneIndex] === lanes[playerPos]) {
                if (!player.classList.contains('jumping')) {
                    endGame();
                }
            }

            if (topPosition > 600) {
                clearInterval(fallInterval);
                obstacle.remove();
            }
        }, 20);
    }

    function endGame() {
        isGameOver = true;
        if (finalScoreDisplay) finalScoreDisplay.innerText = Math.floor(score / 10);
        if (gameOverScreen) gameOverScreen.classList.remove('hidden');
    }
    window.addEventListener('keydown', (e) => {
        if (isGameOver) return;
        
        if ((e.key === 'ArrowLeft') && playerPos > 0) {
            playerPos--;
        } else if ((e.key === 'ArrowRight') && playerPos < 2) {
            playerPos++;
        } else if (e.key === ' ' || e.key === 'ArrowUp') {
            if (!player.classList.contains('jumping')) {
                player.classList.add('jumping');
                setTimeout(() => player.classList.remove('jumping'), 500);
            }
        }
        player.style.left = `${lanes[playerPos]}px`;
    });
    if (startBtn) startBtn.addEventListener('click', startGame);
    if (restartBtn) restartBtn.addEventListener('click', startGame);
});