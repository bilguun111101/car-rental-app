import useGraphql from '@/hooks/useGraphql';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

type Props = {
  carData: OwnCarType;
  carsData: OwnCarsType[];
  setCarsData: Dispatch<SetStateAction<OwnCarsType[]>>;
};

const EditCar = ({ carData, carsData, setCarsData }: Props) => {
  const [carInputData, setCarInputData] = useState({
    image: '',
    type: '',
    typeDefinition: '',
    model: '',
    transmission: '',
    kml: 0,
    passengers: 0,
    price: 0,
  });

  const { updateCarById, updateCarLoading } = useGraphql();

  //1) Handling both SELECT and INPUT elements at once
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCarInputData((prev) => ({
      ...prev,
      [e.target.id]:
        e.target.type === 'number' ? Number(e.target.value) : e.target.value,
    }));
  };

  // Update car data to database
  const onSubmitHandler = async () => {
    let {
      image,
      type,
      typeDefinition,
      model,
      transmission,
      kml,
      passengers,
      price,
    } = carInputData;

    //1) Validation
    if (
      image === carData?.image &&
      type === carData?.type &&
      typeDefinition === carData?.typeDefinition &&
      model === carData?.model &&
      transmission === carData?.transmission &&
      kml === carData?.kml &&
      passengers === carData?.passengers &&
      price === carData?.price
    )
      return toast.error('Таны мэдээлэл өөрчлөгдөөгүй байна!');

    //2 Data save
    const response = await updateCarById({ ...carInputData, id: carData.id });

    //3) Re-rendering cars table data
    if (response) {
      toast.success('Successfully save all data.');
      setCarsData(
        carsData.map((car) =>
          car.id === carData.id
            ? { ...carInputData, id: carData.id }
            : { ...car }
        )
      );
    } else return toast.error('Алдаа гарлаа');
  };

  //for first time rendering
  useEffect(() => {
    setCarInputData({ ...carData });
  }, [carData]);

  return (
    <>
      <input type='checkbox' id='editCar' className='modal-toggle' />
      <div className='modal modal-middle'>
        <div className='modal-box dark:bg-dark-secondary dark:border'>
          <h3 className='text-base font-boldtext-lg md:text-lg font-bold text-center uppercase dark:text-gray-secondary'>
            Машины мэдээлэл
          </h3>
          <label
            htmlFor='editCar'
            className='btn-sm btn-circle btn absolute right-2 top-2 dark:bg-gray-secondary dark:text-black'
          >
            ✕
          </label>
          <div className='flex flex-col space-y-2 w-fit mx-auto'>
            <div className='form-control space-y-2'>
              <label className='input-group'>
                <span className='bg-gradient text-white text-sm'>Төрөл</span>
                <select
                  className='select select-bordered w-full select-sm max-w-[250px] font-normal dark:bg-transparent dark:hover:border-gray-secondary dark:text-gray-secondary dark:border-gray-secondary'
                  id='type'
                  onChange={onChangeHandler}
                >
                  <option selected={carData?.type === 'SUV' ? true : false}>
                    SUV
                  </option>
                  <option selected={carData?.type === 'Bus' ? true : false}>
                    Bus
                  </option>
                  <option
                    selected={carData?.type === 'Standard' ? true : false}
                  >
                    Standard
                  </option>
                  <option selected={carData?.type === 'Pickup' ? true : false}>
                    Pickup
                  </option>
                  <option selected={carData?.type === 'Economy' ? true : false}>
                    Economy
                  </option>
                </select>
              </label>
              <label className='input-group'>
                <span className='bg-gradient text-white text-sm'>Загвар</span>
                <select
                  className='select select-bordered w-full select-sm max-w-[240px] font-normal dark:bg-transparent dark:hover:border-gray-secondary dark:text-gray-secondary dark:border-gray-secondary'
                  id='model'
                  onChange={onChangeHandler}
                >
                  <option selected={carData?.model === 'Toyota' ? true : false}>
                    Toyota
                  </option>
                  <option selected={carData?.model === 'Nissan' ? true : false}>
                    Nissan
                  </option>
                  <option selected={carData?.model === 'Daewoo' ? true : false}>
                    Daewoo
                  </option>
                  <option selected={carData?.model === 'Ford' ? true : false}>
                    Ford
                  </option>
                </select>
              </label>
              <label className='input-group'>
                <span className='bg-gradient text-white text-sm'>Араа</span>
                <select
                  className='select select-bordered w-full select-sm max-w-[250px] font-normal dark:bg-transparent dark:hover:border-gray-secondary dark:text-gray-secondary dark:border-gray-secondary'
                  id='transmission'
                  onChange={onChangeHandler}
                >
                  <option
                    selected={carData?.transmission === 'auto' ? true : false}
                  >
                    auto
                  </option>
                  <option
                    selected={carData?.transmission === 'manual' ? true : false}
                  >
                    manual
                  </option>
                </select>
              </label>
              {/* Inputs */}
              <label className='input-group'>
                <span className='bg-gradient text-white text-sm'>
                  Дэлгэрэнгүй
                </span>
                <input
                  type='text'
                  // placeholder='нэмэлт'
                  className='input input-bordered w-full input-sm dark:bg-transparent dark:hover:border-gray-secondary dark:text-gray-secondary dark:border-gray-secondary'
                  required
                  value={carInputData?.typeDefinition}
                  id='typeDefinition'
                  onChange={onChangeHandler}
                />
              </label>
              <label className='input-group'>
                <span className='bg-gradient text-white text-sm'>кмл</span>
                <input
                  type='number'
                  className='input input-bordered w-full input-sm dark:bg-transparent dark:hover:border-gray-secondary dark:text-gray-secondary dark:border-gray-secondary'
                  // placeholder={carInputData?.kml ? carInputData?.kml : 0}
                  value={carInputData?.kml}
                  required
                  id='kml'
                  onChange={onChangeHandler}
                />
              </label>
              <label className='input-group'>
                <span className='bg-gradient text-white text-sm'>Зорчигч</span>
                <input
                  type='number'
                  placeholder='зорчигчийн тоо'
                  className='input input-bordered w-full input-sm dark:bg-transparent dark:hover:border-gray-secondary dark:text-gray-secondary dark:border-gray-secondary'
                  required
                  value={carInputData?.passengers}
                  id='passengers'
                  onChange={onChangeHandler}
                />
              </label>
              <label className='input-group'>
                <span className='bg-gradient text-white text-sm'>Үнэ</span>
                <input
                  type='number'
                  placeholder='$ үнэ / 1 өдөр'
                  className='input input-bordered w-full input-sm dark:bg-transparent dark:hover:border-gray-secondary dark:text-gray-secondary dark:border-gray-secondary'
                  required
                  value={carInputData?.price}
                  id='price'
                  onChange={onChangeHandler}
                />
              </label>
            </div>
            <button
              className={`btn btn-sm bg-white border-red-primary text-red-primary !max-h-4 hover:bg-red-primary hover:text-white gap-2 dark:bg-transparent dark:hover:border-gray-secondary text-[10px] sm:text-xs md:text-sm ${
                updateCarLoading && 'loading'
              }`}
              onClick={onSubmitHandler}
            >
              {updateCarLoading ? 'Хадгалж байна' : 'Бүгдийг хадгалах'}
              <CloudArrowUpIcon className='h-4' />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCar;
