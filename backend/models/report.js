const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  name: String,
  mobilePhone: String,
  PAN: String,
  creditScore: Number,
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAccounts: Number,
    unsecuredAccounts: Number,
    creditEnquiries: Number,
  },
  creditAccounts: [
    {
      creditCard: String,
      bank: String,
      address: String,
      accountNumber: String,
      amountOverdue: Number,
      currentBalance: Number,
    },
  ],
});

module.exports = mongoose.model('Report', reportSchema);
