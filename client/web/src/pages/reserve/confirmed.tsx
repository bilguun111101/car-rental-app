import DownloadApp from '@/components/Home/DownloadApp';
import Spinner from '@/components/UI/Spinner';
import useGraphql from '@/hooks/useGraphql';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Checklist = [
  'Машин авах, өгөх газраа сайн мэддэг байх',
  'Жолооны үнэмлэхтэйгээ заавал ирэх.',
  '18-аас дээш насны байх',
];

const Confirmed = () => {
  const router = useRouter();
  const { getUserByID, getUserByIdLoading } = useGraphql();
  const [userData, setUserData] = useState<UserData>();
  const [rentalData, setRentalData] = useState<RentalType>();
  const totalExtras =
    rentalData?.extras &&
    Object.values(rentalData?.extras!).filter((el) => el === true).length;
  const extrasCost = rentalData?.extras && totalExtras! * totalExtras! * 4;
  const eachExtraCost = rentalData?.extras && totalExtras! * 4;

  const salesTax = rentalData?.totalDays! * rentalData?.car?.price! * 0.1;
  const summaryCost =
    rentalData?.totalDays! * rentalData?.car?.price! + salesTax + extrasCost!;

  // when page first renders, fetch data from server
  useEffect(() => {
    (async () => {
      const id = Cookies.get('userId');
      const response = await getUserByID(id!);

      console.log(response);
      if (response?.email !== '') {
        setUserData({ ...response });
        setRentalData(response?.rentals[response?.rentals.length - 1]);
      }
      if (!response) toast.error('No user data found');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(rentalData);
  if (getUserByIdLoading) return <Spinner />;

  return (
    <section className='w-full flex flex-col gap-y-[30px] gap-[30px]'>
      <div className='w-full py-[20px] px-2'>
        <div className='flex-col md:flex-row md:flex flex-wrap md:justify-between w-full items-center'>
          <div className='flex gap-x-[20px]'>
            <Image
              width={35}
              height={35}
              src='/logos/confirmation.png'
              className='object-contain'
              alt='comfirmed'
            />
            <div className='flex-col gap-y-[10px] max-w-[326px] flex-wrap'>
              <h1 className='font-semibold text-[25px] dark:text-gray-secondary duration-300'>
                Захиалга баталгаажлаа
              </h1>
              <p className='font-normal dark:text-gray-secondary duration-300 text-[10px]'>
                Thanks {userData?.name}! We look forward to seeing you on{' '}
                {rentalData?.dateRent} Confirmation Number: 12345678
              </p>
            </div>
          </div>
          <div className='min-w-[220px] max-w-[220px] duration-300 md:mr-[10px] ml-[100px] md:ml-[200px] relative'>
            <Image
              width={100}
              height={100}
              src={rentalData?.car.image!}
              className='object-contain w-full'
              alt='car'
            />
          </div>
        </div>
        <div className='border border-[#E5E7E9] relative flex w-full h-auto'>
          <button className='absolute w-[30px] h-[30px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-[5px] rounded-full'>
            <Image
              width={100}
              height={100}
              src='/icons/right-arrow.png'
              className='w-full object-contain'
              alt='arrow-right'
            />
          </button>
          <div className='py-[15px] pl-[30px] sm:w-1/2 w-full border-r border-r-[#E5E7E9]'>
            <h4 className='font-semibold text-[12px] dark:text-gray-secondary duration-300 flex flex-col gap-[7px]'>
              АВАХ
            </h4>
            <div className='max-w-[250px] flex-wrap'>
              <p className='text-[#3E3E3E] text-normal text-[12px] dark:text-gray-secondary'>
                {rentalData?.location}
              </p>
              <p className='text-[#777777] font-medium text-[11px] dark:text-gray-secondary'>
                {rentalData?.dateRent}
              </p>
            </div>
          </div>
          <div className='py-[15px] pl-[30px] sm:w-1/2 w-full'>
            <h4 className='font-semibold text-[12px] dark:text-gray-secondary duration-300 flex flex-col gap-[7px]'>
              ӨГӨХ
            </h4>
            <div className='max-w-[250px] flex-wrap'>
              <p className='text-[#3E3E3E] text-normal text-[12px] dark:text-gray-secondary'>
                {rentalData?.location}
              </p>
              <p className='text-[#777777] font-medium text-[11px] dark:text-gray-secondary'>
                {rentalData?.dateReturn}
              </p>
            </div>
          </div>
        </div>
        {/* <div className='py-[25px] flex items-center justify-between sm:flex-row flex-col gap-[15px]'>
          <p className='font-normal text-[12px] dark:text-gray-secondary duration-300 text-center'>
            A confirmation email has been sent to the email address provided.
          </p>
          <div className='flex items-center gap-[20px]'>
            <button className='px-[25px] py-[10px] rounded-[30px] bg-[#FF3002] border-2 border-[#FF3002] text-white text-[10px] font-medium'>
              Modify Reservation
            </button>
            <button className='px-[25px] py-[10px] rounded-[30px] bg-[#FFF] border-2 border-[#FF3002] text-[10px] font-medium text-[#FF3002]'>
              Cancel Reservation
            </button>
          </div>
        </div> */}
      </div>

      <div className='pt-[30px] flex flex-col gap-[30px] sm:flex-row'>
        <div className='w-full h-auto p-[30px] flex flex-col gap-[25px] items-start'>
          <h1 className='font-semibold text-[20px] dark:text-gray-secondary'>
            Захиалгын дэлгэрэнгүй
          </h1>
          <div className='w-full flex flex-col gap-[25px]'>
            <div className='pb-[5px] border-b border-[#959595]'>
              <h4 className='font-semibold text-base dark:text-gray-secondary'>
                Захиалагч
              </h4>
            </div>
            <div className='flex flex-col gap-[12px]'>
              <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'>
                Жолоочийн нэр: <strong>{userData?.name}</strong>
              </h4>
              <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'>
                Имэйл: <strong>{userData?.email}</strong>
              </h4>
              <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'>
                Утас: <strong>{userData?.phone}</strong>
              </h4>
              <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'>
                Нас: <strong>{userData?.age}</strong>
              </h4>
            </div>
          </div>

          <div className='w-full flex flex-col gap-[25px]'>
            <div className='pb-[5px] border-b border-[#959595]'>
              <h4 className='font-semibold text-base dark:text-gray-secondary'>
                Машин
              </h4>
            </div>
            <div className='flex flex-col gap-[12px]'>
              <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary '>
                Ангилал: <strong>{rentalData?.car?.model}</strong>
              </h4>
              <ul className='pl-[30px]'>
                <li className='font-normal list-disc text-base text-[#3E3E3E] dark:text-gray-secondary'>
                  {rentalData?.car?.transmission}
                </li>
                <li className='font-normal list-disc text-base text-[#3E3E3E] dark:text-gray-secondary'>
                  {rentalData?.car?.type === 'Bus' ? '1' : '4'} хаалга
                </li>
                <li className='font-normal list-disc text-base text-[#3E3E3E] dark:text-gray-secondary'>
                  {rentalData?.car?.passengers} зорчигч
                </li>
              </ul>
              <div className='w-full flex justify-between items-center'>
                <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'>
                  Time & Distance {rentalData?.totalDays} Day(s) @ ${' '}
                  {rentalData?.car?.price} / өдөр
                </h4>
                <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'>
                  $ {rentalData?.totalDays! * rentalData?.car?.price!}.00
                </h4>
              </div>
              <div className='w-full flex justify-between items-center'>
                <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'>
                  Хязгааргүй км
                </h4>
                <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'>
                  Багтсан
                </h4>
              </div>
              <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'></h4>
            </div>
          </div>

          <div className='w-full flex flex-col gap-[25px]'>
            <div className='pb-[5px] border-b border-[#959595]'>
              <h4 className='font-semibold text-base dark:text-gray-secondary'>
                Нэмэлт
              </h4>
            </div>

            <div className='flex flex-col gap-[12px]'>
              <div className='w-full flex justify-between items-start'>
                <div>
                  <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'>
                    {rentalData?.extras.GPS && 'GPS'}
                  </h4>
                  <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'>
                    {rentalData?.extras.child_safety && 'Хүүхдийн суудал'}
                  </h4>
                  <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'>
                    {rentalData?.extras.coverage && 'Даатгал'}
                  </h4>
                </div>
                <div>
                  {rentalData?.extras &&
                    Object.values(rentalData?.extras!)
                      .filter((el) => el === true)
                      .map((el, i) => (
                        <h4
                          key={i}
                          className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'
                        >
                          $ {eachExtraCost}.00
                        </h4>
                      ))}
                </div>
              </div>
            </div>
          </div>

          <div className='w-full flex flex-col gap-[25px]'>
            <div className='pb-[5px] border-b border-[#959595]'>
              <h4 className='font-semibold text-base dark:text-gray-secondary'>
                Татвар & Зардал
              </h4>
            </div>
            <div className='flex flex-col gap-[12px]'>
              <div className='w-full flex justify-between items-center'>
                <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'>
                  НӨАТ татвар (10.0%)
                </h4>
                <h4 className='font-normal text-base text-[#3E3E3E] dark:text-gray-secondary'>
                  $ {salesTax}.00
                </h4>
              </div>
            </div>
          </div>

          <div className='w-full flex flex-col gap-[25px]'>
            <div className='pb-[5px] border-b border-[#959595]'>
              <h4 className='font-semibold text-base dark:text-gray-secondary'>
                НИЙТ ДҮН
              </h4>
            </div>
            <div className='flex flex-col gap-[12px]'>
              <div className='w-full flex justify-between items-center'>
                <div className='flex flex-col gap-[10px]'>
                  <h5 className='font-normal text-[#404040] dark:text-gray-secondary text-[12px]'>
                    Estimated Total due at the counter
                  </h5>
                  <p className='font-normal text-[10px] text-black dark:text-gray-secondary max-w-[321px]'>
                    Rates, taxes and fees do not reflect rates, taxes and fees
                    applicable to non-included optional caverages or extras
                    added later.
                  </p>
                </div>
                <h1 className='font-medium text-[18px] text-black dark:text-gray-secondary flex items-center'>
                  $ <strong className='text-[28px]'>{summaryCost}.00</strong>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full sm:w-[683px] flex flex-col gap-[17px] px-[5px]'>
          <button
            className='w-full text-center py-[10px] rounded-[30px] border-2 border-[#FF3002] text-[#FF3002] text-[10px] font-medium dark:bg-red-primary dark:text-white hover:bg-red-primary hover:text-white dark:hover:bg-transparent dark:hover:text-red-primary'
            onClick={() => router.push('/')}
          >
            Өөр захиалга үүсгэх
          </button>
          <div className='px-[20px] py-[25px] flex flex-col gap-[24px]'>
            <h1 className='font-semibold text-[16px] text-[#303030] dark:text-gray-secondary'>
              Захиалгын сануулга
            </h1>
            {Checklist.map((text, idx) => (
              <div className='flex gap-[10px] items-center' key={idx}>
                <Image
                  width={100}
                  height={100}
                  className='w-[20px] h-[20px]'
                  src='/logos/confirmation.png'
                  alt='confirmation'
                />
                <p className='font-normal text-[10px] text-[#525252] dark:text-gray-secondary'>
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className='px-[30px] py-[17px] flex flex-col gap-[15px]'>
            <div className='flex items-center gap-[10px]'>
              <Image
                width={100}
                height={100}
                className='w-[26px] h-[29]'
                src='/icons/location.png'
                alt='location'
              />
              <p className='font-medium text-[12px] text-[#616161] dark:text-gray-secondary'>
                Khan-Uul district 17 Ulaanbaatar, Mongolia
              </p>
            </div>
            <div className='flex items-center gap-[10px]'>
              <Image
                width={100}
                height={100}
                className='w-[26px] h-[29]'
                src='/icons/phone.png'
                alt='phone'
              />
              <p className='font-medium text-[12px] text-[#616161] dark:text-gray-secondary'>
                +976 99022052
              </p>
            </div>
            <div className='flex items-center gap-[10px]'>
              <Image
                width={100}
                height={100}
                className='w-[26px] h-[29]'
                src='/icons/email.png'
                alt='email'
              />
              <p className='font-medium text-[12px] text-[#616161] dark:text-gray-secondary'>
                info@carrent.mn
              </p>
            </div>
            <div className='flex items-center gap-[10px]'>
              <Image
                width={100}
                height={100}
                className='w-[26px] h-[29]'
                src='/icons/clock.png'
                alt='clock'
              />
              <p className='font-medium text-[12px] text-[#616161] dark:text-gray-secondary'>
                Дав - Баа 08:00 - 18:00
              </p>
            </div>
            <Image
              width={100}
              height={100}
              className='w-[322px] h-[322px]'
              src='/test-map.png'
              alt='map'
            />
          </div>
        </div>
      </div>
      <DownloadApp />
    </section>
  );
};

export default Confirmed;
