// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

console.log('Telegram Web App object:', window.Telegram.WebApp);

// Function to send data to the bot
function sendDataToBot(data) {
    console.log('Sending data to bot:', data);
    tg.sendData(JSON.stringify(data));
}

// Function to connect to Abstract
function connectToAbstract() {
    log('Connect to Abstract button clicked');
    const connectionStatus = document.getElementById('connection-status');
    connectionStatus.textContent = 'Connecting to Abstract...';

    sendDataToBot({ action: 'connect_abstract' });
}

// Set up event listener for the connect button
document.addEventListener('DOMContentLoaded', () => {
    log('DOM content loaded');
    const connectButton = document.getElementById('connect-abstract');
    connectButton.addEventListener('click', connectToAbstract);

    // Listen for messages from the bot
    tg.onEvent('message', function(message) {
        log('Received message from bot: ' + JSON.stringify(message));
        const connectionStatus = document.getElementById('connection-status');
        if (message.data) {
            const data = JSON.parse(message.data);
            console.log('Parsed data:', data);
            if (data.status === 'connected') {
                connectionStatus.textContent = `Connected to Abstract. Address: ${data.address}`;
            } else if (data.status === 'error') {
                connectionStatus.textContent = `Error: ${data.message}`;
            }
        }
    });
});

// Expand the WebApp to full screen
tg.expand();

function log(message) {
    const logArea = document.getElementById('log-area');
    logArea.innerHTML += message + '<br>';
    logArea.scrollTop = logArea.scrollHeight;
}

// Use this instead of console.log
log('DOM content loaded');
