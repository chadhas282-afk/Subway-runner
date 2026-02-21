document.addEventListener('DOMContentLoaded', () => {
    const world = document.getElementById('world');
    const scoreDisplay = document.getElementById('score');
    const highScoreDisplay = document.getElementById('high-score');
    const finalScoreDisplay = document.getElementById('final-score');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const startScreen = document.getElementById('start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');

    let score = 0;
    let highScore = localStorage.getItem('superHopperHighScore') || 0;
    let isGameOver = true;
    let playerPos = 1;
    const lanes = [40, 130, 220];

    if (highScoreDisplay) highScoreDisplay.innerText = highScore;

    const player = document.createElement('div');
    player.classList.add('player');
    if (world) world.appendChild(player);

    function startGame() {
        score = 0;
        isGameOver = false;
        playerPos = 1;
        player.style.left = `${lanes[playerPos]}px`;

        startScreen.classList.add('hidden');
        gameOverScreen.classList.add('hidden');
        document.getElementById('score-display').classList.remove('hidden');

        document.querySelectorAll('.obstacle').forEach(obs => obs.remove());

        requestAnimationFrame(gameLoop);
    }

    function gameLoop() {
        if (isGameOver) return;

        score += 0.15;
        scoreDisplay.innerText = Math.floor(score);

        if (Math.random() < 0.02) {
            createObstacle();
        }

        requestAnimationFrame(gameLoop);
    }

    function createObstacle() {
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

            topPosition += (5 + (score / 1000));
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
        const finalScore = Math.floor(score);
        finalScoreDisplay.innerText = finalScore;

        if (finalScore > highScore) {
            highScore = finalScore;
            localStorage.setItem('superHopperHighScore', highScore);
            if (highScoreDisplay) highScoreDisplay.innerText = highScore;
        }

        gameOverScreen.classList.remove('hidden');
    }

    window.addEventListener('keydown', (e) => {
        if (isGameOver) return;

        if (e.key === 'ArrowLeft' && playerPos > 0) playerPos--;
        if (e.key === 'ArrowRight' && playerPos < 2) playerPos++;

        if ((e.key === ' ' || e.key === 'ArrowUp') && !player.classList.contains('jumping')) {
            player.classList.add('jumping');
            setTimeout(() => player.classList.remove('jumping'), 600);
        }

        player.style.left = `${lanes[playerPos]}px`;
    });

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});