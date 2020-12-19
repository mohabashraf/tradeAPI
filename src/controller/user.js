const express = require('express');
require('../config/mongooseConnection')
const stocks = require("../config/mqtt")
const router = express.Router();
const userService = require('../service/user')
const {Transaction}= require('../model/schema/transaction')
require('../config/mongooseConnection')

router.post('/deposit', async (req, res, next) => {
  try {
    console.log("Calling add deposit to user endpoint")
    console.log(`the bode of the request is ${JSON.stringify(req.body)}`)
    const userId = req.body.userId
    const amount = req.body.amount
    console.log(`Adding ${amount} to user with id equals ${userId}`)
    await userService.deposit(userId, amount);
    const user = await userService.getUser(userId)
    res.status(200).json(user.userId + user.balance)
  } catch (err) {
    console.log("errors")   
    res.status(500).json(err.message)
  }
});

router.post('/withdraw', async (req, res, next) => {
  try {
    console.log("Calling the withdraw endpoint ")
    console.log(`the bode of the request is ${JSON.stringify(req.body)}`)
    const userId = req.body.userId
    const amount = req.body.amount
    console.log(`Adding ${amount} to user with id equals ${userId}`)
    await userService.withDraw(userId, amount);
    const user = await userService.getUser(userId)
    res.status(200).json(user.userId + user.balance)
  } catch (err) {
    console.log("errors")   
    res.status(500).json(err.message)
  }
  });

  router.post('/buy', async (req, res, next) => {
    try {
      console.log("Calling the withdraw endpoint ")
      console.log(`the bode of the request is ${JSON.stringify(req.body)}`)
      const userId = req.body.user_id
      const stock_id = req.body.stock_id
      const total = req.body.total
      const upper_bound = req.body.upper_bound
      const lower_bound = req.body.lower_bound
      await userService.stockExhange(userId, stock_id, total, upper_bound, lower_bound, "Buy");
      res.status(200).json("done")
    } catch (err) {
      console.log("errors")   
      res.status(500).json(err.message)
    }
    });

    router.post('/sell', async (req, res, next) => {
      try {
        console.log("Calling the withdraw endpoint ")
        console.log(`the bode of the request is ${JSON.stringify(req.body)}`)
        const userId = req.body.user_id
        const stock_id = req.body.stock_id
        const total = req.body.total
        const upper_bound = req.body.upper_bound
        const lower_bound = req.body.lower_bound
        await userService.stockExhange(userId, stock_id, total, upper_bound, lower_bound, "Sell");
        res.status(200).json("done")
        // const result = await addMoneytoUser(userId, amount);
        // res.status(200).json(subject);
      } catch (err) {
        console.log("errors")   
        res.status(500).json(err.message)
      }
      });

    router.get('/user', async (req, res, next) => {
      try {
        console.log("Calling the withdraw endpoint ")
        console.log(`the bode of the request is ${JSON.stringify(req.body)}`)
        const userId = req.query.user_id
        const user = await userService.getUser(userId);
        res.status(200).json(user)
      } catch (err) {
        console.log("errors")   
        res.status(500).json(err.message)
      }
      });

      router.get('/stock', async (req, res, next) => {
        try {
          console.log("Calling the withdraw endpoint ")
          const stock = stocks["stocks"][req.query.stock_id] 
          const transactions = await Transaction.find({stockId: req.query.stock_id})
          stock["transactions"] = transactions
          res.status(200).json(stock)
        } catch (err) {
          console.log("errors")   
          res.status(500).json(err.message)
        }
        });

module.exports = router;
