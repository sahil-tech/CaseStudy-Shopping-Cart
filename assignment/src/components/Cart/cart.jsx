import React from 'react'

const cart = (props) => {
    const { cartItems, addToCart, removeFromCart, toggleCart, total, cartCount, showCart } = props

    return (
        Object.keys(cartItems).length > 0 ? <div class="mini-cart-container">
            <div className="cart-header">
                <strong>My Cart</strong>{`( ${cartCount} item )`}
                <span onClick={toggleCart}>{'x'}</span>
            </div>
            {Object.keys(cartItems).map((value) => {
                let item = JSON.parse(value)
                return <div className='mini-cart'><img className="cart-image" src={item.imageURL} alt="miniCartImage" />
                    <div className="mini-cart-product-details">
                        <h5>{item.name}</h5>
                        <div className="mini-cart-quantity">
                            <button className="quantity-changer" onClick={() => removeFromCart(item)}>-</button>
                            <p>{cartItems[value]}</p>
                            <button className="quantity-changer" onClick={() => addToCart(item)}>+</button>
                            <p className="mini-cart-cross">{'x'}</p>
                            <p>{'Rs'}{item.price}</p>
                        </div>
                    </div>
                    <p className="item-total">{'Rs'}{item.price * cartItems[value]}</p>
                </div>
            })}
            <div className="lowest-price-container col-11">
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
    )
}
export default cart