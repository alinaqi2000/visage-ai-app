'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GoogleLogo from '../../assets/google.png';
import Lottie from '../ui/Lottie';
import IntroLottie from '../../assets/lotties/intro.json';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import AppShell from '../AppShell';
import { setStorage } from '../utils/storage';
import Store from '../../store';
import Brand from '../ui/Brand';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import Loading from '../ui/Loading';

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const googleSignIn = async e => {
    e.preventDefault();
    setLoading(true);
    const result = await FirebaseAuthentication.signInWithGoogle();
    if (result) {
      await setStorage('userData', result.user);
      Store.update(s => {
        s.user = result.user;
      });
      setLoading(false);
      router.push('/home');
    }
    setLoading(false);
  };
  return (
    <AppShell>
      {loading && <Loading />}

      <div className="flex flex-col items-center mt-3">
        <Brand />
        <p className="mt-4 text-center font-bold">
          discover a new dimension where faces unlock the magic, our app's face recognition makes
          your world more fantastic.
        </p>
        <Lottie style={{ marginTop: 100, height: 200 }} data={IntroLottie} />
      </div>
      <div className="fixed bottom-12 w-[calc(100vw-30px)] text-center">
        <button onClick={googleSignIn} className="btn btn-wide normal-case rounded-full">
          <Image width={24} style={{ marginRight: 3 }} alt="Google" src={GoogleLogo} />
          signin to continue
        </button>
      </div>
    </AppShell>
  );
}
