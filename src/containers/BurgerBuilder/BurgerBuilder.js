import React, { Component } from 'react';

import Auxi from '../../hoc/Auxi'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lechuga:0,
            bacon:0,
            queso:0,
            carne:0
        }
    }
    render () {
        return(
            <Auxi>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls />
                </Auxi>

        );
    }
}

export default BurgerBuilder;