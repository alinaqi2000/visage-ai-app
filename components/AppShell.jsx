'use client';

import { useEffect } from 'react';
import { getStorage } from './utils/storage';
import { useRouter } from 'next/router';
import { setLoadingState, setStatusbarHeight, setUser } from '../store/actions';
import Store from '../store';
import { getLoadingState, getStatusbarHeight } from '../store/selectors';
import Lottie from './ui/Lottie';
import { SafeArea } from 'capacitor-plugin-safe-area';
import Launching from '../assets/lotties/launching.json';

const AppShell = ({ children }) => {
  const router = useRouter();
  const loadingState = Store.useState(getLoadingState);
  const statusbarHeight = Store.useState(getStatusbarHeight);

  useEffect(() => {
    topInsets();
    checkUser();
  }, []);
  const topInsets = async () => {
    const { statusBarHeight } = await SafeArea.getStatusBarHeight();
    setStatusbarHeight(statusBarHeight);
  };
  const checkUser = async () => {
    const data = await getStorage('userData');
    setUser(data);
    setTimeout(() => {
      setLoadingState(false);
    }, 800);
    if (router.pathname !== '/signup' && !data) {
      await router.push('/signup');
    }
    if (router.pathname == '/signup' && data) {
      await router.push('/home');
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
          style={{ padding: '15px 15px', paddingTop: statusbarHeight == 0 ? 15 : statusbarHeight }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default AppShell;
