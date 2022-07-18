import { ADD_TO_FAVOR_FAIL, ADD_TO_FAVOR_REQUEST, ADD_TO_FAVOR_RESET, ADD_TO_FAVOR_SUCCESS, DELETE_FAVOR_FAIL, DELETE_FAVOR_REQUEST, DELETE_FAVOR_RESET, DELETE_FAVOR_SUCCESS, GET_FAVOR_FAIL, GET_FAVOR_REQUEST, GET_FAVOR_SUCCESS } from '../constants/favorConstants.js';

export const addToWishListReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_TO_FAVOR_REQUEST:
            return { loading: true };
        case ADD_TO_FAVOR_SUCCESS:
            return { loading: false, success: true };
        case ADD_TO_FAVOR_FAIL:
            return { loading: false, error: action.payload };
        case ADD_TO_FAVOR_RESET:
            return {};
        default:
            return state;
    }
}

export const wishListReducer = (state = { wishList: []}, action) => {
    switch (action.type) {
        case GET_FAVOR_REQUEST:
            return { loading: true, wishList: [] };
        case GET_FAVOR_SUCCESS:
            return { loading: false, wishList: action.payload };
        case GET_FAVOR_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const removeFromWishListReducer = (state = {success: false}, action) => {
    switch(action.type) {
        case DELETE_FAVOR_REQUEST:
            return { loading: true };
        case DELETE_FAVOR_SUCCESS:
            return { loading: false, success: true };
        case DELETE_FAVOR_FAIL:
            return { loading: false, error: action.payload };
        case DELETE_FAVOR_RESET:
            return { loading: false, success: false}
        default: 
            return state;
    }
}