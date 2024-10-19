import { startEmojiMemory } from './games/emojiMemory/emojiMemory.js';
import { startWordScramble } from './games/wordScramble/wordScramble.js';

const tg = window.Telegram.WebApp;
const mainMenu = document.getElementById('main-menu');
const gameContainer = document.getElementById('game-container');

document.addEventListener('DOMContentLoaded', () => {
    tg.ready();
    tg.expand();

    document.getElementById('emoji-memory').addEventListener('click', () => {
        startGame('emojiMemory');
    });

    document.getElementById('word-scramble').addEventListener('click', () => {
        startGame('wordScramble');
    });

    tg.MainButton.setText('Back to Menu');
    tg.MainButton.onClick(returnToMainMenu);
});

function startGame(gameName) {
    mainMenu.style.display = 'none';
    gameContainer.innerHTML = '';
    loadCSS(`games/${gameName}/${gameName}.css`);
    if (gameName === 'emojiMemory') {
        startEmojiMemory(gameContainer, tg, returnToMainMenu);
    } else if (gameName === 'wordScramble') {
        startWordScramble(gameContainer, tg, returnToMainMenu);
    }
    tg.MainButton.hide();
}

function returnToMainMenu() {
    mainMenu.style.display = 'flex';
    gameContainer.innerHTML = '';
    tg.MainButton.hide();
}

function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}
