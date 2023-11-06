import CartContext from "../Store/Cart-Context";
import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from './HeadeCartButton.module.css';
export function HeadercartButton(props){
    const cartCtx=useContext(CartContext);
    const numberOfCartItems=cartCtx.items.reduce((curNumber,item)=>{ return curNumber+item.amount},0)
    return(
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon} >
                <CartIcon  />
            </span>
            <span > your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}