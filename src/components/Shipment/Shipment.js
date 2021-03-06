import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log(loggedInUser)
    const onSubmit = data => {
        console.log(data)
        const savedCart = getDatabaseCart();
        const orderDetails = { userName: loggedInUser.displayName, userEmail: loggedInUser.email, products: savedCart, shipment: data, orderTime: new Date() }
        fetch('https://ema-jhon-server.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder()
                    alert('Your oder placed successfuly')
                }
            })

    };
    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <>
            <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue={loggedInUser.displayName} ref={register({ required: true })} placeholder='Your Name' />
                {errors.name && <span className='error'>Name is required</span>}
                <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Your Email' />
                {errors.email && <span className='error'>Email is required</span>}
                <input name="address" ref={register({ required: true })} placeholder='Your Address' />
                {errors.address && <span className='error'>Address is required</span>}
                <input name="phone" ref={register({ required: true })} placeholder='Your Phone Number' />
                {errors.phone && <span className='error'>Phone number is required</span>}
                <input type="submit" />
            </form>
        </>
    );
};

export default Shipment;