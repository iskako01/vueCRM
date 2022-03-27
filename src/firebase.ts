import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBEJZVgu7kfF_cPORJznJRtu8V4jrgmbDc",
  authDomain: "vueappcrm.firebaseapp.com",
  projectId: "vueappcrm",
  storageBucket: "vueappcrm.appspot.com",
  messagingSenderId: "251591087851",
  appId: "1:251591087851:web:40a59e717ceb11ca38d0ae",
});
const auth = firebase.auth();
const db = firebase.firestore();
const database = firebase.database();
export { auth, db, database };
