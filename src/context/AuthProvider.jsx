import React, { useState } from 'react'
import { useEffect,useContext,createContext } from 'react'
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup,signOut, setPersistence, inMemoryPersistence} from 'firebase/auth'
import { auth, db } from '../firebase';
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

const Auth = createContext();

const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null);
  const [users,setUsers] = useState([]);
  const [tweets,setTweets] = useState([]);
  const [mobile,setMobile] = useState(false);
  const [show,setShow] = useState(false);
  const colref = collection(db,'users');
  const tweetsref = collection(db,'tweets');
  const signUp = () => {
    const googleAuth = new GoogleAuthProvider();
    signInWithPopup(auth,googleAuth).then((resp)=>{
      setDoc(doc(db,'users',resp.user.uid),{name:resp.user.displayName,email:resp.user.email,photo:resp.user.photoURL,likedPosts:[]});
    });
  }
  const logout = () => {
    signOut(auth);
  }
  useEffect(() => {
    onSnapshot(colref,(snapshot)=>{
      setUsers(snapshot.docs.map((doc)=> ({...doc.data()})))
    })
    onSnapshot(tweetsref,(snapshot)=>{
      setTweets(snapshot.docs.map((doc)=> ({...doc.data()})))
    })
    const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
      setUser(currentUser);
    })
    return() => {unsubscribe()};
  },[])
  return (
    <Auth.Provider value={{signUp,user,setUser,logout,users,tweets,mobile,setMobile,show,setShow}}>
        {children}
    </Auth.Provider>
  )
}

export const useAuth = () => useContext(Auth);

export default AuthProvider