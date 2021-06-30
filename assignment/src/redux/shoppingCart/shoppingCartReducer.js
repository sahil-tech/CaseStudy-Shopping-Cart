import { TOGGLE_CART , ADD_TO_CART, REMOVE_FROM_CART, LOGGED_IN} from "./shoppingCartTypes"


const initialState = {
    showCart : false,
    cartItems: new Map(),
    cartCount: 0,
    email:''
}

const shoppingCartReducer = (state=initialState, action) =>{
 switch(action.type){
     case TOGGLE_CART : return{
         ...state,
         showCart: !state.showCart
     }
     case ADD_TO_CART : return{
        ...state,
        cartCount: state.cartCount + 1,
        cartItems :state.cartItems.has(action.payload) ? new Map([...state.cartItems, [action.payload, (state.cartItems.get(action.payload) + 1)]]) : state.cartItems.set(action.payload, 1),
    }
    case REMOVE_FROM_CART : return{
        ...state,
        cartCount: state.cartCount - 1,
        cartItems :state.cartItems.get(action.payload) > 1 ? new Map([...state.cartItems, [action.payload, (state.cartItems.get(action.payload) - 1)]]) : state.cartItems.delete(action.payload) ? state.cartItems:'',
    }
    case LOGGED_IN: return{
        ...state,
        email:action.payload
    }
     default: return state
 }
}

export default shoppingCartReducer