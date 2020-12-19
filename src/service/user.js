require('../config/mongooseConnection')
const userModel = require('../model/user')
const stocks = require("../config/mqtt")
const { Transaction } = require('../model/schema/transaction')
const populateUser = () => {
    userModel.populateUser()
}

const deposit = async (userId, amount) => {
    try {
      const user = await getUser(userId)
      await userModel.updateBalance(userId, user.balance + amount)
      return true
      } catch (err) {
        throw err
      }
  };
  
  const stockExhange = async (userId, stock_id, total, upper_bound, lower_bound, type) =>{
        try {
            console.log('user id ' + stock_id)
            const currentUser = await userModel.getUser(userId)
            const currentStock = stocks["stocks"][stock_id]
            console.log("current stock "+ JSON.stringify(currentStock))
            const totalCurrentStockPrice = currentStock.price * currentStock.avalibility
            const time = currentStock.timestamp
            if(total > currentStock.avalibility) throw new Error("the request more than the available stock")
            if(currentUser.balance < totalCurrentStockPrice) throw new Error("insufficient user ballance")
            if(upper_bound < currentStock.price) throw new Error("the current price exceeds the upper bound")
            if(lower_bound > currentStock.price) throw new Error("the current stock price less than lower bound")
            const transaction = new Transaction({user: userId, stockId: stock_id, time, type})
            transaction.save().
            then((transactionn) => console.log(`is create successfully with balance equal`))
            .catch((error) => console.log(`Error is ${error} while initializing users`))
        } catch(err){
            console.log(err)
            throw err
        }

  }
  const getUser = async (userId, amount) => {
    try {
        console.log("Before adding user balance")
      const user = await userModel.getUser(userId)
      console.log("After adding user balance")
      return user
    } catch (err) {
      throw err
    }
  };


  const withDraw = async (userId, amount) => {
    try {
        console.log("Before adding user balance")
        const user = await getUser(userId)
        await userModel.updateBalance(userId, user.balance-amount)
        console.log("After adding user balance")
         return true
    } catch (err) {
      throw err
    }
  };
  
  
  

module.exports = {populateUser, deposit, getUser, withDraw, stockExhange}