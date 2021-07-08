import { createStore,applyMiddleware,combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import shoppingCartReducer from './shoppingCartReducer';
import createSagaMiddleware from 'redux-saga';
import {mySaga} from './saga/shoppingCartSaga';



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
  const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer,loadFromSessionStorage(), applyMiddleware(sagaMiddleware));
store.subscribe(() => saveToSessionStorage(store.getState()));
sagaMiddleware.run(mySaga)

export default store;

