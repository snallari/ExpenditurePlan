import express from "express";
import Budget from "../db/model/budgetmodel.js";
import Income from "../db/model/incomemodel.js";

const router = express.Router();


router.get('/expenses', (req,res)=>{
    res.send('List of expenses');
})

router.post('/postExpense', async (req, res) => {
    try {
        const newExpense = new Budget({
            category: req.body.category,
            amount: req.body.amount,
            date: req.body.date || Date.now()
        });
        if (Array.isArray(req.body)) {
            await Budget.insertMany(req.body);
            res.status(201).send('Expenses added successfully');
        } else {
            await newExpense.save();
            res.status(201).send('Expense added successfully');
        }
    } catch (error) {
        console.error("Error adding expenses:", error);
        res.status(500).send('Internal Server Error');
    }
})

// Get all expenses
router.get('/getExpenses', async (req, res) => {
    try {
        const expenses = await Budget.find();
        const income = await Income.find();
        const totalAmount = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
        const amountRemaining = income.totalAmount - totalAmount;
        res.status(200).json({
            expenses,
            totalAmount,
            amountRemaining
        });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
