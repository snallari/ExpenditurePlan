import express from "express";
import Income from "../db/model/incomemodel.js"

const router = express.Router();

router.post('/postIncome', async (req, res) => {
    try {
        const newIncome = new Income({
            totalIncome: req.body.totalIncome,
            month: req.body.month
        });
        await newIncome.save();
        res.status(201).send('Income added successfully');
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).send('Internal Server Error');
    }
});



export default router;
