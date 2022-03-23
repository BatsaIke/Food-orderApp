import { useContext } from 'react/cjs/react.development';
import CartContext from '../../../store/Cart-contect';
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';

const MealItem =(props)=>{
    const ctx = useContext(CartContext)

    const AddtocartHandler =amount=>{
        ctx.addItem({
    id:props.id,
    name: props.name,
    amount: amount,
    price: props.price
})

    }
    const price = `$${props.price.toFixed(2)}`;
    return (
      <li className={classes.meal}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>

        <div>
          <MealItemForm id={props.id} onaddtoCart={AddtocartHandler} />
        </div>
      </li>
    );

}
export default MealItem;