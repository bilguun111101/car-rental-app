import {
  CREATE_CAR,
  DELETE_CAR_BY_ID,
  UPDATE_CAR_BY_ID,
} from '@/graphql/mutations/cars';
import { CREATE_RENTAL } from '@/graphql/mutations/rentals';
import {
  CREATE_NEW_USER,
  DELETE_USER_BY_ID,
  LOGIN_USER,
  UPDATE_USER_BY_ID,
} from '@/graphql/mutations/users';
import {
  GET_ALL_CARS_WITH_PAGINATION,
  GET_CARS_BY_PASSENGERS,
  GET_CARS_BY_PRICE,
  GET_CARS_BY_TYPE,
  GET_CAR_BY_ID,
  GET_OWN_CARS_BY_ID,
} from '@/graphql/queries/cars';
import { GET_OWN_RENTALS } from '@/graphql/queries/rentals';
import { GET_USER_BY_ID } from '@/graphql/queries/users';
import { useLazyQuery, useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const useGraphql = () => {
  const userId = Cookies.get('userId');

  // USER QUERIES
  const [getUserById, { loading: getUserByIdLoading }] = useLazyQuery(
    GET_USER_BY_ID,
    {
      pollInterval: 100,
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only',
    }
  );

  // USER MUTATIONS
  const [createNewUser, { loading: createUserLoading }] =
    useMutation(CREATE_NEW_USER);

  const [loginUser, { loading: loginUserLoading }] = useMutation(LOGIN_USER);
  const [updateUserById, { loading: updateUserLoading }] =
    useMutation(UPDATE_USER_BY_ID);

  const [deleteUserById, { loading: deleteUserByIdLoading }] =
    useMutation(DELETE_USER_BY_ID);

  // CARS QUERIES
  const [getCarsByPagination, { loading: getCarsByPageLoading }] = useLazyQuery(
    GET_ALL_CARS_WITH_PAGINATION,
    { pollInterval: 500 }
  );

  const [getCarsByPassengers, { loading: getCarsByPassengerLoading }] =
    useLazyQuery(GET_CARS_BY_PASSENGERS, { pollInterval: 500 });

  const [getCarsByType, { loading: getCarsByTypeLoading }] = useLazyQuery(
    GET_CARS_BY_TYPE,
    { pollInterval: 500 }
  );

  const [getCarsByPrice, { loading: getCarsByPriceLoading }] =
    useLazyQuery(GET_CARS_BY_PRICE);

  const [getOwnCarsById, { loading: getOwnCarsLoading }] = useLazyQuery(
    GET_OWN_CARS_BY_ID,
    {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only',
    }
  );

  const [getCarById, { loading: getCarByIdLoading }] = useLazyQuery(
    GET_CAR_BY_ID,
    {
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'no-cache',
    }
  );

  // CARS MUTATIONS
  const [createCar, { loading: createCarLoading }] = useMutation(CREATE_CAR);
  const [deleteCar, { loading: deleteCarLoading }] = useMutation(
    DELETE_CAR_BY_ID,
    { refetchQueries: [{ query: GET_OWN_CARS_BY_ID, variables: { userId } }] }
  );
  const [updateCar, { loading: updateCarLoading }] =
    useMutation(UPDATE_CAR_BY_ID);

  // RENTALS QUERIES
  const [getOwnRentals, { loading: getOwnRentalsLoading }] = useLazyQuery(
    GET_OWN_RENTALS,
    { pollInterval: 500 }
  );

  // RENTALS MUTATIONS
  const [createRental, { loading: createRentalLoading }] =
    useMutation(CREATE_RENTAL);

  //============================================================
  const signUp = async (email: string, password: string, role: string) => {
    try {
      const response = (
        await createNewUser({
          variables: {
            email,
            password,
            role,
          },
        })
      ).data;

      const { createUser } = response;

      Cookies.set('token', createUser?.token);
      Cookies.set('userId', createUser?.user.id);

      return true;
    } catch (error: any) {
      console.log('error from apollo/createNewUser', error);
      const errors = new Error(error);
      toast.error(errors.message);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = (
        await loginUser({
          variables: {
            email,
            password,
          },
        })
      ).data;

      const { loginUser: data } = response;

      Cookies.set('token', data?.token);
      Cookies.set('userId', data?.userId);

      return true;
    } catch (error: any) {
      console.log('error from apollo/loginUser', error);
      const errors = new Error(error);
      toast.error(errors?.message);
      return false;
    }
  };

  const getUserByID = async (id: string) => {
    try {
      const response = (
        await getUserById({
          variables: {
            id,
          },
        })
      ).data;

      const { getUserById: data } = response;

      return data;
    } catch (error: any) {
      console.log('error from apollo/getUserUserById', error);
      const errors = new Error(error);
      toast.error(errors?.message);
      return false;
    }
  };

  const updateUserByID = async (
    id: string,
    name: string,
    phone: string,
    email?: string
  ) => {
    try {
      const response = (
        await updateUserById({
          variables: {
            id,
            name,
            phone,
            email,
          },
        })
      ).data;

      const { updateUserById: data } = response;

      return data;
    } catch (error: any) {
      console.log('error from apollo/updateUser', error);
      const errors = new Error(error);
      toast.error(errors?.message);
      return false;
    }
  };

  const deleteUserByID = async (id: string, token: string) => {
    try {
      const response = (
        await deleteUserById({
          variables: {
            id,
            token,
          },
        })
      ).data;

      const { deleteUserById: data } = response;

      return data;
    } catch (error: any) {
      console.log('error from apollo/updateUser', error);
      const errors = new Error(error);
      toast.error(errors?.message);
      return false;
    }
  };

  // ===================CARS======================
  const createCarData = async (params: createCarDataType) => {
    const {
      image,
      type,
      typeDefinition,
      model,
      kml,
      transmission,
      passengers,
      price,
      userId,
    } = params;

    try {
      const response = (
        await createCar({
          variables: {
            image,
            type,
            typeDefinition,
            model,
            kml,
            transmission,
            passengers,
            price,
            userId,
          },
        })
      ).data;

      if (response) {
        const { createCar: data } = response;
        return data;
      }
    } catch (error: any) {
      console.log('ERROR with createCar', error);
      const errors = new Error(error);
      toast.error('Something wrong with user id');
    }
  };

  const updateCarById = async (params: OwnCarType) => {
    const {
      id,
      image,
      type,
      typeDefinition,
      model,
      kml,
      transmission,
      passengers,
      price,
    } = params;

    try {
      const response = (
        await updateCar({
          variables: {
            id,
            image,
            type,
            typeDefinition,
            model,
            kml,
            transmission,
            passengers,
            price,
          },
        })
      ).data;

      const { updateCarById: data } = response;

      return data;
    } catch (error: any) {
      console.log('error from apollo/updateUser', error);
      const errors = new Error(error);
      toast.error(errors?.message);
      return false;
    }
  };

  const deleteCarById = async (id: string) => {
    try {
      const response = (
        await deleteCar({
          variables: {
            id,
          },
        })
      ).data;

      const data = response?.deleteCarById;

      return data;
    } catch (error: any) {
      console.log('ERROR with getAllCarsByPage', error);
      const errors = new Error(error);
      toast.error(errors?.message);
    }
  };

  const getAllCarsByPage = async (
    skip: number,
    take: number,
    priceSort: string
  ) => {
    try {
      const response = (
        await getCarsByPagination({
          variables: {
            skip,
            take,
            priceSort,
          },
        })
      ).data;

      if (response) {
        const { getAllCarsWithPagination: data } = response;
        return data;
      }
    } catch (error: any) {
      console.log('ERROR with getAllCarsByPage', error);
      const errors = new Error(error);
      toast.error(errors?.message);
    }
  };

  const getAllCarsByPeople = async (passengers: number) => {
    try {
      const response = (
        await getCarsByPassengers({
          variables: {
            passengers,
          },
        })
      ).data;

      const { getCarsByPassengers: data } = response;
      return data;
    } catch (error: any) {
      console.log('ERROR with getAllCarsByPassengers', error);
      const errors = new Error(error);
      toast.error(errors?.message);
    }
  };

  const getCarsByPriceRange = async (price: number) => {
    try {
      const response = (
        await getCarsByPrice({
          variables: {
            price,
          },
        })
      ).data;

      const { getCarsByPriceRange: data } = response;
      return data;
    } catch (error: any) {
      console.log('ERROR with getCarsByPriceRange', error);
      const errors = new Error(error);
      toast.error(errors?.message);
    }
  };

  const getAllCarsByType = async (type: string) => {
    try {
      const response = (
        await getCarsByType({
          variables: {
            type,
          },
        })
      ).data;

      if (!response) toast.error(`No cars found with ${type} type`);

      const data = response?.getCarsByType;
      return data;
    } catch (error: any) {
      console.log('ERROR with getAllCarsByPassengers', error);
      const errors = new Error(error);
      toast.error(errors?.message);
    }
  };

  const getOwnCarsByID = async (userId: string) => {
    try {
      const response = (
        await getOwnCarsById({
          variables: {
            userId,
          },
        })
      ).data;

      // if (!response) toast.error(`No cars found with this id: ${userId}`);

      const data = response?.getOwnCars;
      return data;
    } catch (error: any) {
      console.log('ERROR with getAllCarsByPassengers', error);
      const errors = new Error(error);
      toast.error(errors?.message);
    }
  };

  const getCarByID = async (id: string) => {
    try {
      const response = (
        await getCarById({
          variables: {
            id,
          },
        })
      ).data;

      const { getCarById: data } = response;

      return data;
    } catch (error: any) {
      console.log('error from apollo/getCarById', error);
      const errors = new Error(error);
      toast.error(errors?.message);
      return false;
    }
  };

  // ===================RENTALS======================
  const createRentals = async (args: RentalType) => {
    const {
      userId,
      dateRent,
      dateReturn,
      totalDays,
      location,
      verified,
      extras,
      car,
    } = args;

    try {
      const response = (
        await createRental({
          variables: {
            userId,
            dateRent,
            dateReturn,
            totalDays,
            location,
            verified,
            extras,
            car,
          },
        })
      ).data;

      // if (!response) toast.error(`No cars found with ${type} type`);

      const data = response?.createRental;
      return data;
    } catch (error: any) {
      console.log('ERROR with getAllCarsByPassengers', error);
      const errors = new Error(error);
      toast.error(errors?.message);
    }
  };

  const getOwnRentalsById = async (userId: string) => {
    try {
      const response = (
        await getOwnRentals({
          variables: {
            userId,
          },
        })
      ).data;

      const data = response?.getOwnRentals;

      return data;
    } catch (error: any) {
      console.log('ERROR with getAllCarsByPage', error);
      const errors = new Error(error);
      toast.error(errors?.message);
    }
  };

  return {
    createUserLoading,
    loginUserLoading,
    updateCarLoading,
    getUserByIdLoading,
    deleteUserByIdLoading,
    getCarsByPageLoading,
    getCarsByPassengerLoading,
    getCarsByTypeLoading,
    getOwnCarsLoading,
    getCarsByPriceLoading,
    getCarByIdLoading,
    updateUserLoading,
    createCarLoading,
    deleteCarLoading,
    createRentalLoading,
    getOwnRentalsLoading,
    signUp,
    login,
    updateUserByID,
    getUserByID,
    deleteUserByID,
    createCarData,
    updateCarById,
    deleteCarById,
    getAllCarsByPage,
    getAllCarsByPeople,
    getAllCarsByType,
    getCarsByPriceRange,
    getOwnCarsByID,
    getCarByID,
    createRentals,
    getOwnRentalsById,
  };
};

export default useGraphql;
