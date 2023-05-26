import Image from 'next/image';
import React from 'react';

type Props = {};

const DownloadApp = (props: Props) => {
  return (
    <div className='mt-32 pb-32'>
      <div className='relative h-[220px] w-full sm:h-[280px] bg-gradient-to-r from-red-primary to-red-secondary rounded-2xl'>
        <div className='flex flex-col space-y-2 w-[150px] sm:w-[200px] md:w-[250px] ml-5 sm:ml-10'>
          <h5 className='text-white font-bold mt-5 sm:text-lg md:text-xl'>
            Машин түрээсийн апп татах
          </h5>
          <p className='text-[10px] text-white sm:text-sm md:text-base'>
            шуурхай, хэрэглэхэд хялбар захиалга.
          </p>
          <div className='flex flex-row space-x-2 pt-10'>
            <div className='p-2 bg-white rounded-md'>
              <Image
                src='/logos/apple_store.png'
                height={70}
                width={70}
                alt='wrangler'
                className='md:w-[100px]'
              />
            </div>
            <div className='p-2 bg-white rounded-md'>
              <Image
                src='/logos/google_play.png'
                height={70}
                width={70}
                alt='wrangler'
                className='md:w-[100px]'
              />
            </div>
          </div>
        </div>
        <Image
          src='/logos/phone.png'
          height={150}
          width={150}
          alt='wrangler'
          className='sm:w-[220px] md:w-[250px] object-contain z-10 absolute -top-10 right-12 sm:-top-24 md:-top-32 md:right-16'
        />
      </div>
    </div>
  );
};

export default React.memo(DownloadApp);
