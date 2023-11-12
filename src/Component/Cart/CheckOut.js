import { useRef, useState } from 'react';
import classes from './CheckOut.module.css';
const isEmpty=(value)=>value.trim()==='';
const isFiveChars=(value)=>value.trim().length===6;
const CheckOut= (props)=>{
    const nameInputRef=useRef();
    const addressInputRef=useRef();
    const postalInputRef=useRef();
    const cityInputRef=useRef();
    const [formInputValidity,setFormInputValidy]=useState({
        name:true,
        address:true,
        postalCode:true,
        city:true
    });
    function confirmHandler(event){
        event.preventDefault();
        const enteredName=nameInputRef.current.value;
        const enteredAddress=addressInputRef.current.value;
        const enteredCity=cityInputRef.current.value;
        const enteredpost=postalInputRef.current.value;
        const enteredNameisValid= !isEmpty(enteredName);
        const enteredAddressIsValid =!isEmpty(enteredAddress) &&  isFiveChars(enteredAddress);
        const enteredCityIsValid =!isEmpty(enteredCity);
        const enteredPostIsValid =!isEmpty(enteredpost) &&  isFiveChars(enteredpost);
        setFormInputValidy({
            name:enteredNameisValid,
            address:enteredAddressIsValid,
            postalCode:enteredPostIsValid,
            city:enteredCityIsValid
        })
        const formIsValid=enteredNameisValid && enteredAddressIsValid && enteredCityIsValid && enteredPostIsValid;
        if(!formIsValid){
            return;
        }
        props.onConfirm({
            name:enteredName,
            address:enteredAddress,
            postalCode:enteredpost,
            city:enteredCity
        })
    }
    const nameControlClasses=`${classes.control} ${formInputValidity.name?'':classes.invalid}`
    return(
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type="text" id='name' name='name' ref={nameInputRef}/>
                {!formInputValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='address'>Address</label>
                <input type="text" id='address' name='address' ref={addressInputRef}/>
                {!formInputValidity.address && <p>Please enter a valid Address</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='post'>Postal Code</label>
                <input type="text" id='post' name='post' ref={postalInputRef}/>
                {!formInputValidity.postalCode && <p>Please enter a valid pincode</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input type="text" id='city' name='city' ref={cityInputRef}/>
                {!formInputValidity.city && <p>Please enter a valid City</p>}
            </div>
            <div className={classes.actions}>
            <button type='button' onClick={props.onClose}>Cancel</button>
            <button type='submit' className={classes.submit} >Confirm</button>
            </div>
        </form>
    )
}
export default CheckOut;