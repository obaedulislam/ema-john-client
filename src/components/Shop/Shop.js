import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { addToDb, deleteShoppingCart, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

/*
1. Count:done
2. Per Page: 10
3. Pages: count/per page
3. Page
*/

const Shop = () => {
  //const {products, count} = useLoaderData();
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const pages = Math.ceil(count / size);

  //Load data using Pagination 
  useEffect(() => {
    const url = `http://localhost:5000/products?page=${page}&size=${size}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setCount(data.count);
      setProducts(data.products)
    })
  }, [page, size])

  //Local Storage Get Data
  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];
    const ids = Object.keys(storedCart); 
    console.log(ids);
    fetch('http://localhost:5000/productsbyids', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    })
    .then(res => res.json())
    .then(data => {
        for (const id in storedCart) {
        const addedProduct = data.find(product => product._id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }
    setCart(savedCart);

    })
    
}, [products]) //Products & Cart dependencies to update sate immedietly

  //ADD TO CART button all functionality
  const handleAddToCart = (selectedProducts) => {
    const exists = cart.find((product) => product._id === selectedProducts._id);
    let newCart = [];
    if (!exists) {
      selectedProducts.quantity = 1;
      newCart = [...cart, selectedProducts];
    } else {
      const rest = cart.filter((product) => product._id !== selectedProducts._id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }

    //Pass the selected products to the setCart State

    setCart(newCart);
    //Add selected products to Locall Storage
    addToDb(selectedProducts._id);
  };

  //Clear Cart Item
  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  }

  //Return From Shop Compnent
  return (
    <div className="shopping-container">
      {/* All Products Section */}
      <div className="products-container">
        {/* Get all product and pass them to the Product component */}
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>

      {/* Cart item & price section */}
      <div className="cart-container">
        <Cart clearCart={clearCart} cart={cart}>
          <Link to='orders'>
            <button className="btn-text-review">Review Order</button>
          </Link>
        </Cart>
      </div>

      {/* Page Navigation for product */}
      <div className="pagination">
        <p>Currently selected page: {page} && Size: {size}</p>
          {
            [...Array(pages).keys()].map(number => <button
              key={number}
              className = {page  === number ? 'selected' : ''}
              onClick = {() => setPage(number)}
            >{number + 1}</button>)
          }
          <select onChange={event => setSize(event.target.value)} className="selected-page" name="" id="">
            <option value="5">5</option>
            <option value="10" className="selected">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
      </div>

    </div>
  );
};

export default Shop;
