import { PASSWORD_RESET } from '@/graphql/mutations/users';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const ResetPage = () => {
  const router = useRouter();
  const { id, token } = router.query;

  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  });

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  //Apollo Client request for Apollo Server/Prisma/MongoDB
  const [resetPassword, { loading }] = useMutation(PASSWORD_RESET, {
    variables: {
      token,
      password: passwords.password,
      userId: id,
    },
  });

  //2)
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  //3)
  const onSubmit: SubmitHandler<Inputs> = async () => {
    const { password, confirmPassword } = passwords;

    if (password !== confirmPassword) {
      console.log('"works fine"');
      toast.error('Passwords does not match');
      return;
    }

    try {
      const {
        resetPassword: { success },
      } = (await resetPassword()).data;

      if (success) toast.success('Password reset is successful.');

      console.log(success);
      ////////////////////
      router.push('/');
    } catch (error: any) {
      const errors = new Error(error);
      toast.error(errors.message);
      return;
    }
  };

  return (
    <div className='max-w-[200px] flex flex-col items-center justify-center mx-auto h-screen'>
      {/* <p>UserId: {id}</p>
    <p>Token: {token}</p> */}
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <div className='w-full'>
            <h3 className='text-lg font-boldtext-lg md:text-2xl font-bold text-center'>
              Password Reset
            </h3>
            <form
              className='relative space-y-8 rounded py-2 px-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='space-y-4 mt-5'>
                <label className='inline-block w-full'>
                  <input
                    type='password'
                    placeholder='Enter your password'
                    className={`input w-full bg-red-100 ${
                      errors.password && 'border-b-2 border-orange-500 '
                    }`}
                    onChange={onChangeHandler}
                    id='password'
                    required
                  />
                  {errors.password && (
                    <p className='p-1 text-[13px] font-light  text-orange-500'>
                      Please enter a valid password.
                    </p>
                  )}
                </label>
              </div>
              <div className='space-y-4 mt-5'>
                <label className='inline-block w-full'>
                  <input
                    type='password'
                    placeholder='Confirm your password'
                    className={`input w-full bg-red-100 ${
                      errors.password && 'border-b-2 border-orange-500 '
                    }`}
                    onChange={onChangeHandler}
                    id='confirmPassword'
                    required
                  />
                  {errors.password && (
                    <p className='p-1 text-[13px] font-light  text-orange-500'>
                      Please enter a valid password.
                    </p>
                  )}
                </label>
              </div>
              <button className={`w-full main-button ${loading && 'loading'}`}>
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
