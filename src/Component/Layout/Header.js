import React from "react"
import mealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css';
import { HeadercartButton } from "./HeaderCartButton";
export function Header(props){
    
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeadercartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="img " />
            </div>
        </React.Fragment>
    )
}