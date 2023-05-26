import useGraphql from '@/hooks/useGraphql';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { loggedInState } from '../../atoms/loginAtom';
import Spinner from '../UI/Spinner';

type Props = {};

const SignUp = (props: Props) => {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [selectValue, setSelectValue] = useState('user');
  const [formData, setFormData] = useState<createUserFormType>({
    email: '',
    password: '',
    role: '',
  });

  const { signUp, createUserLoading: loading } = useGraphql();

  const { email, password, role } = formData;

  //2) Setting email and password
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
      role: selectValue,
    }));
  };

  // 3) Create new user
  const onSubmit: SubmitHandler<Inputs> = async () => {
    const response = await signUp(email, password, role);

    if (response) {
      setLoggedIn(true);
      toast.success('Successfully signed.');
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <input type='checkbox' id='signup' className='modal-toggle' />
      <div className='modal modal-middle'>
        <div className='modal-box dark:bg-dark-secondary dark:border'>
          <h3 className='text-lg md:text-2xl font-bold text-center uppercase dark:text-gray-secondary'>
            Бүртгүүлэх
          </h3>
          <label
            htmlFor='signup'
            className='btn-sm btn-circle btn absolute right-2 top-2 dark:bg-gray-secondary dark:text-black'
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
                  //   placeholder='Email'
                  className={`input w-full bg-red-100 ${
                    errors.email && 'border-b-2 border-orange-500 '
                  }`}
                  // {...register('email', { required: true })}
                  id='email'
                  required
                  onChange={onChangeHandler}
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
                  // {...register('password', { required: true })}
                  //   placeholder='Password'
                  id='password'
                  required
                  className={`input w-full bg-red-100  ${
                    errors.password && 'border-b-2 border-orange-500'
                  }`}
                  onChange={onChangeHandler}
                />
                {errors.password && (
                  <p className='p-1 text-[13px] font-light  text-orange-500'>
                    Your password must contain between 4 and 60 characters.
                  </p>
                )}
              </label>
              <label className='inline-block w-full'>
                <label className='label'>
                  <span className='label-text dark:text-gray-secondary'>
                    Түрээслэгч эсвэл түрээслүүлэгч?
                  </span>
                </label>
                <div className='w-full overflow-hidden'>
                  <select
                    className='select w-full bg-red-100 dark:bg-dark-primary dark:text-gray-secondary'
                    defaultValue=''
                    onChange={(e) => setSelectValue(e.target.value)}
                  >
                    <option selected value='user'>
                      Түрээслэгч
                    </option>
                    <option value='admin'>түрээслүүлэгч</option>
                  </select>
                </div>
              </label>
            </div>
            <button className={`w-full main-button ${loading && 'loading'}`}>
              Бүртгүүлэх
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
