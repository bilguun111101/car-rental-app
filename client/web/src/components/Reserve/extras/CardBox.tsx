import { useRental } from '@/providers/rentalProvider';
import Image from 'next/image';
import React, { useState } from 'react';

type Props = {
  image: string;
  typeDefinition: string;
  typeDefinitionMGL: string;
  text: string;
  price: string;
};

const CardBox = ({
  image,
  typeDefinition,
  typeDefinitionMGL,
  text,
  price,
}: Props) => {
  const [clicked, setClicked] = useState(false);
  const { rentals, setRentals } = useRental();

  const onSubmitHandler = (extras: string) => {
    setClicked((prev) => !prev);

    if (extras === 'Coverage')
      setRentals((prev) => ({
        ...prev,
        extras: { ...prev.extras, coverage: !prev.extras.coverage },
      }));
    if (extras === 'Child Safety Seat')
      setRentals((prev) => ({
        ...prev,
        extras: { ...prev.extras, child_safety: !prev.extras.child_safety },
      }));
    if (extras === 'GPS') {
      setRentals((prev) => ({
        ...prev,
        extras: { ...prev.extras, GPS: !prev.extras.GPS },
      }));
    }
  };

  return (
    <div className='my-4 mx-auto'>
      <div className='flex flex-col md:px-5 items-center justify-center md:flex-row md:justify-between bg-white dark:bg-dark-secondary shadow-xl rounded-xl hover:scale-[1.01] transition-all duration-400 '>
        <div className='flex flex-col items-center md:items-start md:w-full p-4'>
          <h4 className='card-title md:text-2xl dark:text-gray-secondary'>
            {typeDefinitionMGL}
          </h4>
          <div className='flex space-x-2 md:flex-wrap mt-2'>
            <div className='flex space-x-1'>
              <Image
                src={image}
                alt='Movie'
                width={35}
                height={35}
                className='object-contain dark:bg-gray-secondary dark:rounded-full '
              />
              <p className='font-normal mt-3 pl-2 text-xs sm:text-sm dark:text-gray-secondary'>
                {text}
              </p>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <p className='dark:text-gray-secondary text-center'>{price}</p>
        </div>
        <div className='my-2 md:w-auto md:px-2'>
          <button
            className={`btn btn-sm md:btn-md btn-outline border-2 btn-primary rounded-full normal-case ${
              clicked && 'bg-red-primary !text-white'
            }`}
            onClick={() => onSubmitHandler(typeDefinition)}
          >
            {clicked ? 'Нэмсэн' : 'Нэмэх'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardBox;
