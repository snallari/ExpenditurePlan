import {configureStore} from "@reduxjs/toolkit"
import budgetReducer from "./budgetslicer"

export const store = configureStore({
    reducer: {
        budget: budgetReducer
    }
});