import { TOGGLE_CART, ADD_TO_CART, REMOVE_FROM_CART, LOGGED_IN, LOGGED_OUT } from "./shoppingCartTypes"


const initialState = {
    cartItems: {},
    showCart: false,
    cartCount: 0,
    email: ''
}

const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CART: return {
            ...state,
            showCart: !state.showCart
        }
        case ADD_TO_CART: {
            var obj = { ...state.cartItems }
            if (obj[JSON.stringify(action.payload)] === undefined) {
                obj[JSON.stringify(action.payload)] = 1;
            }
            else {
                obj[JSON.stringify(action.payload)] += 1;
            }
            return {
                ...state,
                cartCount: state.cartCount + 1,
                cartItems: { ...obj }
            }
        }
        case REMOVE_FROM_CART: {
            var obj = { ...state.cartItems }
            if (obj[JSON.stringify(action.payload)] > 1) {
                obj[JSON.stringify(action.payload)] -= 1;
            }
            else {
                delete obj[JSON.stringify(action.payload)]
            }
            return {
                ...state,
                cartCount: state.cartCount - 1,
                cartItems: { ...obj }
            }
        }
        case LOGGED_IN:
            let val = action.payload.concat('cart')
            let data = JSON.parse(localStorage.getItem(val));
            return {
                ...state,
                cartItems: data ? {...data.cartItems} : {},
                cartCount: data ? data.cartCount : 0,
                email: action.payload
            }
            case LOGGED_OUT:{
                let val = state.email.concat('cart')
                localStorage.setItem(val,JSON.stringify(state));
                console.log(state.email,JSON.parse(localStorage.getItem(val)));
                return {
                    ...state,
                    cartCount : 0,
                    cartItems : {},
                    email:'',
                    showCart: false
                }
            }
        default: return state
    }
}

export default shoppingCartReducer