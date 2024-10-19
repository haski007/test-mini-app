const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const startButton = document.getElementById('startButton');

const gridSize = 3;
const holeSize = canvas.width / gridSize;
let score = 0;
let timeLeft = 30;
let gameInterval;
let molePosition = { x: -1, y: -1 };

function drawHole(x, y) {
    ctx.fillStyle = '#795548';
    ctx.beginPath();
    ctx.arc(x * holeSize + holeSize / 2, y * holeSize + holeSize / 2, holeSize / 2 - 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Add some depth to the hole
    ctx.fillStyle = '#5D4037';
    ctx.beginPath();
    ctx.arc(x * holeSize + holeSize / 2, y * holeSize + holeSize / 2, holeSize / 2 - 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawMole(x, y) {
    // Body
    ctx.fillStyle = '#8D6E63';
    ctx.beginPath();
    ctx.arc(x * holeSize + holeSize / 2, y * holeSize + holeSize / 2, holeSize / 2 - 10, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x * holeSize + holeSize / 2 - 10, y * holeSize + holeSize / 2 - 10, 5, 0, Math.PI * 2);
    ctx.arc(x * holeSize + holeSize / 2 + 10, y * holeSize + holeSize / 2 - 10, 5, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x * holeSize + holeSize / 2 - 10, y * holeSize + holeSize / 2 - 10, 2, 0, Math.PI * 2);
    ctx.arc(x * holeSize + holeSize / 2 + 10, y * holeSize + holeSize / 2 - 10, 2, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#E91E63';
    ctx.beginPath();
    ctx.arc(x * holeSize + holeSize / 2, y * holeSize + holeSize / 2 + 5, 7, 0, Math.PI * 2);
    ctx.fill();

    // Whiskers
    ctx.strokeStyle = '#5D4037';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x * holeSize + holeSize / 2 - 20, y * holeSize + holeSize / 2 + 5);
    ctx.lineTo(x * holeSize + holeSize / 2 - 5, y * holeSize + holeSize / 2);
    ctx.moveTo(x * holeSize + holeSize / 2 + 20, y * holeSize + holeSize / 2 + 5);
    ctx.lineTo(x * holeSize + holeSize / 2 + 5, y * holeSize + holeSize / 2);
    ctx.stroke();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grass background
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            drawHole(x, y);
        }
    }

    if (molePosition.x !== -1 && molePosition.y !== -1) {
        drawMole(molePosition.x, molePosition.y);
    }
}

function spawnMole() {
    molePosition.x = Math.floor(Math.random() * gridSize);
    molePosition.y = Math.floor(Math.random() * gridSize);
    drawGame();
}

function whackMole(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedX = Math.floor(x / holeSize);
    const clickedY = Math.floor(y / holeSize);

    if (clickedX === molePosition.x && clickedY === molePosition.y) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        spawnMole();
    }
}

function updateTime() {
    timeLeft--;
    timeElement.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
        endGame();
    }
}

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = `Score: ${score}`;
    timeElement.textContent = `Time: ${timeLeft}s`;
    startButton.disabled = true;
    startButton.textContent = 'Game in Progress';

    spawnMole();
    gameInterval = setInterval(() => {
        updateTime();
        if (Math.random() < 0.5) {
            spawnMole();
        }
    }, 1000);

    canvas.addEventListener('click', whackMole);
}

function endGame() {
    clearInterval(gameInterval);
    canvas.removeEventListener('click', whackMole);
    molePosition = { x: -1, y: -1 };
    drawGame();
    startButton.disabled = false;
    startButton.textContent = 'Start Game';
    alert(`Game Over! Your score: ${score}`);
}

startButton.addEventListener('click', startGame);
drawGame();

// Add touch event support for mobile devices
canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    whackMole(touch);
});
