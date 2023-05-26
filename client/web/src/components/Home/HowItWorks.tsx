import useLanguage from '@/hooks/useLanguage';
import Image from 'next/image';
import React from 'react';

const HowItWorks = () => {
  const [titleTxt] = useLanguage(['home.howItWorks.titleTxt']);

  return (
    <div className='flex flex-col space-y-2 items-center py-20 sm:pt-60 md:pt-96 lg:pt-60 dark:bg-dark-primary'>
      <p className='uppercase text-sm dark:text-gray-secondary'>{titleTxt}</p>
      <p className='font-bold sm:text-2xl md:text-3xl dark:text-gray-secondary'>
        Дараах 3 энгийн алхам
      </p>
      <div className='relative w-[250px] h-[100px] sm:w-[400px] md:w-[600px] pt-5 sm:pt-10 -bottom-10'>
        <Image
          src='/logos/group.png'
          alt='land-200'
          fill
          className='object-contain'
        />
      </div>
    </div>
  );
};

export default HowItWorks;
