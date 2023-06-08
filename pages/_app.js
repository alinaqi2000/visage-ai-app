import dynamic from 'next/dynamic';

import { AnimatePresence } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import '../styles/variables.css';
import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { getApp, initializeApp } from 'firebase/app';
import { getAuth, indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
import app from '../firebase';
import { StatusBar } from '@capacitor/status-bar';
import { isPlatform } from '@ionic/react';

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    console.log(app.name);
    if (isPlatform('capacitor')) {
      StatusBar.setOverlaysWebView({ overlay: true });
    }
  }, []);
  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}
export default MyApp;
