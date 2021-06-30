import react from 'react';

function Banner(props) {
    const { name, description, key, imageUrl } = props.user
    return (
        <react.Fragment>
            <div className="container">
                <div className="text-space">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <button className="banner-button">{'Explore '}{key}</button>
                </div>
                <div className="image-space">
                    <img src={imageUrl} alt="BannerImage" />
                </div>
            </div>
        </react.Fragment>
    );
}

export default Banner;