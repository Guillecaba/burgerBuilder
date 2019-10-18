import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css'

const burgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type) {
        case ('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break
        case ('bread-top'):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}>
                    </div>
                    <div className={classes.Seeds2}></div>
                </div>
            )
            break;
        case ('carne'):
            ingredient = <div className={classes.Meat}></div>
            break;
        case ('queso'):
            ingredient = <div className={classes.Cheese}></div>
            break;
        case ('lechuga') :
            ingredient = <div className={classes.Salad}></div>;
            break;
        case ('bacon') :
            ingredient = <div className = {classes.Bacon}></div>
            break;
        default :
                ingredient =null;
    }
    
    return ingredient;
    
};

burgerIngredient.propsTypes = {
    type: PropTypes.string.isRequired
}

export default burgerIngredient;