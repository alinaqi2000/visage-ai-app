import React from 'react';
import dynamic from 'next/dynamic';
import withTransition from '../components/hoc/withTransition';

const HomePage = dynamic(() => import('../components/pages/Home'), {
  ssr: false,
});
function home() {
  return <HomePage />;
}
export default withTransition(home);
