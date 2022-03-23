import { useContext } from 'react/cjs/react.development';
import CartContext from '../../store/Cart-contect';
import Modal from '../UI/Modal';
import classes from "./Cart.module.css";
import CartItem from './CartItem';

const Cart =props=>{

const crtCtx = useContext(CartContext)
const totalAmount = `$${crtCtx.totalAmount.toFixed(2)}`

const hasItem = crtCtx.items.length>0

const cartItemRemoveHandler =id=>{
  crtCtx. removeItem(id)
}

const carItemAddHandler =item=>{
  crtCtx.addItem({...item, amount:1})
}

    const cartItems = (
      <ul className={classes["cart-items"]}>
        {crtCtx.items.map((item) => (
          <CartItem key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price} 
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={carItemAddHandler.bind(null, item)}/>
        ))}
      </ul>
    );
    return (
      <Modal onHide={props.onHide}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]}
          onClick={props.onHide}>close</button>
         {hasItem && <button className={classes.button}>Order</button>}
        </div>
      </Modal>
    );
}
export default Cart;