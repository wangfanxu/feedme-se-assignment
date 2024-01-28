// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnfRVUhgF1nTAgGE3AR20zK_5qXiVAJiY",
  authDomain: "mcdonald-order-bcf60.firebaseapp.com",
  projectId: "mcdonald-order-bcf60",
  storageBucket: "mcdonald-order-bcf60.appspot.com",
  messagingSenderId: "656700822019",
  appId: "1:656700822019:web:b656c729b6cf6ece88f436",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
