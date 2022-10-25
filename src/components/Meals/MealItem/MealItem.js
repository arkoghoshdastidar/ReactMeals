import React, { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import cartContext from '../../../store/cart-context';

const MealItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;
    const ctx = useContext(cartContext);

    const addToCartHandler = (amount) => {
        ctx.addItem({
            name: props.name,
            id: props.id,
            amount: amount,
            price: props.price
        });
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddItem={addToCartHandler} />
            </div>
        </li>
    );
}

export default MealItem;