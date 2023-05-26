import DownloadApp from '@/components/Home/DownloadApp';
import Progress from '@/components/Reserve/cars/Progress';
import AddExtras from '@/components/Reserve/extras/AddExtras';
import { useRouter } from 'next/router';

type Props = {};

const Extras = (props: Props) => {
  const router = useRouter();
  return (
    <div>
      {/* <Total /> */}
      <Progress />
      {/* CHOOSE VEHICLE CLASS */}
      <div className='w-full shadow p-5 dark:bg-dark-secondary'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-lg sm:text-2xl md:text-3xl font-bold leading-none dark:text-gray-secondary'>
            Нэмэлт Хэрэгсэл
          </div>
          <button
            className='btn btn-primary normal-case rounded-3xl py-2 text-white'
            onClick={() => router.push('/reserve/review&reserve')}
          >
            Үргэлжлүүлэх
          </button>
        </div>
      </div>
      {/* CENTER BODY */}
      <main className='bg-gray-primary dark:bg-dark-primary py-6 px-10 '>
        <div className=''>
          <AddExtras />
        </div>
      </main>
      <DownloadApp />
    </div>
  );
};

export default Extras;
