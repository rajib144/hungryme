import Modal from '../UI/Modal.js';
import { useContext } from 'react';
import CartContext from '../Store/Cart-Context.js';
import classes from './Cart.module.css';
import CartItem from './CartItem.js';
export function Cart(props){
    const cartCtx = useContext(CartContext);
    const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems=cartCtx.items.length>0;
    const cartitemRemoveHandler = (id) => {
        
        cartCtx.removeItem(id);
    };
    
    const cartItemAddHandler = (item) => {
        
        cartCtx.addItem({...item,amount:1});
    };
     
    const cartItems=<ul className={classes['cart-items']}>{cartCtx.items.map(item=><CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartitemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)} />)}</ul>
    return(
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}