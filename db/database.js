const mongoose = require('mongoose');
const { databaseUrl } = require('../config');

const connectDB = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

const DepositSchema = new mongoose.Schema({
  blockNumber: Number,
  blockTimestamp: Date,
  fee: String,
  hash: String,
  pubkey: String,
}, { timestamps: true });

const Deposit = mongoose.model('Deposit', DepositSchema);

module.exports = { connectDB, Deposit };
