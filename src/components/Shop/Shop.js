import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { addToDb, deleteShoppingCart, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const products = useLoaderData();
  const [cart, setCart] = useState([]);

  //Local Storage Get Data
  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        const quantity = storedCart[id]; //Passed Id To Find Quantity
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products, cart]); //Products & Cart dependencies to update sate immedietly

  //ADD TO CART button all functionality
  const handleAddToCart = (selectedProducts) => {
    const exists = cart.find((product) => product.id === selectedProducts.id);
    let newCart = [];
    if (!exists) {
      selectedProducts.quantity = 1;
      newCart = [...cart, selectedProducts];
    } else {
      const rest = cart.filter((product) => product.id !== selectedProducts.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }

    //Pass the selected products to the setCart State

    setCart(newCart);
    //Add selected products to Locall Storage
    addToDb(selectedProducts.id);
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
            key={product.id}
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
    </div>
  );
};

export default Shop;
