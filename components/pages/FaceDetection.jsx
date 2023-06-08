'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Logo from '../../assets/brand-logo.png';
import Lottie from '../ui/Lottie';
import IntroLottie from '../../assets/lotties/intro.json';
import AppShell from '../AppShell';
import { auth } from '../../firebase';
import { setStorage } from '../utils/storage';
import { useRouter } from 'next/router';
import { getUser } from '../../store/selectors';
import Store from '../../store';
import AppBar from '../ui/AppBar';

export default function FaceDetection() {
  const user = Store.useState(getUser);
  const router = useRouter();

  useEffect(() => {}, []);
  const signOut = async () => {
    router.push('/home');
  };
  return (
    <AppShell>
      <AppBar title={'Detection'} />
      <div className="flex flex-col items-center mt-10">
        <Image
          src={user?.photoUrl}
          alt={user?.displayName}
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="my-10 text-center font-bold">
          discover a new dimension where faces unlock the magic, our app's face recognition makes
          your world more fantastic.
        </p>
        <button className="btn btn-accent" onClick={signOut}>
          Home
        </button>
      </div>
    </AppShell>
  );
}
