import  CartContext  from "./Cart-Context";
import { useReducer } from "react";
 const defaultCartState={
    items:[],
    totalAmount:0
 }
const cartReducer=(state,action)=>{
    if (action.type === 'ADD') {

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if(action.type==='REMOVE'){
        
        const existingCartItemIndex=state.items.findIndex(item=>item.id===action.id);
        const existingCartItem=state.items[existingCartItemIndex];
        const updatedTotelAmount=state.totalAmount-existingCartItem.price;
        let updatedItems;
        if(existingCartItem.amount===1){
            updatedItems=state.items.filter(item=>item.id!=action.id)
        }
        else{
            const updatedItem={...existingCartItem,amount:existingCartItem.amount-1};
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;
        }
        return{
            items:updatedItems,
            totalAmount:updatedTotelAmount 
        }
    }
    return defaultCartState;
}
export function CartProvider(props){
    const [cartState,dispatcher]=useReducer(cartReducer,defaultCartState);
    function addItemtoCartHandler(item){
        dispatcher({type:'ADD',item:item})
    }
    function removeItemFromCartHandler(id){
            dispatcher({type:'REMOVE',id:id})
    };
    const cartContext={
        items: cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemtoCartHandler ,
        removeItem: removeItemFromCartHandler
     };
    return(
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
}