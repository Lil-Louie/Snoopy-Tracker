import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, Auth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBjUX4imQw9BTrRJFHXmnvveQeJybD-IFk",
  authDomain: "snoopytracker-d8c53.firebaseapp.com",
  projectId: "snoopytracker-d8c53",
  storageBucket: "snoopytracker-d8c53.appspot.com",
  messagingSenderId: "884710364158",
  appId: "1:884710364158:web:c89dadc9858e4e099466af"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth: Auth;
try {
  auth = getAuth(app);
} catch (err) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };