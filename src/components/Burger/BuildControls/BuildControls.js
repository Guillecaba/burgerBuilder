import React from 'react';

import classes from './BuildControls.css';
import BuildControl from '../../../components/Burger/BuildControls/BuildControl/BuildControl'

const controls = [
    { label: 'Lechuga', type: 'lechuga' }, 
    { label: 'Bacon', type: 'bacon' },
    { label: 'Queso', type: 'queso' },
    { label: 'Carne', type: 'carne' }
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        { controls.map( ctrl => (
            <BuildControl key={ctrl.label} label={ctrl.label} />
        )) }
    </div>
);

export default buildControls;