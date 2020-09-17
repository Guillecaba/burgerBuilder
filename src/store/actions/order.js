import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';


// Action Creators

// Sync Action Creators
export const purchaseBurgerSuccess = (id, orderData) => {
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
          dispatch( purchaseBurgerSuccess(response.data, orderData) );
        })
        .catch(error => {
            dispatch( purchaseBurgerFail(error) );
        });
    };
};