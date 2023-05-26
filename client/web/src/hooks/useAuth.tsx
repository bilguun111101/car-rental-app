import { loggedInState } from '@/atoms/loginAtom';
import { CHECK_TOKEN } from '@/graphql/queries/users';
import { useLazyQuery } from '@apollo/client';
import { ReactNode, createContext, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';
import Cookies from 'js-cookie';

const AuthContext = createContext({ loading: false });

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const setLoggedIn = useSetRecoilState(loggedInState);
  const [checkToken, { loading }] = useLazyQuery(CHECK_TOKEN);

  // keep logged in when refresh
  useEffect(() => {
    const token = Cookies.get('token');

    (async () => {
      try {
        const data = await checkToken({
          variables: {
            token,
          },
        });

        if (!data.data) return toast.error('You are not logged in.');

        const success = data?.data?.checkToken as any;

        if (!success) {
          setLoggedIn(false);
          return;
        }

        setLoggedIn(true);
      } catch (error: any) {
        console.log('ERROR with getAllCarsByPassengers', error);
        const errors = new Error(error);
        toast.error(errors?.message);
      }
    })();
  }, [checkToken, setLoggedIn]);

  const value = {
    loading: loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
