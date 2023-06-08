import { useRouter } from 'next/router';
import React from 'react';
import { IoChevronBack } from 'react-icons/io5';

export default function AppBar({ title }) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex">
        <button onClick={goBack} className="mr-3">
          <IoChevronBack size={24} />
        </button>
        {title ? <h4 className="text-lg">{title}</h4> : null}
      </div>
    </div>
  );
}
