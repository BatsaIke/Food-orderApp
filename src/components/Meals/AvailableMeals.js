import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';



const AvailableMeals = () => {
  const [meals, setMeals]= useState([])
  const [isloading, setisloading]=useState(true)
  const [httperror, setError] =useState()

  useEffect(()=>{
    const fethMeals = async()=>{
 const response=  await fetch("https://reactpost-c3b32-default-rtdb.firebaseio.com/Meals.json")
   
 
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
 const responseData = await response.json()


    const loadedMeals=[];

    for(const key in responseData){
      loadedMeals.push({
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price,
      })

    }
    setMeals(loadedMeals)
    setisloading(false)
}

  fethMeals().catch(error=>{
    setisloading(false)
  setError(error.message)
  })

  

  },[])
  
  if(isloading){
    return (
      <section className={classes.meals}>
        <Card>
          <p style={{textAlign:"center"}}>loading</p>
        </Card>
      </section>
    );
  }

  if(httperror){
    return (
      <section className={classes.meals}>
        <Card>
          <p style={{ textAlign: "center", color: "red" }}>{httperror}</p>
        </Card>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
