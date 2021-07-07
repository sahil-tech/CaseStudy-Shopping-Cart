import React from "react";
import { useHistory } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import { addToCart, toggleCart, removeFromCart, loggedOut } from "../../redux/shoppingCart/shoppingCartActions";
import { connect } from 'react-redux'
import Cart from "../Cart/cart";

const mapStateToProps = state => {
    return {
        state,
        showCart: state.shopping.showCart,
        cartCount: state.shopping.cartCount,
        cartItems: state.shopping.cartItems
    }
}
const mapDispatchToProps = dispatch => {
    return {
        toggleCart: () => dispatch(toggleCart()),
        addToCart: (payload) => dispatch(addToCart(payload)),
        removeFromCart: (payload) => dispatch(removeFromCart(payload)),
        loggedOut: () => dispatch(loggedOut())
    }
}
function Header(props) {
    const history = useHistory();
    const {state,loggedOut, cartItems, showCart, toggleCart, cartCount, removeFromCart, addToCart } = props
    const cartTotal = () => {
        let sum = 0;
        for(let val1 in cartItems){
            let val2  = JSON.parse(val1)
            sum = sum + val2.price*cartItems[val1]
        }
        return sum;
    }
    let total = cartTotal()
    const logout = () => {
        loggedOut();
        sessionStorage.clear();
        alert('user logged out')
        history.push('/');
    }
    // console.log('reducerstate',state)
    return (
        <header className="header">
            <div className="header-content">
                <img className="header-logo" src="static/images/logo.png" alt="logo" />
                <ul className="header-link">
                    <a href="/" >Home</a>
                    <a href="/product" >Products</a>
                </ul>
                {!sessionStorage.getItem('isLoggedIn')  ? <ul className="header-link-login">
                    <a href='/login'>Sigin</a>
                    <a href="/register" >Register</a>
                </ul>
                :<button class="header-logout" onClick={logout}>LogOut</button>}
                <div className="cart-icon-container">
                    <FaShoppingCart onClick={toggleCart} className="cart-icon" />
                    <p className="cart-quantity" id="cart-quantity">{cartCount} items</p>
                </div>
                {showCart &&
                 <Cart toggleCart={toggleCart} showCart={showCart} cartCount={cartCount} removeFromCart={removeFromCart} addToCart={addToCart} cartItems={cartItems} total={total} />}
            </div >
        </header >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
