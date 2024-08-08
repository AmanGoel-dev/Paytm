const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account, User } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const account = await Account.findOne({ userId });
  if (account) {
    return res.status(200).json({
      balance: account.balance,
    });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const body = req.body;
  const amount = body.amount;
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (account.balance < body.amount || !account) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "insuffecient balance ",
    });
  }
  const toaccount = await Account.findOne({
    userId: req.body.transfer,
  }).session(session);
  // console.log(toaccount);
  if (!toaccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "invalid account",
    });
  }
  await Account.updateOne(
    { userId: req.userId },
    {
      $inc: {
        balance: -amount,
      },
    },
    { session }
  );
  await Account.updateOne(
    { userId: body.transfer },
    {
      $inc: {
        balance: amount,
      },
    },
    { session }
  );
  await session.commitTransaction();
  return res.status(200).json({
    message: "transaction completed successfully ",
  });
});

module.exports = router;
