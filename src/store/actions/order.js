import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';


// Action Creators

// Sync Action Creators
export const purchaseBurgerSuccess = (id, orderData) => {
    console.log('salta')
    return {
        type:actionTypes.PURCHASE_BURGUER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAIL,
        error:error
    };
};

// Async Action Creators

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGUER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
        .post("/orders.json", orderData)
        .then(response => {
            console.log(response)
          dispatch( purchaseBurgerSuccess(response.data.name, orderData) );
        })
        .catch(error => {
            dispatch( purchaseBurgerFail(error) );
        });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}