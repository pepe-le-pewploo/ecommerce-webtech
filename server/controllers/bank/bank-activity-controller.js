const Bankuser = require("../../models/bank") // Adjust the path to your User model

// Add money to user's bank account
const addMoneyToAccount = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    console.log(userId, amount);
    // Validate the amount
    if (!amount || amount <= 0) {
      return res.status(400).json({success: false, message: 'Amount must be greater than zero' });
    }

    // Find the user by ID
    const user = await Bankuser.findById(userId);

    if (!user) {
      return res.status(404).json({success: false, message: 'User not found' });
    }

    // Update the user's balance
    user.balance += amount;
    await user.save();

    res.status(200).json({ 
      success: true,
      message: 'Money added successfully', 
      balance: user.balance
    });
  } catch (error) {
    console.error('Error adding money:', error);
    res.status(500).json({success: false, message: 'Internal server error' });
  }
};

const getBalance = async (req, res) => {
  try {
    //console.log(req.user, "getBalance")
    const userId = req.user.bankId? req.user.bankId : req.user.id; // Assuming `req.user` contains the authenticated user's info
  
    // Find the user by ID
    const user = await Bankuser.findById(userId);

    if (!user) {
      return res.status(404).json({success: false, message: 'User not found' });
    }

    // Return the user's balance
    res.status(200).json({ 
      success: true,
      message: 'Balance retrieved successfully', 
      balance: user.balance 
    });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({success: false, message: 'Internal server error' });
  }
};

const withdrawMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.bankId? req.user.bankId : req.user.id; // Assuming `req.user` contains the authenticated user's info
    console.log(userId, amount, "Withdraw Money")
    // Validate the amount
    if (!amount || amount <= 0) {
      return res.status(400).json({success: false, message: 'Amount must be greater than zero' });
    }

    // Find the user by ID
    const user = await Bankuser.findById(userId);

    if (!user) {
      return res.status(404).json({success: false, message: 'User not found' });
    }

    // Check if the user has sufficient balance
    if (user.balance < amount) {
      return res.status(400).json({success: false, message: 'Insufficient balance' });
    }

    // Deduct the amount from the user's balance
    user.balance -= amount;
    await user.save();

    res.status(200).json({ 
      success: true,
      message: 'Withdrawal successful', 
      balance: user.balance 
    });
  } catch (error) {
    console.error('Error during withdrawal:', error);
    res.status(500).json({success: false, message: 'Internal server error' });
  }
};


module.exports = {
  addMoneyToAccount,
  getBalance,
  withdrawMoney
};
