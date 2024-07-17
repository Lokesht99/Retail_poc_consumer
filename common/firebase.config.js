import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

let firestore;

if (!getApps().length) {
  const firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "genai-retail.firebaseapp.com",
    projectId: "genai-retail",
    storageBucket: "genai-retail.appspot.com",
    messagingSenderId: "871810539256",
    appId: "1:871810539256:web:f21374fb3aef1a9a51650d"
  });

  firestore = getFirestore(firebaseApp);
} else {
  firestore = getFirestore();
}

export { firestore };
