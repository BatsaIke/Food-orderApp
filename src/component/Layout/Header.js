
import mealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton';

const Header =props=>{
    return (
      <>
        <header className={classes.header}>
          <h1>My Canteen</h1>
          <HeaderCartButton
            showCart={props.onShowCart}
          />
        </header>
        <div className={classes["main-image"]}>
          <img src={mealsImage} alt="meals image" />
        </div>
      </>
    );
}
export default Header;