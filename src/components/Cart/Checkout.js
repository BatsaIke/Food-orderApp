import { useRef } from 'react';
import { useState } from 'react/cjs/react.development';
import classes from './Checkout.module.css'

const isEmpty =value=> value.trim()==="";
const isNotFive =value => value.trim().length <5

const Checkout = (props) => {
  const [formInputValidity, setformInputValidity]=useState({
    name: true,
    street: true,
    city:true,
    postal: true
  })
const nameinputRef =useRef();
const streetInput = useRef();
const postalinputRef = useRef();
const cityinputRef = useRef();


  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameinputRef.current.value;
    const streeName = streetInput.current.value;
    const postalname = postalinputRef.current.value;
    const cityName = cityinputRef.current.value;

    const enteredNameIsvalid = !isEmpty(enteredName);
    const enteredSteetIsvalid = !isEmpty(streeName);
    const enteredCityIsvalid = !isEmpty(cityName);
    const enteredpostalCodeisvalid= !isNotFive(postalname)

    setformInputValidity({
      name: enteredNameIsvalid,
      street:enteredSteetIsvalid,
      city: enteredCityIsvalid,
      postal: enteredpostalCodeisvalid
    })

    const formIsvalid = enteredNameIsvalid&& enteredSteetIsvalid
    &&enteredCityIsvalid &&enteredpostalCodeisvalid



    if (!formIsvalid){
      return
    }
    props.onConFirm({
      name: enteredName,
      city: cityName,
      street: streeName,
      postal: postalname,
    });
  };

  const nameControlClasses =`${classes.control} ${formInputValidity.name?"": classes.invalid}`
  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid}`;
      const cityControlClasses = `${classes.control} ${
        formInputValidity.city ? "" : classes.invalid
      }`;

        const postalControlClasses = `${classes.control} ${
          formInputValidity.postal ? "" : classes.invalid
        }`;



  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameinputRef} />
        {!formInputValidity.name && <p>Enter a valid name</p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formInputValidity.street && <p>Enter a valid street name</p>}
      </div>

      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalinputRef} />
        {!formInputValidity.postal && <p>Enter a valid city name</p>}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityinputRef} />
        {!formInputValidity.city && <p>Enter a valid postal name</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;