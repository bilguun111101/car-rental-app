/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React from 'react';

type Props = {};

const BestServices = (props: Props) => {
  return (
    <div>
      <div className='flex flex-row items-center'>
        <div className='w-1/2'>
          <Image
            src='/cars/range_rover1.png'
            height={200}
            width={200}
            alt='wrangler'
            priority
            className='sm:w-[300px] md:w-[400px] lg:w-[600px] object-contain'
          />
        </div>
        <div className='flex flex-col items-start w-1/2 m-2'>
          <h3 className='uppercase text-[10px] mb-3 font-semibold ml-2 sm:text-sm md:text-base dark:text-gray-secondary'>
            Манай шилдэг үйлчилгээ
          </h3>
          <h3 className='text-sm font-bold ml-2 sm:text-base md:text-xl lg:text-3xl mb-2 dark:text-gray-secondary'>
            Feel the best experience with our rental deals
          </h3>
          <div className='flex flex-row space-y-2 hover:scale-105 transition-all duration-300 ease-in-out'>
            <Image
              src='/logos/deals.png'
              height={50}
              width={50}
              alt='wrangler'
              className='sm:w-[60px] md:w-[80px]'
            />
            <div className='flex flex-col'>
              <h5 className='text-[10px] font-semibold sm:text-sm md:text-base dark:text-gray-secondary '>
                Deals for every budget
              </h5>
              <p className='text-[8px] sm:text-[10px] md:text-sm dark:text-gray-secondary'>
                Incredible price
              </p>
            </div>
          </div>
          <div className='flex flex-row space-y-2 hover:scale-105 transition-all duration-300 ease-in-out'>
            <Image
              src='/logos/bestPrice.png'
              height={50}
              width={50}
              alt='bestPrice'
              className='sm:w-[60px] md:w-[80px]'
            />
            <div className='flex flex-col'>
              <h5 className='text-[10px] font-semibold sm:text-sm md:text-base dark:text-gray-secondary'>
                Best price guaranteed
              </h5>
              <p className='text-[8px] sm:text-[10px] md:text-sm dark:text-gray-secondary'>
                Find a lower price
              </p>
            </div>
          </div>
          <div className='flex flex-row space-y-2 hover:scale-105 transition-all duration-300 ease-in-out'>
            <Image
              src='/logos/deals.png'
              height={50}
              width={50}
              alt='support'
              className='sm:w-[60px] md:w-[80px]'
            />
            <div className='flex flex-col'>
              <h5 className='text-[10px] font-semibold sm:text-sm md:text-base dark:text-gray-secondary'>
                Support 24/7
              </h5>
              <p className='text-[8px] sm:text-[10px] md:text-sm dark:text-gray-secondary'>
                Find a lower price? We will refund you 100% of the difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestServices;
