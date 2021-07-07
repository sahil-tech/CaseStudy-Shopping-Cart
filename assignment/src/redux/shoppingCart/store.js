import { createStore,combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import shoppingCartReducer from './shoppingCartReducer';

function saveToSessionStorage(state) {
    try {
        const serialisedState = JSON.stringify(state);
        sessionStorage.setItem('cart', serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

function loadFromSessionStorage() {
    try {
        const serialisedState = sessionStorage.getItem('cart');
        let newState = JSON.parse(serialisedState)
        if (newState === null) return undefined;
        return newState;
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}
const rootReducer = combineReducers({
    shopping:shoppingCartReducer,
    form:formReducer
  })
const store = createStore(rootReducer,loadFromSessionStorage());
store.subscribe(() => saveToSessionStorage(store.getState()));

export default store;

