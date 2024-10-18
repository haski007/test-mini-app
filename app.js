document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    const changeColorBtn = document.getElementById('changeColorBtn');
    const greeting = document.getElementById('greeting');

    // Initialize Telegram Web App
    tg.expand();
    tg.ready();

    // Set initial text color based on Telegram theme
    greeting.style.color = tg.themeParams.text_color;

    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Change background color when button is clicked
    changeColorBtn.addEventListener('click', () => {
        document.body.style.backgroundColor = getRandomColor();
    });

    // Show alert when MainButton is clicked
    tg.MainButton.setText('Hello!');
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
        tg.showAlert('Hello from Telegram Mini App!');
    });
});