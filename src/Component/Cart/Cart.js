import Modal from '../UI/Modal.js';
import React,{ useContext, useState } from 'react';
import CartContext from '../Store/Cart-Context.js';
import classes from './Cart.module.css';
import CartItem from './CartItem.js';
import CheckOut from './CheckOut.js';
export function Cart(props){
    const [isSubmitting,setisSubmitting]=useState(false);
    const[didSumbit,setDidSubmit]=useState(false);
    const [isCheckOut,setIsCheckOut]=useState(false)
    const cartCtx = useContext(CartContext);
    const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems=cartCtx.items.length>0;
    const cartitemRemoveHandler = (id) => {
        
        cartCtx.removeItem(id);
    };
    
    const cartItemAddHandler = (item) => {
        
        cartCtx.addItem({...item,amount:1});
    };
     const OrderHandler = ()=>{
        setIsCheckOut(true);
     }
     const submitOrderHandler=async (userData)=>{
        setisSubmitting(true);
        console.dir(userData)
        
        try{
            const response=await fetch('https://react-test-67c66-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user: userData,
                orderedItems:cartCtx.items
            })
        });
        }
        catch(err){
            console.log(err);
        }
    
        
        setisSubmitting(false);
        setDidSubmit(true);
     }
     const cartItems=<ul className={classes['cart-items']}>{cartCtx.items.map(item=><CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartitemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)} />)}</ul>
     const cartModalContent=<React.Fragment>  {cartItems}
     <div className={classes.total}>
         <span>Total Amount</span>
         <span>{totalAmount}</span>
     </div>
     {isCheckOut && <CheckOut onConfirm={submitOrderHandler} onClose={props.onClose}/>}
     {!isCheckOut && <div className={classes.actions}>
         <button className={classes['button--alt']} onClick={props.onClose}>close</button>
         {hasItems && <button className={classes.button} onClick={OrderHandler}>Order</button>}
     </div>}
     </React.Fragment>
    
    const isSubmittingModalContent=<p>Sending Order Data</p>
    const didSumbitModalContent=<p>Hurrayh!! Order Placed Successfully</p>

    return(
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSumbit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSumbit && didSumbitModalContent}
        </Modal>
    )
}