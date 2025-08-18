"use client"
import AddExpenseModal from "@/components/addexpensemodal";
import { useState } from "react";

export default function Income(){
    const [modalShow, setModalShow] = useState(false);
    return(
        <div>
            <h1>Add your total income</h1>
            <AddExpenseModal show={() => setModalShow(true)}  getValues={{title:"Add Income", type:"income"}} hide={() => setModalShow(false)} />
        </div>
    )
}