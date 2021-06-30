import React,{createContext} from 'react';
import Header  from './header';
import Home from './home'

export const CartData = createContext();

export const Data = (props) => {
    return(
        <CartData.Provider value={props}>
            <Header/>
        </CartData.Provider>
    )
}