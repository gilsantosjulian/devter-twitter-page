import * as firebase from "firebase/app"
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
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

import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

const githubProvider = new GithubAuthProvider()

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

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

export const addDevit = async ({ avatar, content, img, userId, userName }) => {
  try {
    const docRef = await addDoc(collection(db, "devits"), {
      avatar,
      content,
      createdAt: Timestamp.now(),
      img,
      likesCount: 0,
      sharedCount: 0,
      userId,
      userName,
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  }
}

export const listenLatestDevits = (callback) => {
  const q = query(
    collection(db, "devits"),
    orderBy("createdAt", "desc"),
    limit(20)
  )

  onSnapshot(q, (querySnapshot) => {
    const newDevits = []
    querySnapshot.forEach((doc) => {
      newDevits.push(mapDevitFromFirebaseToDevitObject(doc))
    })
    callback(newDevits)
  })
}

// export const fetchLatestDevits = async () => {
//   try {
//     const devits = []
//     const q = query(collection(db, "devits"), orderBy("createdAt", "desc"))
//     const querySnapshot = await getDocs(q)

//     querySnapshot.forEach((doc) => {
//       devits.push(mapDevitFromFirebaseToDevitObject(doc))
//     })

//     return devits
//   } catch (error) {
//     console.error("Error fetch devits: ", error)
//   }
// }

export const uploadImage = (file) => {
  const storage = getStorage()
  const storageRef = ref(storage, `/images/${file.name}`)
  const uploadTask = uploadBytesResumable(storageRef, file)
  return uploadTask
}
