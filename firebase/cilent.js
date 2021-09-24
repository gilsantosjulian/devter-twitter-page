import * as firebase from 'firebase/app'
import { auth, getAuth, GithubAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";

const githubProvider = new GithubAuthProvider()

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCwOUP6P8L1xeEMWzzrGuwGrxTQ59QtYs",
  authDomain: "devter-c4676.firebaseapp.com",
  projectId: "devter-c4676",
  storageBucket: "devter-c4676.appspot.com",
  messagingSenderId: "994583765336",
  appId: "1:994583765336:web:0f1587c7d0972a9db0852d",
  measurementId: "G-VNV8P4YJC4"
}

!firebase.getApps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  return {
    avatar: user?.photoURL,
    username: user?.displayName,
    email: user?.email,
    emailVerified: user?.emailVerified,
  }
}

export const onAuthStateChangedClient = (onChange) => {
  const auth = getAuth();
  return onAuthStateChanged(auth, user => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user)
    onChange(normalizedUser)
  })
}

export const logingWithGitHub = async () => {
  try {
    const auth = getAuth();
    await signInWithPopup(auth, githubProvider)
  } catch (error) {
    console.log(error)
  }
  
}