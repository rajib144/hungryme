import classes from './MealItemForm.module.css';
import { useRef, useState } from 'react';
import  Input  from '../../UI/Input';
export function MealItemForm(props){
    const [amountIsValid,setAmountisValid]=useState(true);
    const amountInputRef=useRef();
    const submitHandler=event=>{
        event.preventDefault();
        const etnteredAmount=amountInputRef.current.value;
        const etnteredAmountNumber= +etnteredAmount;
        if(etnteredAmount.trim().length===0||etnteredAmountNumber<1||etnteredAmountNumber>5){
            setAmountisValid(false)
            return;
        }
        props.onAddToCart(etnteredAmountNumber);
    }   

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
                ref={amountInputRef}
                label="amount" input={{
                id:'amount_' + props.id,
                type:'number',
                min:'1',
                max:'5',
                step:'1',
                defaultValur:'1'
            }} />
            <button>+Add</button>
            {!amountIsValid && <p>Please enter a valid amount</p>}
        </form>
    )
}