import { languageAtomState } from '@/atoms/languageAtom';
import { useAuth } from '@/hooks/useAuth';
import useLanguage from '@/hooks/useLanguage';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loggedInState } from '../../atoms/loginAtom';
import SignIn from '../Modal/SignIn';
import SignUp from '../Modal/SignUp';
import DarkModeButton from '../UI/DarkModeButton';
import Spinner from '../UI/Spinner';

const Header = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const setLanguageChange = useSetRecoilState(languageAtomState);
  const { loading } = useAuth();
  const [navbar, setNavbar] = useState(false);
  const [flag, setFlag] = useState({
    eng: false,
    mn: false,
  });
  const [
    bookTxt,
    aboutUsTxt,
    contactTxt,
    accountTxt,
    signinTxt,
    signupTxt,
    logoutTxt,
  ] = useLanguage([
    'bookTxt',
    'aboutTxt',
    'contactTxt',
    'accountTxt',
    'signinTxt',
    'signupTxt',
    'logoutTxt',
  ]);

  const changeBackground = () => {
    if (window.scrollY >= 20) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  // header background change when scroll down
  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener('scroll', changeBackground);

    return () => window.removeEventListener('scroll', changeBackground);
  });

  if (loading) return <Spinner />;

  return (
    <div
      className={`sticky top-0 z-50 flex flex-row items-center justify-between py-2 px-2 dark:!bg-dark-secondary ${
        navbar && 'bg-white shadow-md'
      } transition-all duration-700 dark:bg-slate-800`}
    >
      {/* LEFT */}
      <div className='cursor-pointer' onClick={() => router.push('/')}>
        <div className='flex items-center space-x-2'>
          <Image
            src='/logo.png'
            width={30}
            height={30}
            className='object-contain sm:h-10 sm:w-10 md:h-12 md:w-16'
            alt='logo'
          />
          <div className=''>
            <p className='text-xs font-[500] sm:text-sm sm:leading-3 dark:text-gray-secondary'>
              CAR RENTAL
            </p>
            <p className='text-[10px] dark:text-gray-secondary'>Need a car?</p>
          </div>
        </div>
      </div>

      {/* Center Menu */}
      <div className='hidden md:flex items-center justify-between space-x-4'>
        <div
          className={`border-b-2 cursor-pointer text-sm dark:text-white ${
            router.pathname === '/'
              ? 'border-red-primary border-b-2'
              : 'border-transparent hover:border-red-primary'
          }`}
        >
          <Link href='/'>{bookTxt}</Link>
        </div>
        <div
          className={`border-b-2 cursor-pointer text-sm dark:text-white ${
            router.pathname === '/about'
              ? 'border-red-primary border-b-2'
              : 'border-transparent hover:border-red-primary'
          }`}
        >
          <Link href='/about'>{aboutUsTxt}</Link>
        </div>
        {loggedIn && (
          <div
            className={`border-b-2 cursor-pointer text-sm dark:text-white ${
              router.pathname === '/account'
                ? 'border-red-primary border-b-2'
                : 'border-transparent hover:border-red-primary'
            }`}
          >
            <Link href='/account'>{accountTxt}</Link>
          </div>
        )}

        <div
          className={`border-b-2 cursor-pointer text-sm dark:text-white ${
            router.pathname === '/contact'
              ? 'border-red-primary border-b-2'
              : 'border-transparent hover:border-red-primary'
          }`}
        >
          <Link href='/contact'>{contactTxt}</Link>
        </div>
      </div>

      {/* menu for mobile device */}
      <div className='flex-none md:hidden'>
        <div className='dropdown'>
          <label tabIndex={0} className='m-1 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-5 h-5 stroke-current dark:text-white'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44'
          >
            <li className='text-sm '>
              <Link href='/'>{bookTxt}</Link>
            </li>
            <li className='text-sm '>
              <Link href='/about'>{aboutUsTxt}</Link>
            </li>

            {loggedIn && (
              <li className='text-sm '>
                <Link href='/account'>{accountTxt}</Link>
              </li>
            )}

            <li className='text-sm '>
              <Link href='/contact'>{contactTxt}</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* for MOBILE DEVICES */}
      <div className='flex items-center justify-end space-x-2'>
        <div className='flex-none sm:hidden'>
          <ul className='menu menu-horizontal px-1 items-center'>
            <div className='mr-2'>
              <DarkModeButton />
            </div>
            {flag.mn ? (
              <div
                onClick={() => {
                  setFlag({ eng: true, mn: false });
                  setLanguageChange('eng');
                }}
              >
                <Image
                  src='/mgl.png'
                  height={20}
                  width={20}
                  alt='flag'
                  priority
                  className='mr-2 sm:mr-0'
                />
              </div>
            ) : (
              <div
                onClick={() => {
                  setFlag({ eng: false, mn: true });
                  setLanguageChange('mn');
                }}
              >
                <Image
                  src='/eng.png'
                  height={30}
                  width={30}
                  alt='flag'
                  priority
                  className='ml-2'
                />
              </div>
            )}
            <li tabIndex={0} className=''>
              <a className='dark:text-white bg-red-primary'>
                <UserPlusIcon className='h-4 text-white' />
                <svg
                  className='fill-current text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                >
                  <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
                </svg>
              </a>
              <ul className='p-2 bg-base-100 w-full items-center'>
                <div className='divider m-0' />
                {!loggedIn ? (
                  <>
                    <label
                      htmlFor='signup'
                      className='text-[10px] p-2 py-0 normal-case'
                    >
                      {signupTxt}
                    </label>
                    <div className='divider m-0' />
                    <label
                      htmlFor='signin'
                      className='text-[10px] p-2 py-0 normal-case'
                    >
                      {signinTxt}
                    </label>
                  </>
                ) : (
                  <button
                    className='btn text-white ml-2 dark:!bg-dark-secondary '
                    onClick={() => {
                      setLoggedIn(false);
                      Cookies.remove('token');
                      Cookies.remove('userId');
                    }}
                  >
                    {logoutTxt}
                  </button>
                )}
              </ul>
            </li>
          </ul>
        </div>
        {/* for BIGGER SCREENS */}
        <div className='hidden sm:flex sm:flex-row sm:items-center'>
          <DarkModeButton />
          {flag.mn ? (
            <div
              onClick={() => {
                setFlag({ eng: true, mn: false });
                setLanguageChange('eng');
              }}
            >
              <Image
                src='/mgl.png'
                height={30}
                width={30}
                alt='flag'
                priority
                className='ml-2'
              />
            </div>
          ) : (
            <div
              onClick={() => {
                setFlag({ eng: false, mn: true });
                setLanguageChange('mn');
              }}
            >
              <Image
                src='/eng.png'
                height={30}
                width={30}
                alt='flag'
                priority
                className='ml-2'
              />
            </div>
          )}
          {!loggedIn ? (
            <>
              <label
                htmlFor='signup'
                className='btn-ghost btn dark:text-white normal-case'
              >
                {signupTxt}
              </label>
              <label htmlFor='signin' className='main-button'>
                {signinTxt}
              </label>
            </>
          ) : (
            <button
              className='btn text-white ml-2 uppercase dark:!bg-dark-secondary dark:border-gray-secondary'
              onClick={() => {
                setLoggedIn(false);
                Cookies.remove('token');
                Cookies.remove('userId');
              }}
            >
              {logoutTxt}
            </button>
          )}
        </div>
      </div>

      {<SignUp />}
      {<SignIn />}
    </div>
  );
};

export default Header;
