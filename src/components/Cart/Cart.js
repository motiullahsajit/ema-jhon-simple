import React from 'react';
const Cart = (props) => {
    const cart = props.cart
    // console.log(cart)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
        // console.log(product.price, product.quantity)
    }
    // const total = cart.reduce((total, product) => total + product.price, 0)
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }

    const tax = total / 10;
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h3>Order Summary</h3>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {total}</p>
            <p><small>Shopping Cost:{shipping}</small></p>
            <p><small>Tax+vat: {formatNumber(tax)}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;