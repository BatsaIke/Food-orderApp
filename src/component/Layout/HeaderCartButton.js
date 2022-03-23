import React,{useContext, useEffect, useState} from 'react';
import CartContext from '../../store/Cart-contect';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css'

const HeaderCartButton =props=>{
  const [btnHighlighted, setBtnHighlighted]=useState(false)
 const ctx = useContext(CartContext);

 const { items } = ctx;
const numberofItmes = ctx.items.reduce((curNumber, item) => {
  return curNumber + item.amount
}, 0);


const btnClasses=`${classes.button} ${btnHighlighted? classes.bump:""}`

useEffect(()=>{
  if(ctx.items.length===0){
    return;
  }
setBtnHighlighted(true)
const timer=setTimeout(()=>{
  setBtnHighlighted(false)
},300)
return ()=>{
  clearTimeout(timer)
}
},[items])

    return (
      <button className={btnClasses} onClick={props.showCart}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your cart </span>
        <span className={classes.badge}> {numberofItmes}</span>
      </button>
    );
}
export default HeaderCartButton;