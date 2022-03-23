import { useState } from "react";
import Cart from "./component/Cart/Cart";
import Header from "./component/Layout/Header";
import Meals from "./component/Meals/Meals";
import CartProvider from "./store/Cart-provider";

function App() {
  const [cartIsShown, setCartIsShow]= useState(false) 


const showCartHandler=()=>{
  setCartIsShow(true)
}

const hideCartHandler=()=>{
setCartIsShow(false)
}

  return (
    <CartProvider>
      <Header onShowCart={showCartHandler} />
      {cartIsShown && <Cart onHide={hideCartHandler} />}

      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
