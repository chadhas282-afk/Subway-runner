document.addEventListener('DOMContentLoaded', () => {
    const world = document.getElementById('world');
    const scoreDisplay = document.getElementById('score');
    const finalScoreDisplay = document.getElementById('final-score');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const startScreen = document.getElementById('start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const scoreContainer = document.getElementById('score-container');
    
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
    const moveLeft = () => { if (!isGameOver && playerPos > 0) { playerPos--; updateUI(); }};
    const moveRight = () => { if (!isGameOver && playerPos < 2) { playerPos++; updateUI(); }};
    const jump = () => {
        if (!isGameOver && !player.classList.contains('jumping')) {
            player.classList.add('jumping');
            setTimeout(() => player.classList.remove('jumping'), 600);
        }
    };
    const updateUI = () => { player.style.left = `${lanes[playerPos]}px`; };

    function startGame() {
        score = 0;
        isGameOver = false;
        playerPos = 1;
        updateUI();
        startScreen.classList.add('hidden');
        gameOverScreen.classList.add('hidden');
        scoreContainer.classList.remove('hidden');
        document.querySelectorAll('.obstacle').forEach(o => o.remove());
        requestAnimationFrame(gameLoop);
    }

    function gameLoop() {
        if (isGameOver) return;
        score += 0.2; 
        if (scoreDisplay) scoreDisplay.innerText = Math.floor(score);
        
        if (Math.random() < 0.02) createObstacle();
        requestAnimationFrame(gameLoop);
    }

    function createObstacle() {
        const obs = document.createElement('div');
        const laneIdx = Math.floor(Math.random() * 3);
        obs.classList.add('obstacle');
        obs.style.left = `${lanes[laneIdx]}px`;
        world.appendChild(obs);

        let top = -50;
        let speed = 6 + (score / 1000);

        const fall = setInterval(() => {
            if (isGameOver) { clearInterval(fall); obs.remove(); return; }
            top += speed;
            obs.style.top = `${top}px`;

            if (top > 410 && top < 450 && lanes[laneIdx] === lanes[playerPos]) {
                if (!player.classList.contains('jumping')) {
                    obs.style.top = `${top}px`; 
                    endGame();
                    clearInterval(fall);
                }
            }

            if (top > 650) { 
                clearInterval(fall); 
                obs.remove(); 
            }
        }, 20);
    }

    function endGame() {
        isGameOver = true;
        finalScoreDisplay.innerText = Math.floor(score);
        gameOverScreen.classList.remove('hidden');
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') moveLeft();
        if (e.key === 'ArrowRight') moveRight();
        if (e.key === ' ' || e.key === 'ArrowUp') jump();
    });

    const t = (btn, fn) => {
        btn.addEventListener('touchstart', (e) => { e.preventDefault(); fn(); });
        btn.addEventListener('click', fn);
    };
    t(leftBtn, moveLeft); t(rightBtn, moveRight); t(jumpBtn, jump);
    startBtn.onclick = startGame; restartBtn.onclick = startGame;
});