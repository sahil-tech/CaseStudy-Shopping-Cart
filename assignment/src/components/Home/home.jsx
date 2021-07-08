import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../Banner/Banner';
import Carousel from '../Carousel/carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { fetchBanners, fetchCategories } from '../../redux/shoppingCart/shoppingCartActions'
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        fetchBanner : () => dispatch(fetchBanners()),
        fetchCategory : () => dispatch(fetchCategories())
    }
}
const mapStateToProps = state => {
    return{
        promotions: state.shopping.banners,
        categories: state.shopping.categories
    }
}

function Home(props) {
    const {promotions, fetchBanner, fetchCategory, categories } = props
    useEffect((dispatch) => {
        fetchBanner();
        fetchCategory();
    }, []);
    return (
        <React.Fragment>
            <Carousel promotions={promotions}></Carousel>
            {categories.map(user => <Banner key={user.key} user={user} />)}
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)