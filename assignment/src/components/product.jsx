import react from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { addToCart } from '../redux/shoppingCart/shoppingCartActions';
import ProductCard from './productCard'

const mapStateToProps = state => {
    return {
        state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addToCart: (payload) => dispatch(addToCart(payload))
    }
}

class Product extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            categories: [],
            categoryFilter: 'All Products',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/products')
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
        axios.get('http://localhost:5000/categories')
            .then(res => {
                const categories = res.data;
                this.setState({ categories });
            })
    }
    setCategory = item => {
        if (item !== this.state.categoryFilter) {
            this.setState({ categoryFilter: item })
        }
        else {
            this.setState({ categoryFilter: 'All Products' })
        }
    }
    addToCart = user => {
        var that = this;
        let obj = { productId: user.id }
        let headers = { 'Content-Type': 'text/plain' }
        axios.post('http://localhost:5000/addToCart', obj, { headers: headers })
            .then(function (response) {
                that.props.addToCart(user);
            })
    }
    // componentDidUpdate(prevProps, prevState) {
    //     // console.log('redux state',this.props.cartItems)
    //     if (prevState.cartCount !== this.state.cartCount) {
    //         let word = this.props.location.email + 'cart';
    //         console.log('state', this.state.cartItems)
    //         localStorage.setItem(word, JSON.stringify(Array.from(this.state.cartItems.entries())));
    //         console.log('ls', new Map(JSON.parse(localStorage.getItem(word))));
    //     }

    // }
    render() {
        console.log('redux state', this.props.state)
        return (
            <react.Fragment>
                <div className="home-container">
                    <div className="side-nav">
                        {this.state.categories.map(item => <div key={item.name} onClick={() => this.setCategory(item.id)} className={"category-section" + (this.state.categoryFilter === item.id ? ' active' : '')}>
                            <p className="category-list">{item.name}</p>
                        </div>)}
                    </div>

                    <div className="product-container">
                        <select className="side-nav-mobile" onChange={(e) => this.setCategory(e.target.value)}>
                            <option value="All Products">All Products</option>
                            {this.state.categories.map(item => <option key={item.name} value={item.id}>
                                {item.name}
                            </option>)}
                        </select>
                        {this.state.categoryFilter !== 'All Products' ?
                            this.state.products.filter(user => user.category === this.state.categoryFilter).map(user =>
                                 <ProductCard 
                                 user={user}
                                 addToCart = {this.addToCart}/>
                            )
                            : this.state.products.map(user => 
                                <ProductCard
                                user = {user}
                                addToCart = {this.addToCart}/>
                            )}

                    </div>
                </div>
            </react.Fragment >
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);