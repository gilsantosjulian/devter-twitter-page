import * as firebase from "firebase/app"
import "firebase/firestore"
import {
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth"

const githubProvider = new GithubAuthProvider()

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCwOUP6P8L1xeEMWzzrGuwGrxTQ59QtYs",
  authDomain: "devter-c4676.firebaseapp.com",
  projectId: "devter-c4676",
  storageBucket: "devter-c4676.appspot.com",
  messagingSenderId: "994583765336",
  appId: "1:994583765336:web:0f1587c7d0972a9db0852d",
  measurementId: "G-VNV8P4YJC4",
}

!firebase.getApps.length && firebase.initializeApp(firebaseConfig)

// const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, emailVerified, photoURL, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email: email,
    emailVerified: emailVerified,
    uid,
  }
}

export const onAuthStateChangedClient = (onChange) => {
  const auth = getAuth()
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const logingWithGitHub = async () => {
  try {
    const auth = getAuth()
    await signInWithPopup(auth, githubProvider)
  } catch (error) {
    console.log(error)
  }
}

export const addDevit = ({ avatar, content, userId, userName }) => {
  // db.collection("devits")
}
