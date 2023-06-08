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
export default function Settings() {
  const user = Store.useState(getUser);
  const router = useRouter();

  useEffect(() => {}, []);
  const signOut = async () => {
    setStorage('userData', null);
    FirebaseAuthentication.signOut();
    router.push('/signup');
  };
  return (
    <AppShell>
      <AppBar title={'Settings'} />
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
            <h3 className="text-xl mb-2">{user?.displayName}</h3>
            <h5>{user?.email}</h5>
          </div>
        </div>
        <div className="fixed bottom-12 w-full text-center">
          <button className="btn btn-wide normal-case text-error rounded-full" onClick={signOut}>
            <GoSignOut size={16} />
            signout
          </button>
        </div>
      </div>
    </AppShell>
  );
}
