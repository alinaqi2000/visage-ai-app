import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const App = dynamic(() => import('../components/AppShell'), {
  ssr: false,
});

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push('/signup');
  });
  return <App />;
}
