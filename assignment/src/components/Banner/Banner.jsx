import react from 'react';

function Banner(props) {
    const {name, description, key, imageUrl } = props.user
    return (
        <react.Fragment>
            <div className="container">
                <div className="text-space col-sm-6 col-7">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <button className="banner-button">{'Explore '}{key}</button>
                </div>
                <div className="image-space col-sm-6 col-5 ">
                    <img className="col-9 col-md-11 col-sm-11 " src={imageUrl} alt="BannerImage" />
                </div>
            </div>
        </react.Fragment>
    );
}

export default Banner;