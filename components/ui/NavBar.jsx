import React from 'react';
import Image from 'next/image';
import { FcHome, FcTimeline } from 'react-icons/fc';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Store from '../../store';
import { getUser } from '../../store/selectors';
import { motion } from 'framer-motion';
import { MORPHIS_CLASSES } from './helpers';

export default function NavBar() {
  const user = Store.useState(getUser);

  const router = useRouter();

  return (
    <div className="fixed bottom-3 w-[calc(100vw-30px)] text-center">
      <div className={MORPHIS_CLASSES + ' rounded-full'}>
        <ul className="w-full menu menu-horizontal items-center py-3 justify-around">
          <li className="">
            <Link
              href={'/home'}
              className={`px-4 text-center ${router.pathname == '/home' ? 'active' : ''}`}
            >
              <FcHome size={28} />
              {router.pathname == '/home' && <NavItem text="home" />}
            </Link>
          </li>
          <li className="">
            <Link
              href={'/my_detections'}
              className={`px-4 text-center ${router.pathname == '/my_detections' ? 'active' : ''}`}
            >
              <FcTimeline size={28} />
              {router.pathname == '/my_detections' && <NavItem text="timeline" />}
            </Link>
          </li>
          <li className="">
            <Link
              href={'/settings'}
              className={`px-4 ${router.pathname == '/settings' ? 'active' : ''}`}
            >
              <Image
                src={user?.photoUrl}
                alt={user?.displayName}
                width={28}
                height={28}
                className="rounded-full"
              />
              {router.pathname == '/settings' && <NavItem text="profile" />}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function NavItem({ text }) {
  return (
    <motion.div
      initial={{ x: '-30%', opacity: 0.2 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        ease: 'linear',
        duration: 0.2,
      }}
    >
      <h6 className="text-xs">{text}</h6>
    </motion.div>
  );
}
