import * as firebase from "firebase/app"
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore"
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

// Initialize Cloud Firestore through Firebase
const db = getFirestore()

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

export const addDevit = async ({ avatar, content, userId, userName }) => {
  try {
    const docRef = await addDoc(collection(db, "devits"), {
      avatar,
      content,
      userId,
      userName,
      createdAt: Timestamp.now(),
      likesCount: 0,
      sharedCount: 0,
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}

export const fetchLatestDevits = async () => {
  try {
    const devits = []
    const q = query(collection(db, "devits"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      // const date = new Date(createdAt.toDate())

      // const formatOptions = {
      //   year: "numeric",
      //   month: "short",
      //   day: "numeric",
      //   hour: "2-digit",
      //   minute: "2-digit",
      //   hour12: true,
      // }

      // const normalizedCreatedAt = new Intl.DateTimeFormat(
      //   "us-US",
      //   formatOptions
      // ).format(date)

      devits.push({
        ...data,
        id,
        // createdAt: normalizedCreatedAt,
        createdAt: +createdAt.toDate(),
      })
    })
    return devits
  } catch (error) {
    console.error("Error fetch devits: ", error)
  }
}
