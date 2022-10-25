import React, { useContext } from 'react';
import cartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';

const Cart = props => {
    const cartCtx = useContext(cartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    }

    const cartItems = (<ul className={classes['cart-items']}>
        {
            cartCtx.items.map((item) => {
                return (
                    <CartItem
                        key={item.id}
                        id={item.id}
                        price={item.price}
                        amount={item.amount}
                        name={item.name}
                        onAdd={cartItemAddHandler.bind(null, item)}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    ></CartItem>
                )
            })
        }
    </ul>);

    return (
        <Modal onCloseCart={props.onCloseCart}>
            {cartItems}
            <div>
                <span className={classes['total']}>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes['actions']}>
                <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
                {hasItems && <button className={classes['button']}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;