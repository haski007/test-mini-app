const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
let cards = [];
let flippedCards = [];
let moves = 0;

function createBoard() {
    const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    for (let i = 0; i < 16; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = shuffledEmojis[i];
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    }
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.emoji;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            scoreElement.textContent = `Moves: ${moves}`;
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }
    flippedCards = [];

    if (cards.every(card => card.classList.contains('flipped'))) {
        alert(`Congratulations! You won in ${moves} moves!`);
    }
}

createBoard();