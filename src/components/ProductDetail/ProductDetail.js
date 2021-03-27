import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams()

    // const product = fakeData.find(pd => pd.key === productKey)

    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch('http://localhost:3001/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [productKey])

    // console.log(product)
    return (
        <div>
            <h1>Product details</h1>
            <Product showAddtoCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;