import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus} from '@fortawesome/free-solid-svg-icons';

const Product = ({handleAddToCart, product} ) => {
    // const {handleAddToCart, product} = props;
    const {img, name, price, seller, ratings } = product;

    return (
        <div className='single-product'>
            <div className="product-img">
                <img src={img} alt="Product"/>
            </div>
            <div className="product-content">
                <h2>{name.length > 20 ? name.slice(0, 20)+'...': name }</h2>
                <h3>Price: ${price}</h3>
                <h4>Manufacturer: {seller}</h4>
                <h5>Rating: {ratings} Star</h5>
            </div>
            <div className="cart-btn">
                <button onClick={() => handleAddToCart(product)} className='add-to-cart'>
                    <span className='btn-text'>Add To Cart</span>
                    <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
                </button>
            </div>
        </div>
    );
};

export default Product;