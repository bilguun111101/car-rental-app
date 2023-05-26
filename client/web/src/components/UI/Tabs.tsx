import Image from 'next/image';
import { useState } from 'react';

function Tabs() {
  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow((show) => !show);
  };

  const btnArray = [
    {
      id: 1,
      image: '/icons/engine_about.png',
      text: 'Engine',
      checkIcon: '/icons/check-orange.png',
    },
    {
      id: 2,
      image: '/icons/gear_about.png',
      text: 'Transmission',
      checkIcon: '/icons/check-orange.png',
    },
    {
      id: 3,
      image: '/icons/electric_about.png',
      text: 'Electrical',
      checkIcon: '/icons/check-orange.png',
    },
    {
      id: 4,
      image: '/icons/cooling_about.png',
      text: 'Cooling',
      checkIcon: '/icons/check-orange.png',
    },
    {
      id: 5,
      image: '/icons/more_about.png',
      text: '20+ More',
      checkIcon: '/icons/check-orange.png',
    },
  ];

  return (
    <div className='flex flex-col'>
      {/* -------------- Buttons --------------- */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
        {btnArray.map((btn, i) => (
          <label
            key={i}
            htmlFor='my-modal-6'
            className='btn glass font-medium text-gray-700 capitalize text-base sm:text-xs  dark:text-gray-secondary'
          >
            <Image
              width={50}
              height={50}
              className='mr-2'
              src={btn.image}
              alt='cars'
            />
            {btn.text}
            <Image
              width={10}
              height={10}
              className='ml-2'
              src={btn.checkIcon}
              alt='cars'
            />
          </label>
        ))}
      </div>

      {/* ------------ Car details ------------ */}
      <div className='flex flex-col my-[300px]'>
        <div className='relative'>
          {show ? (
            <div className='flex flex-col'>
              {/* ------------ row -------------- */}
              <div className='flex'>
                <div className='flex'>
                  <div className='absolute max-sm:text-xs max-md:text-sm max-md:top-[-200px] top-[-250px] flex flex-col items-center gap-4'>
                    <div className='w-[100px] h-[100px] flex items-center justify-center bg-white shadow-xl rounded-md hover:rotate-6 duration-200'>
                      <Image
                        width={30}
                        height={30}
                        className=''
                        src='/about/price_icon.png'
                        alt='cars'
                      />
                    </div>
                    <p className='dark:text-gray-secondary'>
                      Competitive Pricing
                    </p>
                  </div>
                  <Image
                    width={104}
                    height={180}
                    className='absolute top-[-190px] left-40 max-md:hidden'
                    src='/about/top-left.png'
                    alt='cars'
                  />
                </div>

                <div className='flex'>
                  <div className='absolute max-sm:text-xs max-md:text-sm top-[-250px] lg:left-[400px] md:left-[250px] sm:left-[150px] max-sm:left-[150px] flex flex-col items-center gap-4 '>
                    <div className='w-[100px] h-[100px] flex items-center justify-center bg-white shadow-xl rounded-md hover:scale-105 duration-200'>
                      <Image
                        width={35}
                        height={35}
                        className=''
                        src='/about/idea_icon.png'
                        alt='cars'
                      />
                    </div>
                    <p className='dark:text-gray-secondary'>Easier Rent</p>
                    <p className='mt-[-20px] dark:text-gray-secondary'>
                      On Your Budget
                    </p>
                  </div>
                  <Image
                    width={21}
                    height={73}
                    className='absolute top-[-82px] left-[450px] max-lg:left-[300px] max-md:hidden'
                    src='/about/top-middle.png'
                    alt='cars'
                  />
                </div>

                <div className='flex'>
                  <div className='absolute max-sm:text-xs max-md:text-sm max-md:top-[-200px] top-[-250px] right-10 flex flex-col items-center gap-4'>
                    <div className='w-[100px] h-[100px] flex items-center justify-center bg-white shadow-xl rounded-md hover:rotate-[-6deg] duration-200'>
                      <Image
                        width={30}
                        height={30}
                        className=''
                        src='/about/wallet_icon.png'
                        alt='cars'
                      />
                    </div>
                    <p className='dark:text-gray-secondary'>Most Flexible</p>
                    <p className='mt-[-20px] dark:text-gray-secondary'>
                      Payment Plan
                    </p>
                  </div>
                  <Image
                    width={104}
                    height={180}
                    className='absolute top-[-190px] right-[200px] max-lg:left-[350px] max-md:hidden'
                    src='/about/top-right.png'
                    alt='cars'
                  />
                </div>
              </div>
              {/* ------------ row ------------- */}
              <div className='flex'>
                <div className='flex'>
                  <div className='absolute max-sm:text-xs max-md:text-sm max-md:top-[250px] max-lg:top-[400px] top-[600px] flex flex-col items-center gap-4'>
                    <div className='w-[100px] h-[100px] flex items-center justify-center bg-white shadow-xl rounded-md hover:rotate-6 duration-200'>
                      <Image
                        width={35}
                        height={35}
                        className=''
                        src='/about/budget_icon.png'
                        alt='cars'
                      />
                    </div>
                    <p className='dark:text-gray-secondary'>
                      The Best Extended
                    </p>
                    <p className='mt-[-20px] dark:text-gray-secondary'>
                      Auto Warrenties
                    </p>
                  </div>
                  <Image
                    width={104}
                    height={180}
                    className='absolute top-[480px] max-lg:top-[280px] left-[170px] max-md:hidden'
                    src='/about/bottom-left.png'
                    alt='cars'
                  />
                </div>

                <div className='flex'>
                  <div className='absolute max-sm:text-xs max-md:text-sm max-md:top-[300px] max-lg:top-[400px] top-[600px] max-md:left-[150px] max-lg:left-[250px] left-[400px] flex flex-col items-center gap-4'>
                    <div className='w-[100px] h-[100px] flex items-center justify-center bg-white shadow-xl rounded-md hover:scale-105 duration-200'>
                      <Image
                        width={35}
                        height={35}
                        className=''
                        src='/about/assist_icon.png'
                        alt='cars'
                      />
                    </div>
                    <p className='dark:text-gray-secondary'>Roadside</p>
                    <p className='mt-[-20px] dark:text-gray-secondary'>
                      Assistance 24/7
                    </p>
                  </div>
                  <Image
                    width={21}
                    height={73}
                    className='absolute top-[480px] max-lg:top-[280px] left-[450px] max-lg:left-[300px] max-md:hidden'
                    src='/about/bottom-middle.png'
                    alt='cars'
                  />
                </div>

                <div className='flex'>
                  <div className='absolute max-sm:text-xs max-md:text-sm max-md:top-[250px] max-lg:top-[400px] top-[600px] right-10 flex flex-col items-center gap-4'>
                    <div className='w-[100px] h-[100px] flex items-center justify-center bg-white shadow-xl rounded-md hover:rotate-[-6deg] duration-200'>
                      <Image
                        width={35}
                        height={35}
                        className=''
                        src='/about/service_icon.png'
                        alt='cars'
                      />
                    </div>
                    <p className='dark:text-gray-secondary'>Your Choice</p>
                    <p className='mt-[-20px] dark:text-gray-secondary'>
                      of Mechanic
                    </p>
                  </div>
                  <Image
                    width={104}
                    height={180}
                    className='absolute top-[480px] max-lg:top-[280px] right-[200px] max-lg:left-[350px] max-md:hidden'
                    src='/about/bottom-right.png'
                    alt='cars'
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <Image
          width={864}
          height={461}
          onClick={handleClick}
          src='/cars/car_top.png'
          className='object-contain w-full h-full'
          alt='car'
        />
      </div>
    </div>
  );
}

export default Tabs;
