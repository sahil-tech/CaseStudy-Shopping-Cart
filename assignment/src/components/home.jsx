import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './Banner';
import Carousel from './carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";


function Home() {
    const [categories, setCategories] = useState([]);
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/categories')
            .then(res => {
                const categories = res.data;
                setCategories([...categories])
            })
        axios.get('http://localhost:5000/banners')
            .then(res => {
                const promotions = res.data;
                setPromotions([...promotions])
            })

    }, []);
    return (
        <React.Fragment>
            <Carousel promotions={promotions}></Carousel>
            {categories.map(user => <Banner key={user.key} user={user} />)}
        </React.Fragment>
    )
}

export default Home