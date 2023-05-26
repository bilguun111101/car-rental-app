import React from 'react';
import { PuffLoader } from 'react-spinners';

type Props = {};

const Spinner = (props: Props) => {
  return (
    <div className='backdrop'>
      <PuffLoader color='#00ffcc' className='' size={120} />
    </div>
  );
};

export default Spinner;
