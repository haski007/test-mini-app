const emojis = ['😀', '😎', '🥳', '🤔', '😴', '🤯', '🥶', '🤠'];

export function startEmojiMemory(container, tg, onReturnToMenu) {
    let cards = [...emojis, ...emojis];
    cards.sort(() => Math.random() - 0.5);

    let flippedCards = [];
    let matchedPairs = 0;

    container.innerHTML = `
        <h2>Emoji Memory</h2>
        <div id="emoji-grid"></div>
        <p id="moves">Moves: 0</p>
        <button id="return-to-menu" class="return-button">Return to Main Menu</button>
    `;

    const grid = container.querySelector('#emoji-grid');
    const movesDisplay = container.querySelector('#moves');
    const returnButton = container.querySelector('#return-to-menu');
    let moves = 0;

    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${emoji}</div>
            </div>
        `;
        card.addEventListener('click', () => flipCard(card));
        grid.appendChild(card);
    });

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                moves++;
                movesDisplay.textContent = `Moves: ${moves}`;
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const emoji1 = card1.querySelector('.card-back').textContent;
        const emoji2 = card2.querySelector('.card-back').textContent;

        if (emoji1 === emoji2) {
            matchedPairs++;
            if (matchedPairs === emojis.length) {
                setTimeout(() => {
                    showMessage(`Congratulations! You won in ${moves} moves!`, 'success');
                    tg.MainButton.show();
                }, 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 1000);
        }

        flippedCards = [];
    }

    function showMessage(message, type) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.textAlign = 'center';
        messageElement.style.marginTop = '20px';
        messageElement.style.fontWeight = 'bold';
        messageElement.style.fontSize = '18px';
        messageElement.style.color = type === 'success' ? '#4CAF50' : '#F44336';
        container.appendChild(messageElement);
    }

    returnButton.addEventListener('click', () => {
        onReturnToMenu();
    });

    tg.MainButton.show();
}
