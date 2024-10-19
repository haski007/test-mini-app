document.addEventListener('DOMContentLoaded', () => {
    try {
        const tg = window.Telegram.WebApp;
        const gameContainer = document.getElementById('game-container');
        const scoreElement = document.getElementById('score');
        
        if (!gameContainer) {
            throw new Error('Game container not found');
        }
        
        const emojis = ['🦄', '🐙', '🦋', '🦜', '🦊', '🐳', '🦁', '🐘', '🐬', '🦖'];
        const gameEmojis = [...emojis, ...emojis];
        let flippedCards = [];
        let matchedPairs = 0;
        let moves = 0;
        let isProcessing = false;

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
                card.innerHTML = `
                    <div class="front">?</div>
                    <div class="back">${shuffledEmojis[i]}</div>
                `;
                card.dataset.emoji = shuffledEmojis[i];
                card.addEventListener('click', flipCard);
                gameContainer.appendChild(card);
            }
        }

        // Flip card
        function flipCard() {
            if (isProcessing || flippedCards.length >= 2 || this.classList.contains('flipped')) return;

            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                isProcessing = true;
                moves++;
                scoreElement.textContent = `Moves: ${moves}`;
                setTimeout(checkMatch, 600);
            }
        }

        // Check for match
        function checkMatch() {
            const [card1, card2] = flippedCards;
            const isMatch = card1.dataset.emoji === card2.dataset.emoji;

            if (isMatch) {
                matchedPairs++;
                card1.classList.add('celebrate');
                card2.classList.add('celebrate');
                setTimeout(() => {
                    card1.classList.remove('celebrate');
                    card2.classList.remove('celebrate');
                }, 500);
                if (matchedPairs === emojis.length) {
                    tg.showAlert(`Congratulations! You won in ${moves} moves!`);
                }
            } else {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }
            flippedCards = [];
            isProcessing = false;
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
    } catch (error) {
        console.error('An error occurred:', error);
        document.body.innerHTML += `<p>Error: ${error.message}</p>`;
    }
});
