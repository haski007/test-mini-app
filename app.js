document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    const gameContainer = document.getElementById('game-container');
    const scoreElement = document.getElementById('score');
    
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const gameEmojis = [...emojis, ...emojis];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;

    // Initialize Telegram Web App
    tg.expand();
    tg.ready();

    // Shuffle array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Create game board
    function createBoard() {
        const shuffledEmojis = shuffle(gameEmojis);
        for (let i = 0; i < shuffledEmojis.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.emoji = shuffledEmojis[i];
            card.addEventListener('click', flipCard);
            gameContainer.appendChild(card);
        }
    }

    // Flip card
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

    // Check for match
    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            matchedPairs++;
            if (matchedPairs === emojis.length) {
                tg.showAlert(`Congratulations! You won in ${moves} moves!`);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }
        flippedCards = [];
    }

    // Initialize the game
    createBoard();

    // Show alert when MainButton is clicked
    tg.MainButton.setText('Restart Game');
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
        gameContainer.innerHTML = '';
        matchedPairs = 0;
        moves = 0;
        scoreElement.textContent = 'Moves: 0';
        createBoard();
    });
});
