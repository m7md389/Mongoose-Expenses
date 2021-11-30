const express = require('express')
const Expense = require('../../model/expense')
const router = express.Router()
const moment = require("moment")


router.get("/expenses", function(req, res) {
    Expense.find({}).sort({ date: -1 }).exec(function(err, data) {
        res.send(data)
    })
})

router.get("/expenses/:group", async function(req, res) {
    const sum = await Expense.aggregate([
        { $match: { group: req.params.group } },
        {
            $group: {
                "_id": null,
                total: { $sum: "$amount" }
            }
        }
    ])

    console.log(sum[0].total);
    res.send(`Total: ${sum[0].total}`)
})

router.post("/expense", function(req, res) {
    const expense = new Expense({
        item: req.body.item,
        date: req.body.date ? moment(req.body.date).format("LLLL") : moment().format("LLLL"),
        amount: req.body.amount,
        group: req.body.group
    })
    expense.save()
    res.send("done!")
})


router.put("/update/:group1/:group2", async function(req, res) {
    const expense = await Expense.findOneAndUpdate({ group: req.params.group1 }, { "$set": { group: req.params.group2 } })
    res.send(expense.item + "  " + req.params.group2)
})





module.exports = router