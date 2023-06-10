import React from 'react';
import dynamic from 'next/dynamic';
import withTransition from '../components/hoc/withTransition';

const AgeGenderRecognition = dynamic(() => import('../components/pages/AgeGenderRecognition'), {
  ssr: false,
});
function age_gender_recognition() {
  return <AgeGenderRecognition />;
}
export default withTransition(age_gender_recognition);
