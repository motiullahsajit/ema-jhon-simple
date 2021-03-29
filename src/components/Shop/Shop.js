import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    //loading data
    // const first10 = fakeData.slice(0, 10)
    // const [products, setProducts] = useState(first10);
    const [products, setProducts] = useState([]);
    //cart cout
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://pacific-shelf-66043.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://pacific-shelf-66043.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))

        // // console.log(products, productKeys)
        // if (products.length > 0) {
        //     const previousCart = productKeys.map(existingKey => {
        //         const product = products.find(pd => pd.key === existingKey)
        //         product.quantity = savedCart[existingKey];
        //         return product;
        //         // console.log(existingKey, savedCart[existingKey]);
        //     })
        //     // console.log(previousCart);
        //     setCart(previousCart);
        // }
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        // console.log('Product added', product);
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)

        // OLD CODE
        /* const newCart = [...cart, product];
         setCart(newCart);
         const sameProduct = newCart.filter(pd => pd.key === product.key)
         const count = sameProduct.length;
         addToDatabaseCart(product.key, count);*/
    }

    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    products.map(pd => <Product key={pd.key} product={pd} showAddtoCart={true} handleAddProduct={handleAddProduct}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}><Link to="/review">
                    {
                        <button className='main-button'>Review Order</button>
                    }
                </Link></Cart>
            </div>
        </div>
    );
};

export default Shop;