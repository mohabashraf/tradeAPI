const { Schema, Mongoose } = require("mongoose");
const mongoose = require('mongoose');
require('../../config/mongooseConnection')

const transactionSchema = new Schema({
    user: { type: String, ref: 'user'},
    stockId : { type: String },
    time: {type: Date},
    type: {type: String}
});

transactionSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v
        delete ret.id
    }
});

const Transaction = mongoose.model('transactions', transactionSchema)
module.exports= {Transaction};
