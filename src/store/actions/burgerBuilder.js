import * as actionTypes from './actionsTypes';
import axios from "../../axios-orders";

// action creators
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://my-burger-73194.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(() => {
                dispatch(fetchIngredientsFailed());
            })
    };
}