import { PASSWORD_RESET_REQUEST } from '@/graphql/mutations/users';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const RequestPage = () => {
  const router = useRouter();
  const { id, token } = router.query;
  const [email, setEmail] = useState('');

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  //Apollo Client request for Apollo Server/Prisma/MongoDB
  const [resetPasswordRequest, { loading }] = useMutation(
    PASSWORD_RESET_REQUEST,
    {
      variables: {
        email,
      },
    }
  );

  //2)
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  //3)
  const onSubmit: SubmitHandler<Inputs> = async () => {
    try {
      const {
        resetPasswordRequest: { success },
      } = (await resetPasswordRequest()).data;

      if (success)
        toast.success(
          'Password reset request has been send. Please check your email.'
        );

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
              Password Reset Request
            </h3>
            <form
              className='relative space-y-8 rounded py-2 px-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='space-y-4 mt-5'>
                <label className='inline-block w-full'>
                  <input
                    type='email'
                    placeholder='Enter your email'
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
              </div>
              <button className={`w-full main-button ${loading && 'loading'}`}>
                Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
