import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJ9aNNckVrUEv3LK2D6gyhp7rFWMiqnnQ",
  authDomain: "deepsheild360.firebaseapp.com",
  projectId: "deepsheild360",
  storageBucket: "deepsheild360.firebasestorage.app",
  messagingSenderId: "470166305375",
  appId: "1:470166305375:web:8882565c37bcfcb03039ea",
  measurementId: "G-YWHK3VH32R",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
