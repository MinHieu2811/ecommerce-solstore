import axios from "axios"
import { CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";


export const addToCart = (id, quantity) => async (dispatch, getState) => {
    try{
        if(id){
            const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                discount: data.discount,
                image: data.image1,
                price: data.price,
                countInStock: data.countInStock,
                quantity
            },
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        }else{
            return;
        }
    } catch (err) {
        console.log(err)
    }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data));
}

export const resetCart = () => (dispatch) => {
    dispatch({ type: CART_CLEAR_ITEMS })
    localStorage.removeItem('cartItems')
}