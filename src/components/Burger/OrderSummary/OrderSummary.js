import React from 'react';

import Auxi from '../../../hoc/Auxi';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
            <li key={igKey}> 
                <span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
            );
        })
    return (
        <Auxi>
            <h3>Tu pedido</h3>
            <p>Una deliciosa hamburguesa con los siguientes ingredientes: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continuar con el pedido?</p>
        </Auxi>
    )
};

export default orderSummary;