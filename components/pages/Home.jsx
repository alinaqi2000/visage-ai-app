'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Lottie from '../ui/Lottie';
import IntroLottie from '../../assets/lotties/intro.json';
import AppShell from '../AppShell';
import { auth } from '../../firebase';
import { setStorage } from '../utils/storage';
import { useRouter } from 'next/router';
import { getUser } from '../../store/selectors';
import Store from '../../store';
import Header from '../ui/Header';

export default function Home() {
  const user = Store.useState(getUser);
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <AppShell>
      <Header />
      <div className="flex flex-col items-center mt-10">
        <h4>Hello {user?.displayName}!</h4>

        <p className="my-10 text-center font-bold">
          discover a new dimension where faces unlock the magic, our app's face recognition makes
          your world more fantastic.
        </p>
        <button
          className="btn btn-accent my-3"
          onClick={() => {
            router.push('/face_detection');
          }}
        >
          Face Detection
        </button>
      </div>
      {/* <div className="fixed bottom-3 w-[calc(100vw-30px)] text-center">
        <div className="bg-base-200 rounded-box">
          <ul className="menu menu-horizontal ">
            <li>
              <a className="tooltip px-10" data-tip="Home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a className="tooltip px-10" data-tip="Details">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a className="tooltip px-10" data-tip="Stats">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </AppShell>
  );
}
