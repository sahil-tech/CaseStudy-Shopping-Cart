import React from "react";
import { useHistory } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import { addToCart, toggleCart, removeFromCart, loggedOut } from "../redux/shoppingCart/shoppingCartActions";
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        state,
        showCart: state.showCart,
        cartCount: state.cartCount,
        cartItems: state.cartItems
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
    const {loggedOut, cartItems, showCart, toggleCart, cartCount, removeFromCart, addToCart } = props
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
    return (
        <div className="header">
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
                {showCart && Object.keys(cartItems).length > 0 ? <div class="mini-cart-container">
                    <div className="cart-header">
                        <strong>My Cart</strong>{`( ${cartCount} item )`}
                        <span onClick={toggleCart}>{'x'}</span>
                    </div>
                    {Object.keys(cartItems).map((value) =>{ let item = JSON.parse(value)
                    return <div className='mini-cart'><img className="cart-image" src={item.imageURL} alt="miniCartImage" />
                        <div className="mini-cart-product-details">
                            <h5>{item.name}</h5>
                            <div className="mini-cart-quantity">
                                <div className="quantity-changer" onClick={() => removeFromCart(item)}>-</div>
                                <p>{cartItems[value]}</p>
                                <div className="quantity-changer" onClick={() => addToCart(item)}>+</div>
                                <p className="mini-cart-cross">{'x'}</p>
                                <p>{'Rs'}{item.price}</p>
                            </div>
                        </div>
                        <p className="item-total">{'Rs'}{item.price * cartItems[value]}</p>
                    </div>
                    })}
                    <div className="lowest-price-container">
                        <img src="static/images/lowest-price.png" alt="lowest-price" />
                        <p>{'you wont find it cheaper anywhere'}</p>
                    </div>
                    <div className="checkout-button-container">
                        <p>{'Promo code can be applied on next page'}</p>
                        <button className="checkout-button"><span>{'Proceed To Checkout'}</span><p>{`Rs${total}`}</p></button></div>
                </div> :
                    showCart && <div class="mini-cart-container-noItem">
                        <div className="cart-header">
                            <strong>My Cart</strong>
                            <span onClick={toggleCart}>{'x'}</span>
                        </div>
                        <h4>No Items in your Cart</h4>
                        <p>your favourite items are just a click away</p>
                        <button className="checkout-button">Shop Products</button>
                    </div>
                }
            </div >
        </div >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
