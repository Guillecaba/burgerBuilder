import React, { Component } from 'react';

import Auxi from '../../hoc/Auxi/Auxi'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 4,
        comprable: false,
        comprando:false
    }

    updateComprableState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum,el) => {
                return sum + el ;
            } , 0)
        this.setState({comprable: sum > 0})
    }

    comprandoHandler = () => {
        this.setState({comprando:true});
    }

    comprandoCancelarHandler = () => {
        this.setState({comprando:false});
    }

    comprandoContinuarHandler = () => {
        alert('Podes Continuar!')
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
        this.updateComprableState(updatedIngredients)

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updateComprableState(updatedIngredients)
    }
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] =disabledInfo[key] <= 0
        }
        // {luchuga:true,bacon:false,..}
        return(
            <Auxi>
                <Modal show={this.state.comprando} modalClosed= {this.comprandoCancelarHandler}>
                    <OrderSummary ingredients={this.state.ingredients} comprandoCancelado = {this.comprandoCancelarHandler} comprandoContinuar = {this.comprandoContinuarHandler} totalPrice = {this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded= {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasabled={this.state.comprable}
                    price={this.state.totalPrice}
                    comprando={this.state.comprando}
                    pedido={this.comprandoHandler}
                />
                </Auxi>

        );
    }
}

export default BurgerBuilder;