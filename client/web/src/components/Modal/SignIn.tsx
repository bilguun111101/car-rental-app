import useGraphql from '@/hooks/useGraphql';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { loggedInState } from '../../atoms/loginAtom';
import Spinner from '../UI/Spinner';

type Props = {};

const SignIn = (props: Props) => {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const router = useRouter();

  //react hook form
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [formData, setFormData] = useState<loginUserFormType>({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  // 2) getting user data from MONGODB using Apollo Client
  const { login, loginUserLoading: loading } = useGraphql();

  //3) Getting inputs
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  //4)
  const onSubmit: SubmitHandler<Inputs> = useCallback(async () => {
    const response = await login(email, password);

    if (response) {
      toast.success('Successfully signed.');
      setLoggedIn(true);
    }
  }, [email, login, password, setLoggedIn]);

  //If press click here button
  const goToPasswordRequestPage = () => {
    router.push('/password/request');
  };

  if (loading) return <Spinner />;

  return (
    <>
      <input type='checkbox' id='signin' className='modal-toggle' />
      <div className='modal modal-middle'>
        <div className='modal-box dark:bg-dark-secondary dark:border'>
          <h3 className='text-lg font-boldtext-lg md:text-2xl font-bold text-center uppercase dark:text-gray-secondary'>
            Нэвтрэх
          </h3>
          <label
            htmlFor='signin'
            className='btn-sm btn-circle btn absolute right-2 top-2 dark:bg-gray-secondary dark:text-black'
            // onClick={() => setCloseModal(false)}
          >
            ✕
          </label>

          <form
            className='relative space-y-8 rounded py-2 px-6'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='space-y-4'>
              <label className='inline-block w-full'>
                <label className='label'>
                  <span className='label-text dark:text-gray-secondary'>
                    Имэйл
                  </span>
                </label>
                <input
                  type='email'
                  className={`input w-full bg-red-100 ${
                    errors.email && 'border-b-2 border-orange-500 '
                  }`}
                  onChange={onChangeHandler}
                  id='email'
                  required
                />
                {errors.email && (
                  <p className='p-1 text-[13px] font-light  text-orange-500'>
                    Please enter a valid email.
                  </p>
                )}
              </label>
              <label className='inline-block w-full'>
                <label className='label'>
                  <span className='label-text dark:text-gray-secondary'>
                    Нууц үг
                  </span>
                </label>
                <input
                  type='password'
                  className={`input w-full bg-red-100 ${
                    errors.password && 'border-b-2 border-orange-500'
                  }`}
                  onChange={onChangeHandler}
                  id='password'
                  required
                />
                {errors.password && (
                  <p className='p-1 text-[13px] font-light  text-orange-500'>
                    Your password must contain between 4 and 60 characters.
                  </p>
                )}
              </label>
            </div>
            <button className={`w-full main-button ${loading && 'loading'}`}>
              Нэвтрэх
            </button>
          </form>
          <div className='flex flex-row items-center justify-center mt-5'>
            <p className='text-[gray]'>Нууц үгээ мартсан уу?</p>
            <button
              className='cursor-pointer font-semibold hover:underline ml-1 text-red-400'
              onClick={goToPasswordRequestPage}
              type='submit'
            >
              Энд дар
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
