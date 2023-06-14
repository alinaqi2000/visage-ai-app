'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import AppShell from '../AppShell';
import { useRouter } from 'next/router';
import { getUser } from '../../store/selectors';
import Store from '../../store';
import AppBar from '../ui/AppBar';
import { GoSignOut } from 'react-icons/go';
import { setStorage } from '../utils/storage';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import Header from '../ui/Header';
export default function Settings() {
  const user = Store.useState(getUser);
  const router = useRouter();

  useEffect(() => {}, []);
  const signOut = async () => {
    setStorage('userData', null);
    // setStorage('face_detections', []);
    // setStorage('age_gender_recognitions', []);
    // setStorage('face_expression_recognitions', []);
    // setStorage('face_recognitions', []);
    FirebaseAuthentication.signOut();
    router.push('/signup');
  };
  return (
    <AppShell navBar="true">
      {/* <AppBar title={'Settings'} /> */}
      <Header />
      <div className="flex flex-col items-center mt-10">
        <div className="grid grid-cols-1 gap-6 justify-items-center">
          <Image
            src={user?.photoUrl}
            alt={user?.displayName}
            width={75}
            height={75}
            className="rounded-full"
          />
          <div className="text-center">
            <h3 className="text-lg mb-2">{user?.displayName}</h3>
            <h5 className="text-xs">{user?.email}</h5>
          </div>
        </div>
        <div className="fixed bottom-24 w-[calc(100vw-30px)] text-center">
          <button className="btn btn-wide normal-case text-error rounded-full" onClick={signOut}>
            <GoSignOut size={16} />
            signout
          </button>
          <p className="mt-4 pb-0">version 0.0.1</p>
        </div>
      </div>
    </AppShell>
  );
}
