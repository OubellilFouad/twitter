import React, { useState } from 'react'
import { useEffect,useContext,createContext } from 'react'
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup,signOut, setPersistence, inMemoryPersistence, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
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
  const signUp = (email,password,name) => {
    // const googleAuth = new GoogleAuthProvider();
    createUserWithEmailAndPassword(auth,email,password).then((res) => {
      setDoc(doc(db,'users',res.user.uid),{name:name,email:res.user.email,photo:res.user.photoURL,likedPosts:[],uid:res.user.uid});
      return updateProfile(auth.currentUser,{
        displayName: name
      })
    })
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