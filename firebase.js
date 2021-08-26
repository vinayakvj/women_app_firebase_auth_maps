import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu7rZiXHVowDwwkKl8uE3tJlr_bSC-hNg",
  authDomain: "womens-app.firebaseapp.com",
  projectId: "womens-app",
  storageBucket: "womens-app.appspot.com",
  messagingSenderId: "373808914725",
  appId: "1:373808914725:web:59d0e80dfb6807cafdbacc",
  measurementId: "G-V91ZXWK31Q",
};

/* let firebaseApp; */

let something;

if (!firebase.apps.length) {
  something = firebase.initializeApp(firebaseConfig);
} else {
  something = firebase.app();
}

/* let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(config);
} else {
  firebaseApp = getApp();
} */

/* if (!firebase.apps.length) {
  firebase.initializeApp({});
} else {
  firebase.app(); // if already initialized, use that one
} */

/* const db = something.firestore(); */
const db = something.database();

const userCred = (cred) => {
  const userID = firebase.auth().currentUser.uid;
  db.ref("users/" + userID)
    .set(cred)
    .then(() => console.log(cred));
};

const auth = firebase.auth();

export { db, auth };
