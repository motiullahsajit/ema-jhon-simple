import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
const Product = (props) => {
    // console.log(props.product)
    const { img, name, seller, price, stock, key, features } = props.product;
    const showAddtoCart = props.showAddtoCart;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'><Link to={"/product/" + key}>{name}</Link></h4>
                <br />
                <p><small>by:{seller}</small></p>
                <p>${price}</p>
                <br />
                <p>Only {stock} left in stock - Order soon</p>
                {showAddtoCart && <button onClick={() => props.handleAddProduct(props.product)} className='main-button'> <FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>}
                <ol>
                    {showAddtoCart ||
                        features.map((fe, idx) => <li key={idx}>{fe.description}: {fe.value} </li>)
                    }
                </ol>
            </div>
        </div>
    );
};

export default Product;
