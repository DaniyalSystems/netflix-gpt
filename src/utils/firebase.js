// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBSD3d-f3FqW-WIXVuvVmc9v6F08US4LdY',
  authDomain: 'netflixgpt-1122.firebaseapp.com',
  projectId: 'netflixgpt-1122',
  storageBucket: 'netflixgpt-1122.firebasestorage.app',
  messagingSenderId: '608333612299',
  appId: '1:608333612299:web:5fb4b899dfad9ba7dece0e',
  measurementId: 'G-CFH28LCGVF'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
export const auth = getAuth();
