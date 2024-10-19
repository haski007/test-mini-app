const words = [
    'javascript', 'python', 'html', 'css', 'react', 'angular', 'vue', 'nodejs',
    'typescript', 'jquery', 'bootstrap', 'sass', 'less', 'webpack', 'babel',
    'express', 'mongodb', 'mysql', 'postgresql', 'firebase', 'graphql', 'redux',
    'vuex', 'nextjs', 'nuxtjs', 'svelte', 'electron', 'flutter', 'dart', 'kotlin',
    'swift', 'objective-c', 'ruby', 'rails', 'php', 'laravel', 'symfony', 'django',
    'flask', 'spring', 'hibernate', 'docker', 'kubernetes', 'jenkins', 'gitlab',
    'github', 'bitbucket', 'jira', 'trello', 'slack', 'zoom', 'figma', 'sketch',
    'photoshop', 'illustrator', 'indesign', 'premiere', 'aftereffects', 'blender',
    'unity', 'unreal', 'godot', 'phaser', 'threejs', 'webgl', 'svg', 'canvas',
    'websocket', 'restapi', 'oauth', 'jwt', 'bcrypt', 'passport', 'socket-io',
    'webpack', 'gulp', 'grunt', 'yarn', 'npm', 'eslint', 'prettier', 'jest',
    'mocha', 'chai', 'cypress', 'selenium', 'puppeteer', 'axios', 'fetch',
    'lodash', 'moment', 'chart-js', 'd3', 'leaflet', 'mapbox', 'tensorflow',
    'pytorch', 'keras', 'scikit-learn', 'pandas', 'numpy', 'matplotlib',
    'jupyter', 'anaconda', 'vscode', 'sublime', 'atom', 'webstorm', 'pycharm',
    'intellij', 'eclipse', 'xcode', 'android-studio', 'postman', 'insomnia',
    // Web3
    'blockchain', 'ethereum', 'bitcoin', 'cryptocurrency', 'smartcontract',
    'solidity', 'web3js', 'metamask', 'wallet', 'nft', 'defi', 'dao',
    'mining', 'consensus', 'token', 'ico', 'airdrop', 'altcoin', 'dapp',
    'gas', 'gwei', 'hardhat', 'truffle', 'ganache', 'ipfs', 'polkadot',
    'cardano', 'ripple', 'litecoin', 'dogecoin', 'uniswap', 'sushiswap',
    'pancakeswap', 'yield', 'staking', 'liquidity', 'oracle', 'chainlink',
    'binance', 'coinbase', 'kraken', 'ledger', 'trezor', 'multisig',
    'erc20', 'erc721', 'erc1155', 'sidechain', 'layer2', 'rollup',
    'sharding', 'plasma', 'lightning', 'atomic', 'crosschain', 'interoperability',
    'governance', 'tokenomics', 'cryptography', 'hash', 'merkle', 'zksnarks',
    'schnorr', 'secp256k1', 'ecdsa', 'bip39', 'hdwallet', 'mnemonic'
];
export function startWordScramble(container, tg, onReturnToMenu) {
    let currentWord = '';
    let scrambledWord = '';
    let score = 0;

    container.innerHTML = `
        <h2>Word Scramble</h2>
        <p id="scrambled-word"></p>
        <input type="text" id="guess-input" placeholder="Enter your guess">
        <button id="submit-guess">Submit</button>
        <p id="score">Score: 0</p>
        <button id="return-to-menu" class="return-button">Return to Main Menu</button>
    `;

    const scrambledWordDisplay = container.querySelector('#scrambled-word');
    const guessInput = container.querySelector('#guess-input');
    const submitButton = container.querySelector('#submit-guess');
    const scoreDisplay = container.querySelector('#score');
    const returnButton = container.querySelector('#return-to-menu');

    function newWord() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        scrambledWord = scrambleWord(currentWord);
        scrambledWordDisplay.textContent = scrambledWord;
        guessInput.value = '';
    }

    function scrambleWord(word) {
        return word.split('').sort(() => Math.random() - 0.5).join('');
    }

    function checkGuess() {
        const guess = guessInput.value.toLowerCase();
        if (guess === currentWord) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            showMessage('Correct!', 'success');
            newWord();
        } else {
            showMessage('Try again!', 'error');
        }
        guessInput.value = '';
    }

    function showMessage(message, type) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.textAlign = 'center';
        messageElement.style.marginTop = '10px';
        messageElement.style.fontWeight = 'bold';
        messageElement.style.color = type === 'success' ? '#4CAF50' : '#F44336';
        container.appendChild(messageElement);
        setTimeout(() => {
            container.removeChild(messageElement);
        }, 2000);
    }

    submitButton.addEventListener('click', checkGuess);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });

    returnButton.addEventListener('click', () => {
        onReturnToMenu();
    });

    newWord();
    tg.MainButton.show();
}
