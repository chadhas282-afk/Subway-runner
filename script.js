document.addEventListener('DOMContentLoaded', () => {
    const world = document.getElementById('world');
    const scoreDisplay = document.getElementById('score');
    const finalScoreDisplay = document.getElementById('final-score');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const startScreen = document.getElementById('start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const scoreUI = document.getElementById('score-display');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    const jumpBtn = document.getElementById('jump-btn');

    let score = 0;
    let isGameOver = true;
    let playerPos = 1; 
    const lanes = [40, 130, 220]; 

    const player = document.createElement('div');
    player.classList.add('player');
    if (world) {
        player.style.left = `${lanes[playerPos]}px`;
        world.appendChild(player);
    }

    function moveLeft() {
        if (!isGameOver && playerPos > 0) {
            playerPos--;
            updatePosition();
        }
    }

    function moveRight() {
        if (!isGameOver && playerPos < 2) {
            playerPos++;
            updatePosition();
        }
    }

    function jump() {
        if (!isGameOver && !player.classList.contains('jumping')) {
            player.classList.add('jumping');
            setTimeout(() => player.classList.remove('jumping'), 600);
        }
    }

    function updatePosition() {
        player.style.left = `${lanes[playerPos]}px`;
    }

    function startGame() {
        score = 0;
        isGameOver = false;
        playerPos = 1;
        updatePosition();
        
        if (startScreen) startScreen.classList.add('hidden');
        if (gameOverScreen) gameOverScreen.classList.add('hidden');
        if (scoreUI) scoreUI.classList.remove('hidden');
        
        document.querySelectorAll('.obstacle').forEach(obs => obs.remove());
        
        requestAnimationFrame(gameLoop);
    }

    function gameLoop() {
        if (isGameOver) return;
        
        score += 0.15;
        if (scoreDisplay) {
            scoreDisplay.innerText = Math.floor(score);
        }
        
        if (Math.random() < 0.02) {
            createObstacle();
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

        let topPos = -50;
        const fallSpeed = 5 + (score / 1000);

        const fallInterval = setInterval(() => {
            if (isGameOver) {
                clearInterval(fallInterval);
                obstacle.remove();
                return;
            }
            
            topPos += fallSpeed;
            obstacle.style.top = `${topPos}px`;

            if (topPos > 480 && topPos < 540 && lanes[laneIndex] === lanes[playerPos]) {
                if (!player.classList.contains('jumping')) {
                    endGame();
                }
            }

            if (topPos > 650) {
                clearInterval(fallInterval);
                obstacle.remove();
            }
        }, 20);
    }

    function endGame() {
        isGameOver = true;
        if (finalScoreDisplay) finalScoreDisplay.innerText = Math.floor(score);
        if (gameOverScreen) gameOverScreen.classList.remove('hidden');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') moveLeft();
        if (e.key === 'ArrowRight') moveRight();
        if (e.key === ' ' || e.key === 'ArrowUp') jump();
    });

    const handleTouch = (e, callback) => {
        e.preventDefault();
        callback();
    };

    if (leftBtn) leftBtn.addEventListener('touchstart', (e) => handleTouch(e, moveLeft));
    if (rightBtn) rightBtn.addEventListener('touchstart', (e) => handleTouch(e, moveRight));
    if (jumpBtn) jumpBtn.addEventListener('touchstart', (e) => handleTouch(e, jump));

    if (leftBtn) leftBtn.addEventListener('click', moveLeft);
    if (rightBtn) rightBtn.addEventListener('click', moveRight);
    if (jumpBtn) jumpBtn.addEventListener('click', jump);

    if (startBtn) startBtn.addEventListener('click', startGame);
    if (restartBtn) restartBtn.addEventListener('click', startGame);
});