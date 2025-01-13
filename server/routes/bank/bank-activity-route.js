const express = require('express');
const {
  addMoneyToAccount,
  withdrawMoney,
  getBalance,
} = require('../../controllers/bank/bank-activity-controller'); // Adjust the path to your controllers
const { authMiddleware } = require('../../controllers/bank/bank-auth-controller');
 // Middleware for authentication

const router = express.Router();


console.log(addMoneyToAccount)
// Route to add money to user's account
router.post('/deposit',  addMoneyToAccount);

// Route to withdraw money from user's account
router.post('/withdraw', authMiddleware,  withdrawMoney);

// Route to fetch the user's balance
router.get('/balance', authMiddleware, getBalance);


module.exports = router;
