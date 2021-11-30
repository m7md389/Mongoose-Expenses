const mongoose = require("mongoose")
const Schema = mongoose.Schema
mongoose.connect("mongodb://localhost/expense")

const expenseSchema = new Schema({
    item: String,
    amount: Number,
    date: Date,
    group: String
})

const Expense = mongoose.model("Expense", expenseSchema)

module.exports = Expense