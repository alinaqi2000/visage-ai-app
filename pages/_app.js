import { AnimatePresence } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-photo-view/dist/react-photo-view.css';
import '../styles/global.css';
import '../styles/variables.css';

import { useEffect } from 'react';
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
