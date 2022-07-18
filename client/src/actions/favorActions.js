import axios from "axios";
import { ADD_TO_FAVOR_FAIL, ADD_TO_FAVOR_REQUEST, ADD_TO_FAVOR_SUCCESS, DELETE_FAVOR_FAIL, DELETE_FAVOR_REQUEST, DELETE_FAVOR_RESET, DELETE_FAVOR_SUCCESS, GET_FAVOR_FAIL, GET_FAVOR_REQUEST, GET_FAVOR_SUCCESS } from "../constants/favorConstants";

export const addToFavorList = (id) => async (dispatch, getState) => {
    try{
        dispatch({ type: ADD_TO_FAVOR_REQUEST})

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const data = await axios.post('/api/favor', {id}, config);

        dispatch({ type: ADD_TO_FAVOR_SUCCESS, payload: data });
    }catch(err){
        dispatch({
            type: ADD_TO_FAVOR_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
    }
}

export const getFavorList = () => async (dispatch, getState) => {
    try{
        dispatch({ type: GET_FAVOR_REQUEST })

        const { userLogin: { userInfo } } = getState();

        if(!userInfo){
            dispatch({ type: GET_FAVOR_FAIL, payload: 'Please sign in to see your wishlist' })
            return
        }else{
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }
    
            const { data } = await axios.get('/api/favor', config);

            dispatch({ type: GET_FAVOR_SUCCESS, payload: data });
        }

        
    }catch(err){
        dispatch({ type: GET_FAVOR_FAIL, payload: err.response && err.response.data.message
            ? err.response.data.message
            : err.message,})
    }
}

export const deleteFavor = (id) => async (dispatch, getState) => {
    try{
        dispatch({ type: DELETE_FAVOR_REQUEST })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        await axios.delete(`/api/favor/${id}`, config);

        dispatch({ type: DELETE_FAVOR_SUCCESS });
        dispatch({ type: DELETE_FAVOR_RESET })
    }catch(err){
        dispatch({ type: DELETE_FAVOR_FAIL, payload: err.response && err.response.data.message
            ? err.response.data.message
            : err.message,})
    }
}