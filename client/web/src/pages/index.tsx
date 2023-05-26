import BestServices from '@/components/Home/BestServices';
import DownloadApp from '@/components/Home/DownloadApp';
import TopDeal from '@/components/Home/TopDeal';
import getLanguage from '@/utils/getLanguage';
import { type NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';

const Banner = dynamic(() => import('../components/Home/Banner'), {
  ssr: false,
});

const HowItWorks = dynamic(() => import('../components/Home/HowItWorks'), {
  ssr: false,
});

const Home: NextPage = () => {
  useEffect(() => {
    (async () => {
      await getLanguage();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Car rental App</title>
        <meta name='description' content='created by Leap-3 Team-2' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Banner />
      <main className='bg-white dark:bg-dark-primary'>
        <HowItWorks />
        <TopDeal />
        <BestServices />
        <DownloadApp />
      </main>
    </>
  );
};

export default Home;
