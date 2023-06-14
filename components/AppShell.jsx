'use client';

import { useEffect } from 'react';
import { getStorage, setStorage } from './utils/storage';
import { useRouter } from 'next/router';
import { setLoadingState, setStatusbarHeight, setUser } from '../store/actions';
import Store from '../store';
import { getLoadingState, getStatusbarHeight } from '../store/selectors';
import Lottie from './ui/Lottie';
import { SafeArea } from 'capacitor-plugin-safe-area';
import Launching from '../assets/lotties/launching.json';
import NavBar from './ui/NavBar';
import { ToastContainer } from 'react-toastify';

const AppShell = ({ children, navBar = false }) => {
  const router = useRouter();
  const loadingState = Store.useState(getLoadingState);
  const statusbarHeight = Store.useState(getStatusbarHeight);

  useEffect(() => {
    topInsets();
    checkUser();
  }, []);
  const topInsets = async () => {
    const { statusBarHeight } = await SafeArea.getStatusBarHeight();
    var r = document.querySelector(':root');
    r.style.setProperty('--top-insets', `${statusBarHeight}px`);
    setStatusbarHeight(statusBarHeight);
  };
  const checkUser = async () => {
    try {
      const data = await getStorage('userData');
      setUser(data);
      setTimeout(() => {
        setLoadingState(false);
      }, 800);
      if (router.pathname !== '/signup' && !data) {
        await router.push('/signup');
      }
      if (router.pathname == '/signup' && data) {
        setTimeout(() => {
          router.push('/home');
        }, 1000);
      }
    } catch (error) {
      setStorage('userData', null);
      await router.push('/signup');
    }
  };
  return (
    <>
      {loadingState ? (
        <div
          style={{ padding: '15px 15px' }}
          className="w-screen h-screen flex justify-center items-center"
        >
          <Lottie style={{ height: 200 }} data={Launching} />
        </div>
      ) : (
        <div
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: navBar ? 55 : 15,
            paddingTop: statusbarHeight == 0 ? 15 : statusbarHeight,
          }}
        >
          {children}
          {navBar && <NavBar />}
          <ToastContainer
            theme="dark"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            position="bottom-center"
          />
        </div>
      )}
    </>
  );
};

export default AppShell;
