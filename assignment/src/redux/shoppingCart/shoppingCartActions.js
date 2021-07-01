import { TOGGLE_CART, ADD_TO_CART, REMOVE_FROM_CART, LOGGED_IN, LOGGED_OUT } from "./shoppingCartTypes"

export const toggleCart = () => {
    return {
        type: TOGGLE_CART
    }
}

export const addToCart = (payload) => {
    return {
        type: ADD_TO_CART,
        payload
    }
}

export const removeFromCart = (payload) => {
    return {
        type: REMOVE_FROM_CART,
        payload
    }
}

export const loggedIn = (payload) => {
    return {
        type: LOGGED_IN,
        payload
    }
}
export const loggedOut = () => {
    return {
        type: LOGGED_OUT,
    }
}
