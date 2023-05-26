import React, { useState } from 'react';
import UploadImage from './UploadImage';
import UploadData from './UploadData';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';
import useGraphql from '@/hooks/useGraphql';
import Spinner from '@/components/UI/Spinner';
import Cookies from 'js-cookie';

type Props = {};

const CarInputs = (props: Props) => {
  const { createCarData, createCarLoading } = useGraphql();
  const [carImage, setCarImage] = useState(''); //image url from cloudinary
  const [carInputData, setCarInputData] = useState<CarType>({
    image: '',
    type: '',
    typeDefinition: '',
    model: '',
    transmission: '',
    kml: 0,
    passengers: 0,
    price: 0,
  });

  // 1) Destructuring variables
  const { type, typeDefinition, model, transmission, kml, passengers, price } =
    carInputData;

  // 2) Save car data to mongoDb
  const onSubmitHandler = async () => {
    const userId = Cookies.get('userId');

    // 2.1) Validations
    if (!userId) return toast.error('No user id');
    if (carImage === '') return toast.error('Please upload car image!');

    if (
      type === '' ||
      model === '' ||
      typeDefinition === '' ||
      transmission === '' ||
      kml === 0 ||
      price === 0 ||
      passengers === 0
    )
      return toast.error('All input fields must not be empty!');

    // 2.2) Request to mongoDb
    const response = await createCarData({
      ...carInputData,
      image: carImage,
      userId,
    });

    if (response) toast.success('Successfully save all data.');
  };

  if (createCarLoading) return <Spinner />;

  return (
    <div className='flex flex-col space-y-2 w-fit mx-auto'>
      <UploadImage setCarImage={setCarImage} />
      <UploadData setCarInputData={setCarInputData} />
      <button
        className='btn btn-sm bg-white border-red-primary text-red-primary !max-h-4 hover:bg-red-primary hover:text-white gap-2 dark:bg-transparent dark:hover:border-gray-secondary text-[10px] sm:text-xs md:text-sm'
        onClick={onSubmitHandler}
      >
        Бүгдийг хадгалах
        <CloudArrowUpIcon className='h-4' />
      </button>
    </div>
  );
};

export default CarInputs;
