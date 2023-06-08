// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDk95uT-r-35qFpARYKbJ9FdgZCMlGM3Wo',
  authDomain: 'visage-ai-95a0c.firebaseapp.com',
  projectId: 'visage-ai-95a0c',
  storageBucket: 'visage-ai-95a0c.appspot.com',
  messagingSenderId: '386122738030',
  appId: '1:386122738030:web:922bc2cf5ae2104e94397f',
  measurementId: 'G-80XJDBGPVP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;
