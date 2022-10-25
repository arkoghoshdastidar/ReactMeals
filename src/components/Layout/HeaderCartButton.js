import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import { useContext } from 'react';
import cartContext from '../../store/cart-context';

const HeaderCartButton = props => {
    const ctx = useContext(cartContext);
    let numOfItems = ctx.items.reduce((currNum, item) => {
        return currNum + item.amount;
    }, 0);
    return (
        <button onClick={props.onClick} className={styles.button}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>YourCart</span>
            <span className={styles.badge}>{numOfItems}</span>
        </button>
    );
}

export default HeaderCartButton;