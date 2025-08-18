

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BudgetState {
    expenses: { amount: number; [key: string]: any, date:any }[];
    income: number;
    total: number;
}

const initialState: BudgetState = {
    expenses: [],
    income: 0,
    total: 0,
};

interface Expense {
    amount: number;
    [key: string]: any;
    date:any
}

interface CreateExpenseAction {
    type: string;
    payload: Expense;
    date:any
}

interface CreateIncomeAction {
    type: string;
    payload: { income: number };
}
const budgetSlice = createSlice({
    name: "budget",
    initialState,
    reducers: {
        createExpense: (state: BudgetState, action: PayloadAction<Expense>) => {
            state.expenses.push({amount:action.payload.amount,category:action.payload.category,date:action.payload.date});
            state.total += action.payload.amount;
        },
        createIncome: (state: BudgetState, action: PayloadAction<{ income: number }>) => {
            state.income = action.payload.income;
        },
        deleteExpense: (state: BudgetState, action: PayloadAction<Expense>) => {
            console.log("action", action.payload)
            state.expenses=state.expenses.filter((expense:any)=>expense.date!==action.payload.date)
            console.log("state.expenses", state.expenses)
        }
    }
});

export default budgetSlice.reducer
export const actions = budgetSlice.actions