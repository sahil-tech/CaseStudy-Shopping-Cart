import react from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { fetchCategories, fetchProducts,cartApi } from '../../redux/shoppingCart/shoppingCartActions';
import ProductCard from './productCard'

const mapStateToProps = state => {
    return {
        state,
        categories: state.shopping.categories,
        products: state.shopping.products
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchCategory : () => dispatch(fetchCategories()),
        fetchProduct: () => dispatch(fetchProducts()),
        addCart : (payload) => dispatch(cartApi(payload))
    }
}

class Product extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryFilter: 'All Products',
        }
    }

    componentDidMount() {
        this.props.fetchCategory()
        this.props.fetchProduct()
    }
    setCategory = item => {
        if (item !== this.state.categoryFilter) {
            this.setState({ categoryFilter: item })
        }
        else {
            this.setState({ categoryFilter: 'All Products' })
        }
    }
   
    render() {
        console.log('redux state', this.props.state)
        return (
            <react.Fragment>
                <div className="home-container">
                    <aside className="side-nav">
                        {this.props.categories.map(item => <div key={item.name} onClick={() => this.setCategory(item.id)} className={"category-section" + (this.state.categoryFilter === item.id ? ' active' : '')}>
                            <p className="category-list">{item.name}</p>
                        </div>)}
                    </aside>

                    <section className="product-container">
                        <select className="side-nav-mobile" onChange={(e) => this.setCategory(e.target.value)}>
                            <option value="All Products">All Products</option>
                            {this.props.categories.map(item => <option key={item.name} value={item.id}>
                                {item.name}
                            </option>)}
                        </select>
                        {this.state.categoryFilter !== 'All Products' ?
                            this.props.products.filter(user => user.category === this.state.categoryFilter).map(user =>
                                 <ProductCard 
                                 user={user}
                                 addToCart = {this.props.addCart}/>
                            )
                            : this.props.products.map(user => 
                                <ProductCard
                                user = {user}
                                addToCart = {this.props.addCart}/>
                            )}

                    </section>
                </div>
            </react.Fragment >
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);