import { TOGGLE_CART,REMOVE_FROM_CART, LOGGED_IN, LOGGED_OUT, FETCH_BANNERS, FETCH_CATEGORIES, FETCH_PRODUCTS, CART_API, REGISTRATION_SUCCEED } from "./shoppingCartTypes"

export const toggleCart = () => {
    return {
        type: TOGGLE_CART
    }
}
export const fetchBanners = () => {
    return {
        type: FETCH_BANNERS
    }
}
export const fetchCategories = () => {
    return {
        type: FETCH_CATEGORIES
    }
}
export const fetchProducts = () => {
    return {
        type: FETCH_PRODUCTS
    }
}
export const cartApi = (payload) => {
    return {
        type: CART_API,
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

export const registartionSucceed = (payload) => {
    return {
        type: REGISTRATION_SUCCEED,
        payload
    }
}
