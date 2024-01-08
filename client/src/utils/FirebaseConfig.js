import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyA1iH9X0gKedDf-wgMFJYci8otruJl-M9w",
    authDomain: "verbify-96ff5.firebaseapp.com",
    projectId: "verbify-96ff5",
    storageBucket: "verbify-96ff5.appspot.com",
    messagingSenderId: "984588784808",
    appId: "1:984588784808:web:87d07b70e0521437bc9e9d",
    measurementId: "G-D2SR62XLEW"
  };

  const app = initializeApp(firebaseConfig)
  export const firebaseAuth = getAuth(app)