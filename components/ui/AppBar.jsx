import { useRouter } from 'next/router';
import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { MORPHIS_CLASSES } from './helpers';
import Store from '../../store';
import { getStatusbarHeight } from '../../store/selectors';

export default function AppBar({ title }) {
  const router = useRouter();
  const statusbarHeight = Store.useState(getStatusbarHeight);

  const goBack = () => {
    router.back();
  };
  return (
    <div
      style={{ paddingTop: statusbarHeight + 16 }}
      className={
        MORPHIS_CLASSES +
        ' z-10 fixed top-0 left-0 w-full flex justify-between items-center pb-4 px-[15px]'
      }
    >
      <div className="flex">
        <button onClick={goBack} className="mr-3">
          <IoChevronBack size={24} />
        </button>
        {title ? <h4 className="text-lg">{title}</h4> : null}
      </div>
    </div>
  );
}
