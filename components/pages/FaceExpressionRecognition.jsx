'use client';
import FormData from 'form-data';
import React, { useEffect, useState } from 'react';
import AppShell from '../AppShell';
import AppBar from '../ui/AppBar';
import { API_URL, FeatureItem, MORPHIS_CLASSES } from '../ui/helpers';
import { BiImageAdd } from 'react-icons/bi';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BsPersonBoundingBox } from 'react-icons/bs';
import Lottie from '../ui/Lottie';
import { motion } from 'framer-motion';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { setDetections } from '../utils/storage';
import NothingDetected from '../../assets/lotties/nothing_detected.json';
import { isPlatform } from '@ionic/react';
import Store from '../../store';
import { getUser } from '../../store/selectors';

export default function FaceExpressionRecognition() {
  const [firstImage, setFirstImage] = useState(null);
  const [stage, setStage] = useState('idle');
  const [response, setResponse] = useState(null);
  const user = Store.useState(getUser);

  useEffect(() => {}, []);
  const _pickImage = async () => {
    setResponse(null);
    setStage('idle');
    try {
      const result = await FilePicker.pickImages({ readData: true });
      console.log(result);
      if (result.files && result.files[0]) {
        const pickerImage = result.files[0];
        setFirstImage(pickerImage);
      } else {
        setFirstImage(null);
        toast.error('please select a valid image!');
      }
    } catch (error) {
      setFirstImage(null);
      toast.error('image selection failed.');
    }
  };
  const _sendData = async () => {
    if (firstImage) {
      try {
        setStage('detecting');

        const res = await axios.post(API_URL + 'face_expression_recognition', {
          image: {
            name: firstImage.name,
            data: firstImage.data,
          },
        });
        setStage('hasResponse');
        if (res.data.success) {
          setResponse(res.data.success);
          await setDetections('face_expression_recognitions', {
            ...res.data.success,
            userId: user.uid,
          });
        }
      } catch (error) {
        toast.error(JSON.stringify(error));
      }
    } else {
      setStage('idle');
      toast.error('Please select a valid image!');
      setResponse(null);
    }
  };
  return (
    <AppShell>
      <AppBar title={'face expression recognition'} />
      <div className="flex flex-col mt-16 pb-20">
        <h5 className="text-lg font-semibold lowercase">face expression recognition</h5>
        <p className="text-sm mt-2">
          automated process of analyzing facial expressions to identify and classify different
          emotions or moods.
        </p>
        <div className="mt-5">
          <div
            className={
              ' h-[200px] rounded-xl border-dashed border-2 border-gray-400 overflow-hidden'
            }
            style={{
              backgroundImage: `url('data:image/jpeg;base64,${firstImage?.data}')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
            }}
          >
            <div
              onClick={_pickImage}
              className={MORPHIS_CLASSES + ' flex justify-center h-full items-center'}
            >
              <BiImageAdd size={32} />
              <h4 className="ml-3">add image</h4>
            </div>
          </div>
        </div>

        <div className="mt-5">
          {stage == 'detecting' ? (
            <Fetching />
          ) : response && response.detections && response.detections.length ? (
            <>
              <div className="mb-2">
                <h4 className="text-gray-300 title-bar uppercase font-semibold">result</h4>
              </div>
              {response.imageURL && (
                <FeatureItem>
                  <PhotoProvider
                    maskOpacity={0.7}
                    overlayRender={props => (
                      <div className="fixed bottom-0 p-[15px]">
                        <h4>Detections: {response.detections.length}</h4>
                      </div>
                    )}
                  >
                    <PhotoView key={0} src={response.imageURL}>
                      <img className="rounded-xl" src={response.imageURL} alt="" />
                    </PhotoView>
                  </PhotoProvider>
                  {/* <Image
                    src={response.imageURL}
                    className="rounded-xl"
                    width={width - 30}
                    alt="detection result"
                    height={200}
                  /> */}
                </FeatureItem>
              )}
              <div className="mt-3">
                <div className="mb-2">
                  <h4 className="text-gray-300 title-bar uppercase font-semibold">stats</h4>
                </div>
                <div className="flex justify-center flex-wrap w-full">
                  {response.detections &&
                    response.detections.map((d, index) => {
                      const expression = readExpression(d.expressions);
                      return (
                        <FeatureItem key={`${index}`}>
                          <div className="stats shadow mr-2 mb-2">
                            <div className={MORPHIS_CLASSES + ' stat px-5 py-4'}>
                              <div className="stat-title text-accent">person {index + 1}</div>
                              <div className="stat-value text-3xl">
                                {Math.floor(expression.value * 100)}%
                              </div>
                              <div className="stat-desc text-gray-400">{expression.emotion}</div>
                            </div>
                          </div>
                        </FeatureItem>
                      );
                    })}
                </div>
              </div>
            </>
          ) : stage == 'hasResponse' ? (
            <div className="w-full flex flex-col items-center justify-center mt-3">
              <Lottie style={{ height: 150 }} data={NothingDetected} />
              <h6 className="mt-3 text-gray-400">nothing detected!</h6>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={'fixed left-0 bottom-0 w-[100vw]'}>
        {firstImage ? (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className={MORPHIS_CLASSES + ' w-full py-5 flex justify-center '}
            transition={{
              ease: 'easeInOut',
              delay: 0.5,
              duration: 0.5,
            }}
          >
            <button
              onClick={_sendData}
              className="btn btn-wide btn-accent normal-case rounded-full"
            >
              <BsPersonBoundingBox size={16} className="opacity-70 mr-1" /> detect
            </button>
          </motion.div>
        ) : (
          ''
        )}
      </div>
    </AppShell>
  );
}
const readExpression = (expressions = []) => {
  let highest = {
    emotion: 'neutral',
    value: 0,
  };
  for (let emos in expressions) {
    if (expressions[emos] > highest.value) {
      highest = { emotion: emos, value: expressions[emos] };
    }
  }
  return highest;
};
const Fetching = () => {
  return (
    <div
      role="status"
      className="space-y-4 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
    >
      <div
        className={
          MORPHIS_CLASSES + ' flex items-center justify-center w-full h-[200px] rounded-xl'
        }
      >
        <svg
          className="w-12 h-12 text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
        </svg>
      </div>
      <div className="w-full flex flex-wrap justify-center">
        {[0, 1, 2, 3, 4, 5].map(d => (
          <div className="stats shadow mr-2 mb-2" key={`${d}`}>
            <div className={MORPHIS_CLASSES + ' stat px-5 py-4'}>
              <div className="h-1.5 w-12 bg-gray-500 rounded-full dark:bg-gray-700 mb-4"></div>
              <div className="h-2.5 w-16 bg-gray-400 rounded-full dark:bg-gray-700 mb-4"></div>
              <div className="h-1.5 w-12 bg-gray-500 rounded-full dark:bg-gray-700 mb-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
