const express = require('express');
const router = express.Router();
const Expense = require('../model/Expense');
const moment = require('moment');

//EXE3
router.get('/expenses', function (req, res) {
  Expense.find({}, function (err, expenses) {
    res.send(expenses);
  }).sort({ date: 1 });
});

//EXE4
router.post('/new', function (req, res) {
  let data = req.body;
  let newExpense = new Expense({
    name: data.name,
    amount: data.amount,
    date: moment().format('LLLL'),
    group: data.group,
  });
  newExpense
    .save()
    .then(
      console.log(
        `The amount of the expense: ${data.amount}, spent for: ${data.group}`
      )
    );
  res.end();
});

//EXE5
router.put('/update/:group1/:group2', function (req, res) {
  let data = req.params;
  Expense.findOneAndUpdate(
    { group: data.group1 },
    { $set: { group: data.group2 } }
  ).exec((err, data) => {
    console.log(data);
  });
  res.send(`Group changed to: ${data.group2}`);
});

//EXE6
router.get('/expenses/:group', function (req, res) {
  let group = req.params.group;
  let params = req.query.total;
  if (params) {
    /* Expense.aggregate( [
       { $match: {  group: data }},
       { $group: { _id: "$data", amount: { $sum: "$amount" } } }
     ] ).exec((err, data)=> {
       console.log(data)
       res.end()});*/
    Expense.aggregate([
      { $match: { group } },
      { $group: { _id: null, amount: { $sum: '$amount' } } }
    ]).exec((err, data) => {
      console.log(data);
      res.end();
    });

    /*Expense.aggregate().match({  group: data }).group({ _id: null}).exec((err, data)=> {
        console.log(data)
        res.end()});*/
  }
});

module.exports = router;
