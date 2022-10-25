import React, { useContext, useRef, useState } from 'react';
import cartContext from '../../../store/cart-context';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const inputRef = useRef();
    const ctx = useContext(cartContext);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = inputRef.current.value;
        // console.log(enteredAmount);
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 || enteredAmountNumber > 5
        ) {
            setAmountIsValid(false);
            return;
        }
        props.onAddItem(enteredAmountNumber);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={inputRef} label="Amount" input={{
                id: 'amount',
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    )
}

export default MealItemForm;