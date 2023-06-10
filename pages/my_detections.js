import React from 'react';
import dynamic from 'next/dynamic';
import withTransition from '../components/hoc/withTransition';

const MyDetectionsPage = dynamic(() => import('../components/pages/MyDetections'), {
  ssr: false,
});
function my_detections() {
  return <MyDetectionsPage />;
}
export default withTransition(my_detections);
