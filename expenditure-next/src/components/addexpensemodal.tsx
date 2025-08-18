"use client"
import { actions } from '@/redux/budgetslicer';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";

function AddExpenseModal(props: any) {
    const { show, hide, getValues} = props;
    const {title, type} = getValues;
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState(0);
    const dispatch = useDispatch();

  
  return (
  <Modal show={show} onHide={hide} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Add {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        {type === "expense" && (
                            <div className="mb-3">
                                <label htmlFor="expenseName" className="form-label">{title}</label>
                                <input type="text" className="form-control" id="expenseName" placeholder="Enter expense name" onChange={(e) => setExpenseName(e.target.value)} />
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Amount</label>
                            <input type="number" className="form-control" id="amount" placeholder="Enter amount" onChange={(e) => setAmount(Number(e.target.value))} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        dispatch(actions.createIncome({
                            income: amount,
                        }));
                        hide();
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal> 
  );
}

export default AddExpenseModal;