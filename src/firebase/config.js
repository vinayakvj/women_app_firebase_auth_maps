import * as firebase from "firebase";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
const firebaseConfig = {
  apiKey: "AIzaSyDu7rZiXHVowDwwkKl8uE3tJlr_bSC-hNg",
  authDomain: "womens-app.firebaseapp.com",
  projectId: "womens-app",
  storageBucket: "womens-app.appspot.com",
  messagingSenderId: "373808914725",
  appId: "1:373808914725:web:59d0e80dfb6807cafdbacc",
  measurementId: "G-V91ZXWK31Q",
};

export const db = app.database();

export const userCred = (cred) => {
  db.ref("/users/003")
    .set(cred)
    .then(() => console.log(cred));
};
