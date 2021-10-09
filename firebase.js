/* === Firabase ^9.0.2 Version (Modular Version)  === */
/* import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage"; */

/* === Firabase 8.10.0 Version  === */
import firebase from "firebase";
import "firebase/storage";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCulnJ6dsInJjSoRxzj0UICVW2XmHNArBs",
  authDomain: "facebook-clone-2-d0509.firebaseapp.com",
  projectId: "facebook-clone-2-d0509",
  storageBucket: "facebook-clone-2-d0509.appspot.com",
  messagingSenderId: "951086356005",
  appId: "1:951086356005:web:ccf0c8695ebcb15cd1d1cc",
};

/* === Initialize Firebase (v9) === */
/* const app = initializeApp(firebaseConfig);

const db = getFirestore();

const storage = getStorage();
const storageRef = ref(storage);

export { db, storage }; */

/* === Initialize Firebase (v8) === */

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export { db, storage };
