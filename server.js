const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Telegram Bot Token и Chat ID
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; // Замените на ваш токен
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID'; // Замените на ваш Chat ID

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Обработчик POST-запроса
app.post('/submit-form', async (req, res) => {
    const { name, phone, email, message } = req.body;

    // Формируем текст сообщения
    const text = `Новая заявка:\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nСообщение: ${message}`;

    try {
        // Отправляем сообщение в Telegram
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: text
        });

        res.status(200).send('Сообщение успешно отправлено.');
    } catch (error) {
        console.error('Ошибка при отправке в Telegram:', error);
        res.status(500).send('Ошибка при отправке сообщения.');
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});