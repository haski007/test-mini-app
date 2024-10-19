// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

// Function to send data to the bot
function sendDataToBot(data) {
    tg.sendData(JSON.stringify(data));
}

// Function to connect to Abstract
function connectToAbstract() {
    const connectionStatus = document.getElementById('connection-status');
    connectionStatus.textContent = 'Connecting to Abstract...';

    // Send a request to the bot to handle Abstract connection
    sendDataToBot({ action: 'connect_abstract' });
}

// Set up event listener for the connect button
document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connect-abstract');
    connectButton.addEventListener('click', connectToAbstract);

    // Listen for messages from the bot
    tg.onEvent('message', function(message) {
        const connectionStatus = document.getElementById('connection-status');
        if (message.data) {
            const data = JSON.parse(message.data);
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