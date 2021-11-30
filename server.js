const express = require("express")
const path = require("path")
const api = require("./server/routes/api")
const Expense = require("./model/expense")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', api)




const PORT = 3000
app.listen(PORT, function() {
    console.log(`Expenses server is running on port ${PORT}`);
})



// const expensesData = require("./expenses.json")
// expensesData.forEach(data => {
//     const e = new Expense({
//         item: data.item,
//         amount: data.amount,
//         date: data.date,
//         group: data.group
//     })
//     e.save()
// })