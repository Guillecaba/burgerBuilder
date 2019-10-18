import React, { Component } from 'react';

import Auxi from '../../hoc/Auxi'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    lechuga:0.5,
    queso:0.4,
    carne:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lechuga:0,
            bacon:0,
            queso:0,
            carne:0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const  oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})

    }

    removeIngredientHandler = (type) => {
        
    }
    render () {
        return(
            <Auxi>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded= {this.addIngredientHandler}
                />
                </Auxi>

        );
    }
}

export default BurgerBuilder;