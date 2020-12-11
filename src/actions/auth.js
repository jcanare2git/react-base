import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/types';

export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {
        setTimeout(() => {

            dispatch(login(123456, 'Fabiana'))

        }, 3500);
    }
}

export const startGoogleLogin = () => {

    return ( dispatch ) =>{

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then( ({user}) => {
                
                console.log(user.uid, user.displayName);

                dispatch(
                    login(user.uid, user.displayName)
                )
            });

    }

}

export const login = (uid, displayName) => ({

    type: types.login,
    payload: {
        uid,
        displayName
    }

})