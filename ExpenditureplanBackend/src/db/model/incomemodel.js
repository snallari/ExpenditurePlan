import mongoose from "mongoose";


const incomeSchema=new mongoose.Schema({
    totalIncome:Number,
    month:String
})

const Income = mongoose.model("Income", incomeSchema);


export default Income
