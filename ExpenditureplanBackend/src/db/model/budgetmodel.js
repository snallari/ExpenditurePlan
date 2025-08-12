import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
