'use client';

import React, { useEffect } from 'react';
import AppShell from '../AppShell';

import { deleteDetection, getDetections, getStorage } from '../utils/storage';
import Header from '../ui/Header';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import dayjs from 'dayjs';
import { FeatureItem, MORPHIS_CLASSES } from '../ui/helpers';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaRegSmileBeam, FaTrash } from 'react-icons/fa';
import { getStatusbarHeight, getTimeline, getUser } from '../../store/selectors';
import Store from '../../store';
import { setTimeline } from '../../store/actions';
import { LuScanFace } from 'react-icons/lu';
import { GiAges } from 'react-icons/gi';
import Lottie from '../ui/Lottie';
import Timeline from '../../assets/lotties/timeline.json';
import { toast } from 'react-toastify';

dayjs.extend(relativeTime);

const loadDetections = async user => {
  const face_detections = (await getDetections(user.uid, 'face_detections')) || [];
  const age_gender_recognitions = (await getDetections(user.uid, 'age_gender_recognitions')) || [];
  const face_expression_recognitions =
    (await getDetections(user.uid, 'face_expression_recognitions')) || [];
  const face_recognitions = (await getDetections(user.uid, 'face_recognitions')) || [];

  const data = [
    ...face_recognitions.map((d, index) => ({ ...d, index })),
    ...face_detections.map((d, index) => ({ ...d, index })),
    ...age_gender_recognitions.map((d, index) => ({ ...d, index })),
    ...face_expression_recognitions.map((d, index) => ({ ...d, index })),
  ];
  data.sort(function (a, b) {
    return new Date(b.dateTime.toDate() - a.dateTime.toDate());
  });
  return data;
};

export default function MyDetections() {
  const timeline = Store.useState(getTimeline);
  const user = Store.useState(getUser);
  useEffect(() => {
    renderTimeline();
  }, []);
  const renderTimeline = async () => {
    const detections = await loadDetections(user);
    setTimeline(detections);
  };

  return (
    <AppShell navBar="true">
      <Header />
      <div className="flex flex-col mt-5  pb-10">
        {timeline && timeline.length ? (
          <>
            <div className="mb-4">
              <h4 className="text-gray-300 title-bar uppercase font-semibold">timeline</h4>
              <p className="text-gray-400 text-xs mx-2">timeline is backed-up on the cloud.</p>
            </div>
            <ol className="relative">
              {timeline.map((d, index) => {
                switch (d.type) {
                  case 'face_recognitions':
                    return <FaceRecognition key={`${d.type}-${d.index}`} detection={d} />;
                  case 'face_expression_recognitions':
                    return <FaceExpression key={`${d.type}-${d.index}`} detection={d} />;
                  case 'face_detections':
                    return <FaceDetection key={`${d.type}-${d.index}`} detection={d} />;
                  case 'age_gender_recognitions':
                    return <AgeGenderRecognition key={`${d.type}-${d.index}`} detection={d} />;
                }
              })}
            </ol>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Lottie data={Timeline} />
            <h5>timeline is empty!</h5>
          </div>
        )}
      </div>
    </AppShell>
  );
}
const FaceDetection = ({ detection }) => {
  const statusbarHeight = Store.useState(getStatusbarHeight);
  const user = Store.useState(getUser);

  const delDetection = async () => {
    await deleteDetection('face_detections', detection);
    toast.success('Record deleted successfully!');
    const detections = await loadDetections(user);
    setTimeline(detections);
  };
  return (
    <li className="pl-8 border-l border-accent last:border-0 ml-5">
      <span
        className={
          MORPHIS_CLASSES +
          ' absolute flex items-center justify-center w-12 h-12 text-white rounded-full -left-1'
        }
      >
        <BsPersonBoundingBox size={20} />
      </span>
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="flex items-center mt-3 mb-1 text-sm font-semibold">face detection</h3>
          <time className="block mb-2 text-xs leading-none text-gray-400 dark:text-gray-500">
            {dayjs(detection.dateTime.toDate()).fromNow()}
          </time>
        </div>

        <button onClick={delDetection} className="btn text-error bg-transparent border-0">
          <FaTrash size={16} />
        </button>
      </div>
      <FeatureItem>
        <PhotoProvider
          maskOpacity={0.7}
          toolbarRender={() => (
            <div style={{ top: statusbarHeight }}>
              <h4>Toolbar</h4>
            </div>
          )}
          overlayRender={props => (
            <div className="fixed bottom-0 p-[15px]">
              <h4>Detections: {detection.detections.length}</h4>
            </div>
          )}
        >
          <PhotoView key={0} src={detection.imageData}>
            <img className="rounded-xl" src={detection.imageData} alt="" />
          </PhotoView>
        </PhotoProvider>
      </FeatureItem>
    </li>
  );
};
const FaceExpression = ({ detection }) => {
  const statusbarHeight = Store.useState(getStatusbarHeight);
  const user = Store.useState(getUser);

  const delDetection = async () => {
    await deleteDetection('face_expression_recognitions', detection);
    toast.success('Record deleted successfully!');
    const detections = await loadDetections(user);
    setTimeline(detections);
  };
  return (
    <li className="pl-8 border-l border-accent last:border-0 ml-5">
      <span
        className={
          MORPHIS_CLASSES +
          ' absolute flex items-center justify-center w-12 h-12 text-white rounded-full -left-1'
        }
      >
        <FaRegSmileBeam size={20} />
      </span>
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="flex items-center mt-3 mb-1 text-sm font-semibold">
            face expression detection
          </h3>
          <time className="block mb-2 text-xs leading-none text-gray-400 dark:text-gray-500">
            {dayjs(detection.dateTime.toDate()).fromNow()}
          </time>
        </div>

        <button onClick={delDetection} className="btn text-error bg-transparent border-0">
          <FaTrash size={16} />
        </button>
      </div>
      <FeatureItem>
        <PhotoProvider
          maskOpacity={0.7}
          toolbarRender={() => (
            <div style={{ top: statusbarHeight }}>
              <h4>Toolbar</h4>
            </div>
          )}
          overlayRender={props => (
            <div className="fixed bottom-0 p-[15px]">
              <h4>Detections: {detection.detections.length}</h4>
            </div>
          )}
        >
          <PhotoView key={0} src={detection.imageData}>
            <img className="rounded-xl" src={detection.imageData} alt="" />
          </PhotoView>
        </PhotoProvider>
      </FeatureItem>
    </li>
  );
};
const FaceRecognition = ({ detection }) => {
  const statusbarHeight = Store.useState(getStatusbarHeight);
  const user = Store.useState(getUser);

  const delDetection = async () => {
    await deleteDetection('face_recognitions', detection);
    toast.success('Record deleted successfully!');
    const detections = await loadDetections(user);
    setTimeline(detections);
  };
  return (
    <li className="pl-8 border-l border-accent last:border-0 ml-5">
      <span
        className={
          MORPHIS_CLASSES +
          ' absolute flex items-center justify-center w-12 h-12 text-white rounded-full -left-1'
        }
      >
        <LuScanFace size={20} />
      </span>
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="flex items-center mt-3 mb-1 text-sm font-semibold">face reocgnition</h3>
          <time className="block mb-2 text-xs leading-none text-gray-400 dark:text-gray-500">
            {dayjs(detection.dateTime.toDate()).fromNow()}
          </time>
        </div>

        <button onClick={delDetection} className="btn text-error bg-transparent border-0">
          <FaTrash size={16} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FeatureItem>
          <PhotoProvider
            maskOpacity={0.7}
            toolbarRender={() => (
              <div style={{ top: statusbarHeight }}>
                <h4>Toolbar</h4>
              </div>
            )}
            overlayRender={props => (
              <div className="fixed bottom-0 p-[15px]">
                <h4>Detections: {detection.detections.length}</h4>
              </div>
            )}
          >
            <PhotoView key={0} src={detection.imageData}>
              <img className="rounded-xl" src={detection.imageData} alt="" />
            </PhotoView>
          </PhotoProvider>
        </FeatureItem>
        <FeatureItem>
          <PhotoProvider
            maskOpacity={0.7}
            toolbarRender={() => (
              <div style={{ top: statusbarHeight }}>
                <h4>Toolbar</h4>
              </div>
            )}
            overlayRender={props => (
              <div className="fixed bottom-0 p-[15px]">
                <h4>Detections: {detection.detections.length}</h4>
              </div>
            )}
          >
            <PhotoView key={0} src={detection.queryData}>
              <img className="rounded-xl" src={detection.queryData} alt="" />
            </PhotoView>
          </PhotoProvider>
        </FeatureItem>
      </div>
    </li>
  );
};
const AgeGenderRecognition = ({ detection }) => {
  const statusbarHeight = Store.useState(getStatusbarHeight);
  const user = Store.useState(getUser);

  const delDetection = async () => {
    await deleteDetection('age_gender_recognitions', detection);
    toast.success('Record deleted successfully!');
    const detections = await loadDetections(user);
    setTimeline(detections);
  };
  return (
    <li className="pl-8 border-l border-b border-b-gray-800 pb-3 border-accent last:border-0 ml-5">
      <span
        className={
          MORPHIS_CLASSES +
          ' absolute flex items-center justify-center w-12 h-12 text-white rounded-full -left-1'
        }
      >
        <GiAges size={20} />
      </span>
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="flex items-center mt-3 mb-1 text-sm font-semibold">
            age/gender recognition
          </h3>
          <time className="block mb-2 text-xs leading-none text-gray-400 dark:text-gray-500">
            {dayjs(detection.dateTime.toDate()).fromNow()}
          </time>
        </div>

        <button onClick={delDetection} className="btn text-error bg-transparent border-0">
          <FaTrash size={16} />
        </button>
      </div>
      <FeatureItem>
        <PhotoProvider
          maskOpacity={0.7}
          toolbarRender={() => (
            <div style={{ top: statusbarHeight }}>
              <h4>Toolbar</h4>
            </div>
          )}
          overlayRender={props => (
            <div className="fixed bottom-0 p-[15px]">
              <h4>Detections: {detection.detections.length}</h4>
            </div>
          )}
        >
          <PhotoView key={0} src={detection.imageData}>
            <img className="rounded-xl" src={detection.imageData} alt="" />
          </PhotoView>
        </PhotoProvider>
      </FeatureItem>
    </li>
  );
};
