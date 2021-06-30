import react from 'react';
import axios from 'axios';
import Banner from './Banner';
import Carousel from './carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default class Home extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            promotions: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/categories')
            .then(res => {
                const categories = res.data;
                this.setState({ categories });
            })
        axios.get('http://localhost:5000/banners')
            .then(res => {
                const promotions = res.data;
                this.setState({ promotions });
            })
    }
    render() {
        const {categories,promotions} = this.state
        return (
            <react.Fragment>
                <Carousel promotions = {promotions}></Carousel>
                {categories.map(user => <Banner key={user.key} user={user} />)}
            </react.Fragment>
        )
    }
}