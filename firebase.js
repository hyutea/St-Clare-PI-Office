// Firebase imports

import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { 
getAuth 
} from 
"https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { 
getFirestore 
} from 
"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// REPLACE THESE VALUES WITH YOUR FIREBASE CONFIG

const firebaseConfig = {

apiKey: "AIzaSyCP2CTCEEz-sX4rW0X8l5WR3-ZX_7__goA",

authDomain: "st-clare-pi-office.firebaseapp.com",

projectId: "st-clare-pi-office",

storageBucket: "st-clare-pi-office.firebasestorage.app",

messagingSenderId: "341268619250",

appId: "1:341268619250:web:46760d41a6f13ac4f4d56b"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Firebase services

const auth = getAuth(app);

const db = getFirestore(app);


export { auth, db };
