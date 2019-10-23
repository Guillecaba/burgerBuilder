import React from 'react';

import Auxi from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

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
            <p><strong>Precio Total:{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continuar con el pedido?</p>
            <Button btnType="Danger" clicked={props.comprandoCancelado}>
                CANCELAR
            </Button>
            <Button btnType="Success" clicked={props.comprandoContinuar}>
                CONTINUAR
            </Button>
        </Auxi>
    )
};

export default orderSummary;