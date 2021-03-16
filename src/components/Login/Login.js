import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSingIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './logInManager';


function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSingnedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
    })
    console.log(user)

    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const gooleSignIn = () => {
        handleGoogleSignIn().then(res => {
            handleResponse(res, true)
        })
    }

    const signOut = () => {
        handleSignOut().then(res => {
            handleResponse(res, false)
        })
    }

    const fbSingIn = () => {
        handleFbSingIn().then(res => {
            handleResponse(res, true)
        })
    }

    const handleResponse = (res, redirect) => {
        setUser(res)
        setLoggedInUser(res)
        redirect && history.replace(from);
    }


    const handleBlur = (event) => {
        // console.log(event.target.name, event.target.value);
        let isFieldValid = true;

        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length >= 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo)
        }
    }

    const handleSubmit = (e) => {
        // console.log(user.name, user.password)
        // console.log(user.email, user.password)
        e.preventDefault();
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password).then(res => {
                handleResponse(res, true)
            })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password).then(res => {
                handleResponse(res, true)
            })
        }

    }

    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSingnedIn && < div >
                    <p > Welcome,{user.name} </p>
                    <p > Your email: {user.email} </p>
                    <img src={user.photo} alt="" />
                </div>
            }
            {
                user.isSingnedIn ? < button onClick={signOut} > Sign Out </button> : <button onClick={gooleSignIn}>Sign in</button >
            }
            <br />
            <button onClick={fbSingIn}>Singin With Facebook</button>
            <h1>Our own Authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">Sign Up</label>
            <form onSubmit={handleSubmit}>
                <p> {user.displayName}</p>
                {
                    newUser && <input name='name' type="text" onBlur={handleBlur} placeholder='Your name' required />
                }
                <br />
                <input type="text" name='email' onBlur={handleBlur} placeholder='Your Email address' required />
                <br />
                <input type="password" name='password' onBlur={handleBlur} placeholder="Your Password" required />
                <br />
                <input type="submit" value={newUser ? 'Sing Up' : 'Sing In'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfuly</p>
            }
        </div>
    );
}

export default Login;