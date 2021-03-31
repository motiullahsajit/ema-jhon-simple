import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced] = useState(false);
    const history = useHistory()

    const handleProceedCheckout = () => {
        history.push('/shipment')
    }

    const removeProduct = (productKey) => {
        // console.log('removed clicked',productKey)
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)

        fetch('https://ema-jhon-server.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))

        // const cartProducts = productKey.map(key => {
        //     const product = fakeData.find(pd => pd.key === key)
        //     product.quantity = savedCart[key];
        //     return product;
        // });
        // setCart(cartProducts);
        // console.log(cartProducts);

    }, [])

    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyImage} alt="" />
    }
    // const thankyou = <img src={happyImage} alt="" />
    return (
        <div className='twin-container'>
            {/* <h1>Cart Items :{cart.length}</h1> */}
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
                }
                {/* {
                    orderPlaced && thankyou
                } */}
                {thankyou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    {
                        cart.length === 0 ? <button disabled onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button> : <button onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button>
                    }
                </Cart>
            </div>
        </div>
    );
};

export default Review;