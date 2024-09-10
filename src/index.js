const { connectDB } = require('./db/database');
const { trackDeposits } = require('./src/depositTracker');
const logger = require('./src/logger');

// Connect to the database and start tracking deposits
(async () => {
  await connectDB();
  trackDeposits();
  logger.info('Ethereum Deposit Tracker started...');
})();
