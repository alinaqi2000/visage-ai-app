import React from 'react';
import dynamic from 'next/dynamic';
import withTransition from '../components/hoc/withTransition';

const FaceExpressionRecognition = dynamic(
  () => import('../components/pages/FaceExpressionRecognition'),
  {
    ssr: false,
  }
);
function face_detection() {
  return <FaceExpressionRecognition />;
}
export default withTransition(face_detection);
