import dynamic from 'next/dynamic';
import { ReactNode, useEffect } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Footer from './Footer';
// import Header from './Header';
import getLanguage from '@/utils/getLanguage';
import ScrollToTop from './ScrollToTop';

type Props = {
  children: ReactNode;
};

// Error: Text content does not match server-rendered HTML.
const Header = dynamic(() => import('./Header'), {
  ssr: false,
});

// Dynamic import resolved hydration error permanently in my case:
//https://github.com/timolins/react-hot-toast/issues/46
const Toaster = dynamic(
  () => import('react-hot-toast').then((c) => c.Toaster),
  {
    ssr: false,
  }
);

const Layout = ({ children }: Props) => {
  // 👇️ scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    (async () => {
      await getLanguage();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='bg-white dark:bg-dark-primary transition-all duration-400'>
      {/* Header */}
      <Header />
      <main className='max-w-7xl mx-auto'>{children}</main>
      <Footer />
      <ScrollToTop />
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 2000,
        }}
      />
    </div>
  );
};

export default Layout;
