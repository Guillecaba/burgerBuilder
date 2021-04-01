import * as actionTypes from "./actionsTypes";
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
          email,
          password,
          returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCoUWkPhRzdAQwsPwXIiAHdPfW21Sax_bk'
        if(!isSignup) {
          url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCoUWkPhRzdAQwsPwXIiAHdPfW21Sax_bk'
        }
        axios.post(url, authData)
          .then(response => {
            dispatch(authSuccess(response.data));
            console.log(response)
          })
          .catch(err=> {
            console.log(err.response.data);
            dispatch(authFail(err.response.data));
          })
    }
}
