import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        lechuga: 0,
        bacon: 0,
        queso: 0,
        carne: 0
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    lechuga: 0.5,
    queso: 0.4,
    carne: 1.3,
    bacon: 0.7
  };

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default:
            return state;
    }
    

}

export default reducer;