"use client"
import AddExpenseModal from "@/components/addexpensemodal"
import { actions } from "@/redux/budgetslicer";
import { useEffect, useState } from "react"
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../const"




export default function BudgetPage() {
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState(0);
    const expenses = useSelector((state: any) => state.budget.expenses)
    const totalExpenses = useSelector((state: any) => state.budget.total)
    const dispatch = useDispatch()


    const submit = () => {
       // let exp=expenses.map((expense:any)=>({amount:expense.amount,category:expense.category,date:expense.date}));
       // console.log("exp",exp)
        fetch(API_URL + "/budget/postExpense", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expenses)
        }).then(res => res.json()).then(data => {
            console.log(data)
        })
    }

    const getAllExpenses = () => {
       // let exp=expenses.map((expense:any)=>({amount:expense.amount,category:expense.category,date:expense.date}));
       // console.log("exp",exp)
        fetch(API_URL + "/budget/getExpenses", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            console.log(data)
        })
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Expense Name</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td><input type="text" onChange={(e) => setExpenseName(e.target.value)} /></td>
                        <td><input type="text" onChange={(e) => setAmount(Number(e.target.value))} /></td>
                        <td><Button disabled={expenseName === "" || amount <= 0} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                dispatch(actions.createExpense({ category: expenseName, amount, date: new Date().toISOString() }));
                            }
                        }}>Add</Button></td>
                        <td><Button onClick={getAllExpenses}>Get All Expenses</Button></td> 
                    </tr>
                    {expenses.map((expense: any, index: number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{expense.category}</td>
                            <td>${expense.amount}</td>
                            <td><Button onClick={() => dispatch(actions.deleteExpense(expense))}>Delete</Button></td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2}>Total</td>
                        <td>${totalExpenses}</td>
                        <td><Button onClick={submit}>Clear</Button></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}