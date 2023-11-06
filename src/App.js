import { Header } from "./Component/Layout/Header";
import React, { useState } from "react";
import { Meals } from "./Component/Meals/Meals";
import { Cart } from "./Component/Cart/Cart";
import { CartProvider } from "./Component/Store/CartProvider";


function App() {
  const [cartIsShown,setCartIsShown]=useState(false);
    const showCartHandler=()=>{
      setCartIsShown(true);
    }
    function hideCartHandler(){
      setCartIsShown(false);
    }
  return (
   <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
      </CartProvider>
  );
}

export default App;
