import React from 'react';
import dynamic from 'next/dynamic';
import withTransition from '../components/hoc/withTransition';

const FaceDetectionPage = dynamic(() => import('../components/pages/FaceDetection'), {
  ssr: false,
});
function face_detection() {
  return <FaceDetectionPage />;
}
export default withTransition(face_detection);
