// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAO_3pFwhdVE14Pqwf24NyfKvkjo5SD2Ng",
  authDomain:"todo-firebase-app-be7e1.firebaseapp.com",
  projectId:"todo-firebase-app-be7e1",
  storageBucket:"todo-firebase-app-be7e1.firebasestorage.app",
  messagingSenderId: "405706350450",
  appId:"1:405706350450:web:eb6f63f04753ac67a887eb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
