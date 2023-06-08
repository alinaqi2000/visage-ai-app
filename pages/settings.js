import React from 'react';
import dynamic from 'next/dynamic';
import withTransition from '../components/hoc/withTransition';

const SettingsPage = dynamic(() => import('../components/pages/Settings'), {
  ssr: false,
});
function settings() {
  return <SettingsPage />;
}
export default withTransition(settings);
