import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    order: [],
    loading:false,
    purchased: false
};

const reducer  = (state = initialState, action) => {
    console.log('reducer order',action.type)
    console.log('action',action)
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased:false
            };
        case actionTypes.PURCHASE_BURGUER_START:
            return {
                ...state,
                loading:true
            };
        case actionTypes.PURCHASE_BURGUER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id:action.orderId
            }
            return {
                ...state,
                loading:false,
                purchased: true,
                order: state.order.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGUER_FAIL:
            return {
                ...state,
                loading:false
            };
        default:
            return state;
    }
};

export default reducer;