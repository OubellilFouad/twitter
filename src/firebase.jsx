import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBgrrKDXxNSBR2yNV5BO-0cDKnUaTlCY1Q",
    authDomain: "twitter-f9fae.firebaseapp.com",
    projectId: "twitter-f9fae",
    storageBucket: "twitter-f9fae.appspot.com",
    messagingSenderId: "346417320864",
    appId: "1:346417320864:web:c699cbbf384b9579630ac5"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();