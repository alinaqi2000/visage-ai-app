import React from 'react';
import Brand from './Brand';
import Store from '../../store';
import { getUser } from '../../store/selectors';

export default function Header() {
  const user = Store.useState(getUser);

  return (
    <div className="flex justify-between items-center py-2">
      <Brand />
    </div>
  );
}
