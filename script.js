const startButton = document.getElementById('start-button');
const shape = document.getElementById('shape');
const scoreSpan = document.getElementById('score');

let score = 0;
let shapeTimeoutId;

function startGame() {
    score = 0;
    scoreSpan.textContent = score;
    startButton.style.display = 'none';
    displayShape();
}

function displayShape() {
    const gameContainer = document.getElementById('game-container');
    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;
    const shapeSize = 50;

    const x = Math.random() * (containerWidth - shapeSize);
    const y = Math.random() * (containerHeight - shapeSize);

    shape.style.left = x + 'px';
    shape.style.top = y + 'px';
    shape.style.display = 'block';

    shapeTimeoutId = setTimeout(() => {
        shape.style.display = 'none';
        displayShape();
    }, 1000);
}

shape.addEventListener('click', () => {
    score++;
    scoreSpan.textContent = score;
    shape.style.display = 'none';
    clearTimeout(shapeTimeoutId);
    displayShape();
});

startButton.addEventListener('click', startGame);
