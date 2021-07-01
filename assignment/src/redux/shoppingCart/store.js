import { createStore } from 'redux';
import shoppingCartReducer from './shoppingCartReducer';

// function saveToSessionStorage(state) {
//     try {
//         const serialisedState = JSON.stringify(state);
//         sessionStorage.setItem('abc', serialisedState);
//     } catch (e) {
//         console.warn(e);
//     }
// }

// function loadFromSessionStorage() {
//     try {
//         const serialisedState = sessionStorage.getItem('abc');
//         let newState = JSON.parse(serialisedState)
//         if (newState === null) return undefined;
//         return newState;
//     } catch (e) {
//         console.warn(e);
//         return undefined;
//     }
// }

// const store = createStore(shoppingCartReducer,loadFromSessionStorage());

// store.subscribe(() => saveToSessionStorage(store.getState()));
const store = createStore(shoppingCartReducer)
export default store;

