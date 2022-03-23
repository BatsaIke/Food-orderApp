import DUMMY_MEALS from './DummyMealsData'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals =()=>{
    return (
      <section className={classes.meals}>
        <Card>
          <ul>
            {DUMMY_MEALS.map((meal) => (
              <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
              />
            ))}
          </ul>
        </Card>
      </section>
    );

}
export default AvailableMeals;