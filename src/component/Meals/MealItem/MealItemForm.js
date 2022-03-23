import { useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm =props=>{
    const inputRef = useRef();

    const [valid, setIsvalit]= useState(true)

    const submitHandler =event=>{
        event.preventDefault()
        const enteredAmount = inputRef.current.value
        const numenteredAmount = +enteredAmount

        if(enteredAmount.trim().lenght===0||numenteredAmount<1||
        numenteredAmount>5){
            setIsvalit(false)
            return;
        }
        props.onaddtoCart(numenteredAmount)
    }

    return(
        <form className={classes.form} onSubmit={submitHandler}> 
           <Input
           ref ={inputRef}
           
           label="Amount" 
           input={
               {
                   id: 'amount_' + props.id,
                   type: "number",
                   min: "1",
                   max: "5",
                   step: "1",
                   defaultValue: "1"
               }
           }/>
            <button>+ Add</button>
            {!valid &&<p>Please enter a valid amount(1-5)</p>}
        </form>
    )

}
export default MealItemForm