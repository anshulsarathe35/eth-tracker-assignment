require('dotenv').config();

module.exports = {
  rpcUrl: process.env.RPC_URL,
  beaconContractAddress: process.env.BEACON_CONTRACT_ADDRESS,
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramChatId: process.env.TELEGRAM_CHAT_ID,
  databaseUrl: process.env.DATABASE_URL
};
