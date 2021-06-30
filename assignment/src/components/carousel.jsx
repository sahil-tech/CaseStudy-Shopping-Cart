import { Carousel } from 'react-responsive-carousel';

export default function carousel(props){
    const {promotions} = props;
    return(
        <Carousel>
            {promotions.map(item => <div className="carousel"> <img src={item.bannerImageUrl} alt={item.bannerImageAlt}/></div>)}
        </Carousel>
    )
}