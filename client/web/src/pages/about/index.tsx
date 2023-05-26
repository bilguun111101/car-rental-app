/* eslint-disable react/no-unescaped-entities */
import DownloadApp from '@/components/Home/DownloadApp';
import ScrollToTop from '@/components/Layout/ScrollToTop';
import Tabs from '@/components/UI/Tabs';
import Image from 'next/image';

const Account = () => {
  return (
    <div>
      <Image
        width={1920}
        height={500}
        className='w-full h-full'
        src='/cars/cars_about.png'
        alt='cars'
      />
      <h1 className='text-2xl font-medium dark:text-gray-secondary'>
        Our Team
      </h1>
      <div className='flex flex-col items-center'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-20 sm:gap-2'>
          <div className='flex flex-col items-center'>
            <Image
              width={163}
              height={255}
              className='hover:scale-95 duration-200'
              src='/about/ganzo.png'
              alt='Ganzo'
            />
            <span className='mt-5 dark:text-gray-secondary'>Н.Ганзориг</span>
            <p className='text-xs dark:text-gray-secondary'>
              Багийн ахлагч, хөгжүүлэгч
            </p>
            <p className='text-xs dark:text-gray-secondary'>
              ganzorig@gmail.com
            </p>
          </div>
          <div className='flex flex-col items-center mt-6'>
            <Image
              width={163}
              height={255}
              className='hover:scale-95 duration-200'
              src='/about/mairaa.png'
              alt='Maira'
            />
            <span className='mt-6 dark:text-gray-secondary'>Майра</span>
            <p className='text-xs dark:text-gray-secondary'>Хөгжүүлэгч</p>
            <p className='text-xs dark:text-gray-secondary'>Maira@gmail.com</p>
          </div>
          <div className='flex flex-col items-center mt-10'>
            <Image
              width={181}
              height={242}
              className='hover:scale-95 duration-200'
              src='/about/temka.png'
              alt='temka'
            />
            <span className='mt-5 dark:text-gray-secondary'>Э.Тэмүүжин</span>
            <p className='text-xs dark:text-gray-secondary'>
              Дизайнер, хөгжүүлэгч
            </p>
            <p className='text-xs dark:text-gray-secondary'>
              temkasobri@gmail.com
            </p>
          </div>
          <div className='flex flex-col items-center mt-8'>
            <Image
              width={172}
              height={255}
              className='hover:scale-95 duration-200'
              src='/about/lkhagva.png'
              alt='lkhagva'
            />
            <span className='mt-5 dark:text-gray-secondary'>Лхагвасүрэн</span>
            <p className='text-xs dark:text-gray-secondary'>Хөгжүүлэгч</p>
            <p className='text-xs dark:text-gray-secondary'>
              Lkhagva@gmail.com
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <Image
              width={170}
              height={274}
              className='hover:scale-95 duration-200'
              src='/about/bilguun1.png'
              alt='bilguun'
            />
            <span className='mt-6 dark:text-gray-secondary'>Б.Билгүүн</span>
            <p className='text-xs dark:text-gray-secondary'>Хөгжүүлэгч</p>
            <p className='text-xs dark:text-gray-secondary'>
              Bilguun@gmail.com
            </p>
          </div>
        </div>
        <div className='w-full mt-20 flex flex-col items-center'>
          <div className='w-full h-[1.5px] bg-gray-300'></div>
          <h2 className='mt-10 text-xl font-semibold dark:text-gray-secondary'>
            Бидний тухай
          </h2>
          <p className='mt-10 p-4 text-xs tracking-wide leading-6 dark:text-gray-secondary'>
            2022 оны 2-р сараас эхлэн Нэст Академид анх манай багийн гишүүд,
            бусад суралцагч нарын хамт нийтдээ 24-үүлээ сурч эхэлсэн бөгөөд
            өдгөө бүтэн нэг жил гаран хугацааг программ хөгжүүлэгч болохоор
            зарцуулжээ. Хамгийн анх програмчлалын үндэс сурч эхэлснээр, цаашлаад
            HTML5, CSS3, Javascript, React, MUI, Tailwind CSS, React Native,
            NextJs, Google Firebase, NodeJs, Express, MongoDb, Graphql, AWS гэх
            мэт олон олон технологиудыг сурч судлан, туршилтын төслүүдийг
            хийсээр ирсэн билээ. Өнөөг хүртэл туслаж, дэмжиж өөрт байгаа
            мэдлэгээ харамгүй зааж сургасан нийт Leap хөтөлбөрийн багш нартаа
            баярласан талархсанаа илэрхийлж байна. Цаашид энэ мэргэжлээрээ улам
            их шинэ төслүүдийг амжилттайгаар хийж бүтээх ирмүүн их хүсэлтэй
            залуучууд бэлтгэгдэн гарч байгаад баяртай байна. Бид бүхний
            сургалтын хөтөлбөр энэ хүрээд дуусч байгаа боловч суралцах үйл явц
            насан туршид минь үргэлжлэх болно. Багийнхаа нийт гишүүд, бусад хамт
            суралцагсад нартаа бүгдэд нь хосгүй их амжилтыг хүсье.
          </p>
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='m-10 font-medium  text-red-primary'>
            Top Rated Car Rental
          </h1>
          <Tabs />
        </div>
      </div>
      <DownloadApp />
      <ScrollToTop />
    </div>
  );
};

export default Account;
