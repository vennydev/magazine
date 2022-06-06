import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA57Zt8oW0_FgcZv2WaVGgcQxBF0avks4Q",
  authDomain: "sparta-react-4a3ba.firebaseapp.com",
  projectId: "sparta-react-4a3ba",
  storageBucket: "sparta-react-4a3ba.appspot.com",
  messagingSenderId: "142106056815",
  appId: "1:142106056815:web:39de83140a05a3901b159a",
  measurementId: "G-QWTZVMQGLE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
