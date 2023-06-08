import React from 'react';
import dynamic from 'next/dynamic';
import withTransition from '../components/hoc/withTransition';

const SignupPage = dynamic(() => import('../components/pages/Signup'), {
  ssr: false,
});
function signup() {
  return <SignupPage />;
}

export default withTransition(signup);
