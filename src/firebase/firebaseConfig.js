import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyCqcPfRDiLxezrt7qzNfNCAk8p_o5kr2SQ",
    authDomain: "react-app-cursos-41cbc.firebaseapp.com",
    projectId: "react-app-cursos-41cbc",
    storageBucket: "react-app-cursos-41cbc.appspot.com",
    messagingSenderId: "107039618014",
    appId: "1:107039618014:web:a0742d36e85bc34114e34f"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }