const Web3 = require('web3');
const { rpcUrl, beaconContractAddress } = require('../config');
const { Deposit } = require('../db/database');
const logger = require('./logger');
const { sendTelegramNotification } = require('./notifier');

const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

const trackDeposits = async () => {
  console.log('Starting deposit tracker...');
  const latestBlockNumber = await web3.eth.getBlockNumber();

  web3.eth.subscribe('logs', {
    address: beaconContractAddress,
    fromBlock: latestBlockNumber,
  }, async (error, log) => {
    if (error) {
      logger.error('Error in log subscription:', error);
      return;
    }

    try {
      const transaction = await web3.eth.getTransaction(log.transactionHash);
      const block = await web3.eth.getBlock(transaction.blockNumber);
      const depositData = {
        blockNumber: transaction.blockNumber,
        blockTimestamp: new Date(block.timestamp * 1000),
        fee: web3.utils.fromWei(transaction.gasPrice, 'ether'),
        hash: transaction.hash,
        pubkey: extractPublicKeyFromLog(log) // Implement this function to extract public key
      };

      await Deposit.create(depositData);
      logger.info('New deposit recorded:', depositData);
      sendTelegramNotification(`New deposit detected:\nBlock: ${transaction.blockNumber}\nHash: ${transaction.hash}`);

    } catch (err) {
      logger.error('Error processing deposit:', err);
    }
  });
};

const extractPublicKeyFromLog = (log) => {
  return 'pubkey_placeholder';
};

module.exports = { trackDeposits };
