import cartContext from './cart-context';
import { useReducer } from 'react';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedAmount = state.totalAmount + action.item.price * action.item.amount;
        
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingItem = state.items[existingCartItemIndex];
        
        let updatedItem;
        let updatedItems;

        if(existingItem){
            updatedItem = {
                ...existingItem,
                amount: action.item.amount + existingItem.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems = [...state.items];
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedAmount
        };
    } else if (action.type === 'REMOVE_ITEM') {
        let newState = [];
        let newTotalAmount = 0;
        newState = state.items.filter(item => {
            if(item.id != action.id){
                newTotalAmount += item.amount*item.price;
                return item;
            }else if(item.id == action.id && item.amount > 1){
                item.amount--;
                newTotalAmount += item.amount*item.price;
                return item;
            }
        });
        return {
            items: newState,
            totalAmount: newTotalAmount
        };
    }
    return defaultCartState;
};

const CartProvider = props => {
    const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartState({ type: 'ADD_ITEM', item: item });
    }

    const removeItemFromCartHandler = id => {
        dispatchCartState({ type: 'REMOVE_ITEM', id: id });
    }

    const cartContextHelper = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return (
        <cartContext.Provider value={cartContextHelper}>
            {props.children}
        </cartContext.Provider>
    )
};

export default CartProvider;