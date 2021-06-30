import {createStore} from 'redux';
import shoppingCartReducer from './shoppingCartReducer';

// function saveToSessionStorage(state) {

//   try {
//     const serialisedState = JSON.stringify(state);
//     sessionStorage.setItem('abc', serialisedState);
//   } catch (e) {
//     console.warn(e);
//   }
// }

// function loadFromSessionStorage(state) {
//   try {
//     const serialisedState = sessionStorage.getItem('abc');
//     if (serialisedState === null) return undefined;
//     return JSON.parse(serialisedState);
//   } catch (e) {
//     console.warn(e);
//     return undefined;
//   }
// }

const store = createStore(shoppingCartReducer);

// store.subscribe(() => saveToSessionStorage(store.getState()));

export default store;

