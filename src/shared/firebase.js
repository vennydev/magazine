import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxcQXVUaDe_BJnnPD_9_sECBmmb1H1FG0",
  authDomain: "magazine-edf20.firebaseapp.com",
  projectId: "magazine-edf20",
  storageBucket: "magazine-edf20.appspot.com",
  messagingSenderId: "678246865876",
  appId: "1:678246865876:web:8cda82a1af7df3aaa4d441",
  measurementId: "G-29R5KBRCXW",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
