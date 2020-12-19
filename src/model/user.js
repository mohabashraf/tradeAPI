const mongoose = require('mongoose');
const { User } = require("./schema/user");
const Schema = mongoose.Schema;
exports.Schema = Schema;
require('../config/mongooseConnection')


const populateUser = () => {
    User.deleteMany(() => console.log("Drop User Collection")).then(() => {
    const users = [new User({ userId: "1", balance: 500 }), new User({ userId: "2", balance: 1000 }), new User({ userId: "3", balance: 700 })]
    users.forEach( user => {
        user.save().
        then((user) => console.log(`${user.userId} is create successfully with balance equal ${user.balance}`))
        .catch((error) => console.log(`Error is ${error} while initializing users`))
    })}).catch((error) => console.log("error while populating user database"))
}


const getUser = async (userId) => {
    try
    {
        const filter = { userId };
        const user = await User.findOne(filter);
        if(!user || user == {}){
            console.log("err")
            throw new Error(`Cannot find user with userId equals ${userId}`)
        } 
        await user.populate('transactions').execPopulate()
        return user
    }catch(err){
        throw err
    }
    
}

const updateBalance = async (userId, balance) => {
    try
    {
        const filter = { userId };
        const update = { userId, balance }
        await User.findOneAndUpdate(filter, update, (error, res) => {
            if(error){
                return console.log("Error"+ error)
            }
            console.log(`The response after updating using account res ${res}`)
        });
        console.log("exit")
        return
    }catch(err){
        throw new Error("Failed to update user")
    }
}


module.exports = {populateUser, getUser, updateBalance, User}