'use client';

import React, { useEffect } from 'react';
import AppShell from '../AppShell';

import { deleteDetection, getStorage } from '../utils/storage';
import Header from '../ui/Header';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import dayjs from 'dayjs';
import { FeatureItem, MORPHIS_CLASSES } from '../ui/helpers';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaRegSmileBeam, FaTrash } from 'react-icons/fa';
import { getTimeline } from '../../store/selectors';
import Store from '../../store';
import { setTimeline } from '../../store/actions';
import { LuScanFace } from 'react-icons/lu';
import { GiAges } from 'react-icons/gi';
import Lottie from '../ui/Lottie';
import Timeline from '../../assets/lotties/timeline.json';
dayjs.extend(relativeTime);

const getDetections = async () => {
  const face_detections = (await getStorage('face_detections')) || [];
  const age_gender_recognitions = (await getStorage('age_gender_recognitions')) || [];
  const face_expression_recognitions = (await getStorage('face_expression_recognitions')) || [];
  const face_recognitions = (await getStorage('face_recognitions')) || [];
  const data = [
    ...face_recognitions.map((d, index) => ({ ...d, index })),
    ...face_detections.map((d, index) => ({ ...d, index })),
    ...age_gender_recognitions.map((d, index) => ({ ...d, index })),
    ...face_expression_recognitions.map((d, index) => ({ ...d, index })),
  ];
  data.sort(function (a, b) {
    return new Date(Date.parse(b.dateTime)) - new Date(Date.parse(a.dateTime));
  });
  return data;
};
export default function MyDetections() {
  const timeline = Store.useState(getTimeline);
  useEffect(() => {
    renderTimeline();
  }, []);
  const renderTimeline = async () => {
    const detections = await getDetections();
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
              <p className="text-gray-400 text-xs mx-2">
                time is stored locally, it will be deleted when thi session expires.
              </p>
            </div>
            <ol className="relative">
              {timeline.map((d, index) => {
                switch (d.type) {
                  case 'face_recognitions':
                    return (
                      <FaceRecognition
                        key={`${d.type}-${d.index}`}
                        last={timeline.length == index + 1}
                        detection={d}
                      />
                    );
                  case 'face_expression_recognitions':
                    return (
                      <FaceExpression
                        key={`${d.type}-${d.index}`}
                        last={timeline.length == index + 1}
                        detection={d}
                      />
                    );
                  case 'face_detections':
                    return (
                      <FaceDetection
                        key={`${d.type}-${d.index}`}
                        last={timeline.length == index + 1}
                        detection={d}
                      />
                    );
                  case 'age_gender_recognitions':
                    return (
                      <AgeGenderRecognition
                        key={`${d.type}-${d.index}`}
                        last={timeline.length == index + 1}
                        detection={d}
                      />
                    );
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
const FaceDetection = ({ last, detection }) => {
  const delDetection = async () => {
    await deleteDetection('face_detections', detection.index);
    const detections = await getDetections();
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
            {dayjs(detection.dateTime).fromNow()}
          </time>
        </div>

        <button onClick={delDetection} className="btn text-error bg-transparent border-0">
          <FaTrash size={16} />
        </button>
      </div>
      <FeatureItem>
        <PhotoProvider
          maskOpacity={0.7}
          overlayRender={props => (
            <div className="fixed bottom-0 p-[15px]">
              <h4>Detections: {detection.detections.length}</h4>
            </div>
          )}
        >
          <PhotoView key={0} src={detection.imageURL}>
            <img className="rounded-xl" src={detection.imageURL} alt="" />
          </PhotoView>
        </PhotoProvider>
      </FeatureItem>
    </li>
  );
};
const FaceExpression = ({ last, detection }) => {
  const delDetection = async () => {
    await deleteDetection('face_expression_recognitions', detection.index);
    const detections = await getDetections();
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
            {dayjs(detection.dateTime).fromNow()}
          </time>
        </div>

        <button onClick={delDetection} className="btn text-error bg-transparent border-0">
          <FaTrash size={16} />
        </button>
      </div>
      <FeatureItem>
        <PhotoProvider
          maskOpacity={0.7}
          overlayRender={props => (
            <div className="fixed bottom-0 p-[15px]">
              <h4>Detections: {detection.detections.length}</h4>
            </div>
          )}
        >
          <PhotoView key={0} src={detection.imageURL}>
            <img className="rounded-xl" src={detection.imageURL} alt="" />
          </PhotoView>
        </PhotoProvider>
      </FeatureItem>
    </li>
  );
};
const FaceRecognition = ({ last, detection }) => {
  const delDetection = async () => {
    await deleteDetection('face_recognitions', detection.index);
    const detections = await getDetections();
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
            {dayjs(detection.dateTime).fromNow()}
          </time>
        </div>

        <button onClick={delDetection} className="btn text-error bg-transparent border-0">
          <FaTrash size={16} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FeatureItem>
          <h6 className="text-sm mb-1">reference</h6>
          <PhotoProvider
            maskOpacity={0.7}
            overlayRender={props => (
              <div className="fixed bottom-0 p-[15px]">
                <h4>Detections: {detection.detections.length}</h4>
              </div>
            )}
          >
            <PhotoView key={0} src={detection.imageURL}>
              <img className="rounded-xl" src={detection.imageURL} alt="" />
            </PhotoView>
          </PhotoProvider>
        </FeatureItem>
        <FeatureItem>
          <h6 className="text-sm mb-1">result</h6>
          <PhotoProvider
            maskOpacity={0.7}
            overlayRender={props => (
              <div className="fixed bottom-0 p-[15px]">
                <h4>Detections: {detection.detections.length}</h4>
              </div>
            )}
          >
            <PhotoView key={0} src={detection.queryURL}>
              <img className="rounded-xl" src={detection.queryURL} alt="" />
            </PhotoView>
          </PhotoProvider>
        </FeatureItem>
      </div>
    </li>
  );
};
const AgeGenderRecognition = ({ last, detection }) => {
  const delDetection = async () => {
    await deleteDetection('age_gender_recognitions', detection.index);
    const detections = await getDetections();
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
        <GiAges size={20} />
      </span>
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="flex items-center mt-3 mb-1 text-sm font-semibold">
            age/gender recognition
          </h3>
          <time className="block mb-2 text-xs leading-none text-gray-400 dark:text-gray-500">
            {dayjs(detection.dateTime).fromNow()}
          </time>
        </div>

        <button onClick={delDetection} className="btn text-error bg-transparent border-0">
          <FaTrash size={16} />
        </button>
      </div>
      <FeatureItem>
        <PhotoProvider
          maskOpacity={0.7}
          overlayRender={props => (
            <div className="fixed bottom-0 p-[15px]">
              <h4>Detections: {detection.detections.length}</h4>
            </div>
          )}
        >
          <PhotoView key={0} src={detection.imageURL}>
            <img className="rounded-xl" src={detection.imageURL} alt="" />
          </PhotoView>
        </PhotoProvider>
      </FeatureItem>
    </li>
  );
};
