import React from 'react';
import { Link } from 'react-router-dom';

const ReviewItem = (props) => {
    const { name, price, quantity, key } = props.product;
    const removeProduct = props.removeProduct;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItemStyle}>
            <h4 className="product-name"><Link to={"/product/" + key}>Name:{name}</Link></h4>
            <h4>Price: {price}$</h4>
            <h4>quantity: {quantity}</h4>
            <button onClick={() => removeProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;