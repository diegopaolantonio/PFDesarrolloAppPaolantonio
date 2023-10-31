import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpFpZ6rDlYaWu_YppVUwNdZuB5bLlUElA",
  authDomain: "desarrolloapp-paolantonio.firebaseapp.com",
  projectId: "desarrolloapp-paolantonio",
  storageBucket: "desarrolloapp-paolantonio.appspot.com",
  messagingSenderId: "233210649509",
  appId: "1:233210649509:web:694a7e2d6c5870a0cae64c",
};

export const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
