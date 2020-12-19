const { Schema, Mongoose } = require("mongoose");
const mongoose = require('mongoose');
require('../../config/mongooseConnection')
require('./transaction')
const userSchema = new Schema({
    userId  : { type: String, unique: true },
    balance : { type: Number }
});


userSchema.virtual('transactions',{
    ref: 'transactions',
    localField: 'userId',
    foreignField: 'user'    
})

userSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v
        delete ret.id
    }
});

const User = mongoose.model('user', userSchema);
 module.exports= {User};
