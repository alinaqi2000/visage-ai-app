'use client';

import React, { useEffect } from 'react';
import AppShell from '../AppShell';
import { useRouter } from 'next/router';
import { getUser } from '../../store/selectors';
import Store from '../../store';
import Header from '../ui/Header';
import Lottie from '../ui/Lottie';
import HelloRobot from '../../assets/lotties/hello_robot.json';
import { motion } from 'framer-motion';
import { LuScanFace } from 'react-icons/lu';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { FaRegSmileBeam } from 'react-icons/fa';
import { GiAges } from 'react-icons/gi';
import { FeatureItem, MORPHIS_CLASSES } from '../ui/helpers';

export default function Home() {
  const user = Store.useState(getUser);
  const router = useRouter();

  useEffect(() => {}, []);
  const _gotoAction = to => {
    router.push('/' + to);
  };
  return (
    <AppShell navBar="true">
      <Header />
      <div className="flex flex-col mt-5">
        <div className="flex jistify-between">
          <div>
            <h5 className="text-lg font-semibold lowercase">hi! {user?.displayName}</h5>
            <p className="text-sm mt-2">
              embrace a future where your face becomes the key, our app unlocks your world with
              seamless identity.
            </p>
          </div>
          <div>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: [0, 1.5, 1] }}
              drag={true}
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              whileHover={{ scale: 3 }}
              transition={{
                ease: 'easeInOut',
                duration: 0.7,
              }}
            >
              <Lottie style={{ width: '33vw' }} data={HelloRobot} />
            </motion.div>
          </div>
        </div>
        <div className="mt-5 mb-3">
          <h4 className="text-gray-300 title-bar uppercase font-semibold">Features</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FeatureItem>
            <div
              onClick={() => _gotoAction('face_detection')}
              className={MORPHIS_CLASSES + ' rounded-xl shadow-lg p-4 h-[120px] text-white w-full'}
            >
              <h4 className="text-gray-200 font-semibold text-lg leading-5 w-[66%]">
                face detection
              </h4>
              <div className="w-fit absolute opacity-50 right-[.75rem] bottom-[.75rem]">
                <BsPersonBoundingBox size={44} className="text-accent opacity-70" />
              </div>
            </div>
          </FeatureItem>
          <FeatureItem>
            <div
              onClick={() => _gotoAction('face_recognition')}
              className={MORPHIS_CLASSES + ' rounded-xl shadow-lg p-4 h-[120px] text-white w-full'}
            >
              <h4 className="text-gray-200 font-semibold text-lg leading-5 w-[66%]">
                face recognition
              </h4>
              <div className="w-fit absolute opacity-50 right-[.75rem] bottom-[.75rem]">
                <LuScanFace size={44} className="text-accent opacity-70" />
              </div>
            </div>
          </FeatureItem>
          <FeatureItem>
            <div
              onClick={() => _gotoAction('face_expression_recognition')}
              className={MORPHIS_CLASSES + ' rounded-xl shadow-lg p-4 h-[120px] text-white w-full'}
            >
              <h4 className="text-gray-200 font-semibold text-lg leading-5 w-[66%]">
                expression detection
              </h4>
              <div className="w-fit absolute opacity-50 right-[.75rem] bottom-[.75rem]">
                <FaRegSmileBeam size={44} className="text-accent opacity-70" />
              </div>
            </div>
          </FeatureItem>
          <FeatureItem>
            <div
              onClick={() => _gotoAction('age_gender_recognition')}
              className={MORPHIS_CLASSES + ' rounded-xl shadow-lg p-4 h-[120px] text-white w-full'}
            >
              <h4 className="text-gray-200 font-semibold text-lg leading-5 w-[66%]">
                age/gender detection
              </h4>
              <div className="w-fit absolute opacity-50 right-[.75rem] bottom-[.75rem]">
                <GiAges size={44} className="text-accent opacity-70" />
              </div>
            </div>
          </FeatureItem>
        </div>
      </div>
    </AppShell>
  );
}
