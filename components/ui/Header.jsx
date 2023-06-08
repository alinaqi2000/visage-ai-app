import React from 'react';
import Brand from './Brand';
import Store from '../../store';
import { getUser } from '../../store/selectors';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const user = Store.useState(getUser);

  return (
    <div className="flex justify-between items-center">
      <Brand />
      <Link href={'/settings'}>
        <Image
          src={user?.photoUrl}
          alt={user?.displayName}
          width={36}
          height={36}
          className="rounded-full"
        />
      </Link>
    </div>
  );
}
