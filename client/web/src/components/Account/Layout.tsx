import { ReactNode } from 'react';

type Props = {
  userData: UserData | undefined;
  children: ReactNode;
};

const Layout = ({ userData, children }: Props) => {
  return (
    <>
      <main className='h-screen'>
        <div className='flex flex-col md:flex-row justify-between md:items-center m-8 '>
          <div className=''>
            <div className='text-sm md:text-base lg:text-2xl font-normal flex flex-row items-center dark:text-gray-secondary'>
              {userData && userData.name ? userData.name : 'No user name'}
              <p className='bg-black text-white text-xs md:text-sm px-2 ml-2'>
                #{userData?.role}
              </p>
            </div>
            <p className='md:text-xs text-[10px] mt-2 dark:text-gray-secondary'>
              Start a reservation to earn and redeem points. While making a
              reservation, you will have the option to use your points on
              qualifying rentals by selecting the number of days you wish to
              redeem.
            </p>
          </div>
          {/* <div className='lg:w-[156px] md:w-[100px] w-[156px] h-[20px] lg:h-[36px] md:h-[30px] mx-auto lg:m-10 m-1'>
            <button className={`w-full main-button`}>Reserve Redeem</button>
          </div> */}
        </div>
        {children}
      </main>
    </>
  );
};

export default Layout;
