import {  faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { deleteShoppingCart } from '../../utilities/fakedb';
import './Cart.css'

const Cart = (props) => {
    const {cart, clearCart, children} = props;
    //Total Price & Shipping Price
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for(const product of cart){
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
        quantity = quantity + product.quantity;
    }

    // Tax calucaltion
    const tax = parseFloat((total * 0.2).toFixed(2));
    
    // Grand Total
    const grandTotal = total + shipping + tax;
    
    return (
        <div className='cart'>
            <h1>Order Summary</h1>
            <div className="selected-items">
                <h4>Selected Items: </h4>
                <h4><span>{quantity}</span></h4>
            </div>
            <div className="total-price">
                <h4>Total Price:</h4>
                <h4>$<span>{total}</span></h4>
            </div>
            <div className="total-shipping">
                <h4>Total Shipping Charge: </h4>
                <h4>$<span>{shipping}</span></h4>
            </div>
            <div className="tax">
                <h4>Tax: </h4>
                <h4>$<span>{tax}</span></h4>
            </div>
            <div className="total">
                <h2>Grand Total: </h2> 
                <h2>$<span>{grandTotal.toFixed(2)}</span></h2>
            </div>

            <div className="clear-cart">
                {/* <button onClick={clearCart}>
                    <span className='btn-text'>Clear Cart</span>
                    <span><FontAwesomeIcon icon = {faTrash}/></span>
                </button> */}
            </div>
            {children}

        </div>
    );
};
export default Cart;