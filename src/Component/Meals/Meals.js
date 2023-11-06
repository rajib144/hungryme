import React from "react";
import { MealsSummary } from "./MealsSummery";
import { AvailableMeals } from "./AvailableMeals";
export function Meals(){
    return(
        <React.Fragment>
            <MealsSummary />
            <AvailableMeals />
        </React.Fragment>
    )
}