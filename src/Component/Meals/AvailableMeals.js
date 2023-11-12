import {Card} from '../UI/Card.js';
import classes from './AvailableMeals.module.css';
import { MealItem } from './MealItem/MealItem.js';
import { useEffect, useState } from 'react';
export function AvailableMeals(){
  const [mealList,setMealList]=useState([]);
  useEffect(() => {
    // Define an asynchronous function inside useEffect
    const fetchData = async () => {
      try {
        const response = await fetch('https://react-test-67c66-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
        const data = await response.json();
        const retireivedMeals=[];
        for(const key in data){
          retireivedMeals.push({
            id:key,
            name:data[key].name,
            description:data[key].description,
            price:data[key].price
          })
        }

        setMealList(retireivedMeals);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);
    return(
        <section className={classes.meals}>
            <ul>
                {mealList.map((meal)=>
                    <Card>
                    <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
                    </Card>
                )}
            </ul>
        </section>
    )
}