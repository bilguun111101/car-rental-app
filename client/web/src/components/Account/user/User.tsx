import { generateReactHelpers } from '@uploadthing/react';
import { useEffect, useState } from 'react';
import type { OurFileRouter } from '../../../pages/api/server/uploadthing';
import ProfileInputs from '../ProfileInputs';
import RentalInputs from './RentalInputs';
import Cookies from 'js-cookie';
import useGraphql from '@/hooks/useGraphql';
import Spinner from '@/components/UI/Spinner';
import { toast } from 'react-hot-toast';
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

type Props = { userData: UserData | undefined };

const UserPage = ({ userData }: Props) => {
  const [toggle, setToggle] = useState(1);
  const [rentalData, setRentalData] = useState<RentalDataType[]>([]);

  const toggleTab = (index: number) => {
    setToggle(index);
  };

  const { getOwnRentalsById, getUserByIdLoading } = useGraphql();

  // 1) when page first renders, fetch user data from server
  useEffect(() => {
    (async () => {
      const id = Cookies.get('userId');
      const response = await getOwnRentalsById(id!);

      if (response) {
        setRentalData([...response]);
      }
      if (!response) toast.error('No user data found');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (getUserByIdLoading) return <Spinner />;

  return (
    <>
      <div className='mx-auto p-5 flex flex-col items-center'>
        <div className='lg:w-1/3 md:w-1/3 w-2/3 mx-auto h-[40px] bg-[#393939]  rounded-xl flex justify-center items-center'>
          <div className='w-5/6 mx-auto h-[35px] flex flex-row items-center px-[3xl] rounded-xl shadow-2xl  transition bg-[#393939] cursor-pointer'>
            <div
              className={
                toggle === 1
                  ? 'tabs active-tabs bg-[#ff2f01] w-1/2 h-full rounded-xl flex items-center justify-center '
                  : 'tabs w-1/2 flex items-center justify-center'
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
                  ? 'tabs active-tabs bg-[#ff2f01] w-1/2 h-full rounded-xl flex items-center justify-center'
                  : 'tabs w-1/2 flex items-center justify-center'
              }
              onClick={() => toggleTab(2)}
            >
              <span className='text-white text-xs lg:text-base md:text-sm'>
                Захиалгууд
              </span>
            </div>
          </div>
        </div>
        <div className='mt-6 p-5 w-2/3'>
          {toggle === 1 && <ProfileInputs userData={userData} />}
        </div>
        <div className='w-2/3'>
          {toggle === 2 && <RentalInputs rentalData={rentalData} />}
        </div>
      </div>
    </>
  );
};
export default UserPage;

//https://www.youtube.com/watch?v=7lhUsK-FxYI&t=259s
