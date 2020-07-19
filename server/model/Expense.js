const mongoose = require('mongoose')
const Schema = mongoose.Schema


// mongoose.connect("mongodb://localhost/MongooseExpensesProject", { useNewUrlParser: true })



const expenseSchema = new Schema({
    name: String,
    amount: Number,
    date: Date,
    group: String
  })

  const Expense = mongoose.model("Expense", expenseSchema)



  module.exports = Expense