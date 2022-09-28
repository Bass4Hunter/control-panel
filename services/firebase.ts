import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

// DEV PURPOSES TESTING
// TODO add to env file
const firebaseConfig = {
  apiKey: "AIzaSyAx8WNIsF6YnsQS6hmz_udg6egl1YW1UeM",
  authDomain: "panel-de-control-2e0cd.firebaseapp.com",
  projectId: "panel-de-control-2e0cd",
  storageBucket: "panel-de-control-2e0cd.appspot.com",
  messagingSenderId: "857619945850",
  appId: "1:857619945850:web:0a454be2d35f3f14ebdec3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export default db