import React from "react";
import { useHistory } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import { addToCart, toggleCart, removeFromCart } from "../redux/shoppingCart/shoppingCartActions";
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        showCart: state.showCart,
        cartCount: state.cartCount,
        cartItems: state.cartItems
    }
}
const mapDispatchToProps = dispatch => {
    return {
        toggleCart: () => dispatch(toggleCart()),
        addToCart: (payload) => dispatch(addToCart(payload)),
        removeFromCart: (payload) => dispatch(removeFromCart(payload))
    }
}
function Header(props) {
    const history = useHistory();
    const { cartItems, showCart, toggleCart, cartCount, removeFromCart, addToCart } = props
    const cartTotal = () => {
        let arr1 = cartItems && cartItems.keys && Array.from(cartItems.keys());
        let arr2 = cartItems && cartItems.keys && Array.from(cartItems.values());
        let length = cartItems && arr1.length
        let cartTotal = 0
        for (let i = 0; i < length; i++) {
            cartTotal = cartTotal + arr1[i].price * arr2[i]
        }
        return cartTotal
    }
    let total = cartTotal()
    const logout = () => {
        alert('user loggedout');
        sessionStorage.clear();
        history.push('/login');
    }
    return (
        <div className="header">
            <div className="header-content">
                <img className="header-logo" src="static/images/logo.png" alt="logo" />
                <ul className="header-link">
                    <a href="/" >Home</a>
                    <a href="/product" >Products</a>
                </ul>
                {!sessionStorage.getItem('isLoggedIn') && <ul className="header-link-login">
                    <a href='/login'>Sigin</a>
                    <a href="/register" >Register</a>
                </ul>}
                {sessionStorage.getItem('isLoggedIn') && <button class="header-logout" onClick={logout}>LogOut</button>}
                <div className="cart-icon-container">
                    <FaShoppingCart onClick={toggleCart} className="cart-icon" />
                    <p className="cart-quantity" id="cart-quantity">{cartCount} items</p>
                </div>
                {showCart && Array.from(cartItems.keys()).length > 0 ? <div class="mini-cart-container">
                    <div className="cart-header">
                        <strong>My Cart</strong>{`( ${cartCount} item )`}
                        <span onClick={toggleCart}>{'x'}</span>
                    </div>
                    {Array.from(cartItems.keys()).map((item) => <div className='mini-cart'><img className="cart-image" src={item.imageURL} alt="miniCartImage" />
                        <div className="mini-cart-product-details">
                            <h5>{item.name}</h5>
                            <div className="mini-cart-quantity">
                                <div className="quantity-changer" onClick={() => removeFromCart(item)}>-</div>
                                <p>{cartItems.get(item)}</p>
                                <div className="quantity-changer" onClick={() => addToCart(item)}>+</div>
                                <p className="mini-cart-cross">{'x'}</p>
                                <p>{'Rs'}{item.price}</p>
                            </div>
                        </div>
                        <p className="item-total">{'Rs'}{item.price * cartItems.get(item)}</p>
                    </div>
                    )}
                    <div className="lowest-price-container">
                        <img src="static/images/lowest-price.png" alt="lowest-price" />
                        <p>{'you wont find it cheaper anywhere'}</p>
                    </div>
                    <div className="checkout-button-container">
                        <p>{'Promo code can be applied on next page'}</p>
                        <button className="checkout-button"><span>{'Proceed To Checkout'}</span><p>{`Rs ${total}`}</p></button></div>
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
