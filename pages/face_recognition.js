import React from 'react';
import dynamic from 'next/dynamic';
import withTransition from '../components/hoc/withTransition';

const FaceRecognition = dynamic(() => import('../components/pages/FaceRecognition'), {
  ssr: false,
});
function face_recognition() {
  return <FaceRecognition />;
}
export default withTransition(face_recognition);
