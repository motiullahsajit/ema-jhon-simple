import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <>
            <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue={loggedInUser.displayName} ref={register({ required: true })}  placeholder='Your Name'/>
                {errors.name && <span className='error'>Name is required</span>}
                <input name="email"  defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder='Your Email'/>
                {errors.email&& <span className='error'>Email is required</span>}
                <input name="address" ref={register({ required: true })}  placeholder='Your Address'/>
                {errors.address && <span className='error'>Address is required</span>}
                <input name="phone" ref={register({ required: true })}  placeholder='Your Phone Number'/>
                {errors.phone && <span className='error'>Phone number is required</span>}
                <input type="submit" />
            </form>
        </>
    );
};

export default Shipment;