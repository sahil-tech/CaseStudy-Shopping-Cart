import React from 'react'

const productCard = (props) => {
    const{user,addToCart} = props
    const{name,imageURL,description,price}=user
    return(
        <div key={name} className="product-card">
            <h4 class="product-heading-truncate">{name}</h4>
            <div className="product-mobile">
                <img src={imageURL} alt="productImage" />
                <div className="product-description-mobile">
                    <p className="product-description">{description}</p>
                    <div className="product-price-desktop">
                        <p>MRP RS{price}</p>
                        <button className="product-button" id={name} onClick={() => addToCart(user)}>BUY NOW</button>
                    </div>
                    <div className="product-price-mobile">
                        <button className="product-button" id={name} onClick={() => addToCart(user)}>BUY NOW @ RS{price}</button>
                    </div>
                </div>
            </div>
            <div className="product-price-tablet">
                <button className="product-button" id={name} onClick={() => addToCart(user)}>BUY NOW @ RS{price}</button>
            </div>
        </div>
    )
}
export default productCard