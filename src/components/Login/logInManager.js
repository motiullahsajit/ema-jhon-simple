import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}


export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const { displayName, photoURL, email } = result.user;
            const singnedInUser = {
                isSingnedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return singnedInUser;
        })
        .catch((err) => {
            console.log(err)
            console.log(err.meassage);
        });
}

export const handleFbSingIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            const user = result.user
            console.log('fb usr after sign in', user)
            user.success = true;
            return user;
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(result => {
            const singnedOutUser = {
                isSingnedIn: false,
                name: '',
                photo: '',
                email: '',
                error: '',
                success: false
            }
            return singnedOutUser;
        }).catch((error) => {
            console.log(error)
        });
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name)
            console.log('sign in user info', res.user)
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.error = error.message
            newUserInfo.success = false;
            return newUserInfo;
            // console.log(error.message)
            // console.log(errorCode, errorMessage)
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.error = error.message
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name,
    }).then(function () {
        console.log('user name updated successfully')
    }).catch(function (error) {
        console.log(error)
    });
}