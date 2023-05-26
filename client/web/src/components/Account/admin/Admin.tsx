import {
  PencilSquareIcon,
  PlusCircleIcon,
  TruckIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import ProfileInputs from '../ProfileInputs';
// import CarsTable from './car/CarsTable';
// import CarInputs from './car/CarInputs';
import dynamic from 'next/dynamic';
const CarInputs = dynamic(() => import('./car/CarInputs'));
const CarsTable = dynamic(() => import('./car/CarsTable'));

type Props = { userData: UserData };

const AdminPage = ({ userData }: Props) => {
  const [toggle, setToggle] = useState(1);
  const [mobile, setMobile] = useState(false);

  const toggleTab = (index: number) => {
    setToggle(index);
  };

  // for 390px mobile device icon changing
  const changeMobile = () => {
    if (window.innerWidth <= 390) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  // for 390px mobile device icon changing
  useEffect(() => {
    changeMobile();
    // adding the event when scroll change background
    window.addEventListener('resize', changeMobile);
    return () => window.removeEventListener('resize', changeMobile);
  });

  return (
    <>
      <div className='mx-auto p-5 flex flex-col items-center'>
        <div className='lg:w-1/3 md:w-1/3 w-2/3 mx-auto h-[40px] bg-[#393939]  rounded-xl flex justify-center items-center'>
          <div className='w-5/6 mx-auto h-[35px] flex flex-row items-center px-[3xl] rounded-xl shadow-2xl  transition bg-[#393939] cursor-pointer'>
            <div
              className={
                toggle === 1
                  ? 'tabs active-tabs bg-[#ff2f01] w-1/3 h-full rounded-xl flex items-center justify-center '
                  : 'tabs w-1/3 flex items-center justify-center'
              }
              onClick={() => toggleTab(1)}
            >
              <span className='text-white text-center text-xs lg:text-base md:text-sm'>
                Профайл
              </span>
            </div>
            <div
              className={
                toggle === 2
                  ? 'tabs active-tabs bg-[#ff2f01] w-1/3 h-full rounded-xl flex items-center justify-center'
                  : 'tabs w-1/3 flex items-center justify-center'
              }
              onClick={() => toggleTab(2)}
            >
              <div className='flex items-center space-x-2'>
                <span className='text-white text-xs lg:text-base md:text-sm'>
                  <PlusCircleIcon className='h-3 sm:h-4' />
                </span>
                {mobile ? (
                  <span className='text-white text-xs lg:text-base md:text-sm'>
                    <TruckIcon className='h-6' />
                  </span>
                ) : (
                  <span className='text-white text-xs lg:text-base md:text-sm'>
                    Машин
                  </span>
                )}
              </div>
            </div>
            <div
              className={
                toggle === 3
                  ? 'tabs active-tabs bg-[#ff2f01] w-1/3 h-full rounded-xl flex items-center justify-center'
                  : 'tabs w-1/3 flex items-center justify-center'
              }
              onClick={() => toggleTab(3)}
            >
              <div className='flex items-center space-x-2'>
                <span className='text-white text-xs lg:text-base md:text-sm'>
                  <PencilSquareIcon className='h-3 sm:h-4' />
                </span>
                {mobile ? (
                  <span className='text-white text-xs lg:text-base md:text-sm'>
                    <TruckIcon className='h-6' />
                  </span>
                ) : (
                  <span className='text-white text-xs lg:text-base md:text-sm'>
                    Машин
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6 p-5'>
          {toggle === 1 && <ProfileInputs userData={userData} />}
          {toggle === 2 && <CarInputs />}
        </div>
        <div className='w-2/3 md:w-full'>{toggle === 3 && <CarsTable />}</div>
      </div>
    </>
  );
};
export default AdminPage;

//https://www.youtube.com/watch?v=7lhUsK-FxYI&t=259s
