const axios = require('axios');
const { telegramBotToken, telegramChatId } = require('../config');

const sendTelegramNotification = async (message) => {
  try {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    await axios.post(url, {
      chat_id: telegramChatId,
      text: message
    });
    console.log('Telegram notification sent:', message);
  } catch (error) {
    console.error('Error sending Telegram notification:', error.message);
  }
};

module.exports = { sendTelegramNotification };
