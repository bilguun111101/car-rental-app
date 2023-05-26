import { loggedInState } from '@/atoms/loginAtom';
import { refreshUserData } from '@/atoms/userSaved';
import Layout from '@/components/Account/Layout';
import Admin from '@/components/Account/admin/Admin';
import User from '@/components/Account/user/User';
import Spinner from '@/components/UI/Spinner';
import { GET_USER_BY_ID } from '@/graphql/queries/users';
import useGraphql from '@/hooks/useGraphql';
import { useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';

type Props = {};

const Account = (props: Props) => {
  const { getUserByID, getUserByIdLoading } = useGraphql();
  const [userData, setUserData] = useState<UserData>();
  const loggedIn = useRecoilValue(loggedInState);
  const router = useRouter();
  const [persistUserData, setPersistUserData] = useRecoilState(refreshUserData);

  const userId = Cookies.get('userId');

  const { data } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId! },
  });

  // 1) when page first renders, fetch user data from server
  useEffect(() => {
    (async () => {
      const id = Cookies.get('userId');
      const response = await getUserByID(id!);

      if (response?.email !== '') {
        setUserData({ ...response });
      }
      if (!response) toast.error('No user data found');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) when user log out, will be kicked to Home Page
  useEffect(() => {
    if (!loggedIn) router.push('/');
  }, [loggedIn, router]);

  // 3) Persisting user data when user data is changed
  useEffect(() => {
    if (persistUserData) {
      if (data?.getUserById) {
        setUserData({ ...data?.getUserById });
      }
    }
  }, [persistUserData, data]);

  if (getUserByIdLoading) return <Spinner />;

  return (
    <>
      <Layout userData={userData}>
        {userData?.role === 'admin' && <Admin userData={userData} />}
        {userData?.role === 'user' && <User userData={userData} />}
      </Layout>
    </>
  );
};

export default Account;
