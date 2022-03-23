import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import { useState } from 'react/cjs/react.development';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setisCheckout]=useState(false)
  const [isubMitting, setIsSubmitting]=useState(false)
  const[didSubmit, setDidSubmit] = useState(false);


  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler=()=>{
    setisCheckout(true)
  }

  const submitOrderHandler=async(userData)=>{
    setIsSubmitting(true)
   await fetch("https://reactpost-c3b32-default-rtdb.firebaseio.com/orders.json",{
       method: "post",
       body: JSON.stringify({
         userData: userData,
         ordeeredItems: cartCtx.items
       })
     });
     setIsSubmitting(false)
     setDidSubmit(true)
     cartCtx.clearCart()

  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

const cartModalcontent = (
  <>
  
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout && (
      <Checkout onConFirm={submitOrderHandler} onCancel={props.onClose} />
    )}
    {!isCheckout && (
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    )}
  </>
);
  
const isSubmittingcontent =<p>sending order data...</p>
const didSubmitModalcontedt = (
  <>
    <p>Succesfully sent</p>
    <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        
      </div>

  </>
);
  return (
    <Modal onClose={props.onClose}>
     {!isubMitting && !didSubmit  && cartModalcontent}
     {isubMitting  && isSubmittingcontent}
     {!isubMitting&& didSubmit && didSubmitModalcontedt}

    </Modal>
  );
};

export default Cart;
