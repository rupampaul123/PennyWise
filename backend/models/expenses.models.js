const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
    {
        date : { type: Date, required: true},
        category : {type: String, required: true},
        description : {type: String, required: true},
        amount : {type:Number, required: true}
    }
)

const expenseModel = mongoose.model('expense', expenseSchema);

module.exports = expenseModel;

