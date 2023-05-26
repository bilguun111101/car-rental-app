import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  setCarInputData: Dispatch<SetStateAction<CarType>>;
};

const UploadData = ({ setCarInputData }: Props) => {
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

  return (
    <>
      <div className='form-control w-full max-w-xs'>
        <label className='label'>
          <span className='label-text dark:text-gray-secondary'>
            Машины талаарх мэдээллээ оруулна уу*
          </span>
        </label>
        <div className='form-control space-y-2'>
          <label className='input-group'>
            <span className='bg-gradient text-white text-sm'>Төрөл</span>

            <select
              className='select select-bordered w-full select-sm max-w-[250px] font-normal dark:bg-transparent dark:hover:border-gray-secondary dark:text-gray-secondary dark:border-gray-secondary'
              id='type'
              onChange={onChangeHandler}
            >
              <option disabled selected>
                Төрөл сонгох
              </option>
              <option>SUV</option>
              <option>Bus</option>
              <option>Standard</option>
              <option>Pickup</option>
              <option>Economy</option>
            </select>
          </label>
          <label className='input-group'>
            <span className='bg-gradient text-white text-sm'>Загвар</span>
            <select
              className='select select-bordered w-full select-sm max-w-[240px] font-normal dark:bg-transparent dark:hover:border-gray-secondary dark:text-gray-secondary dark:border-gray-secondary'
              id='model'
              onChange={onChangeHandler}
            >
              <option disabled selected>
                Модель сонгох
              </option>
              <option>Toyota</option>
              <option>Nissan</option>
              <option>Daewoo</option>
              <option>Ford</option>
            </select>
          </label>
          <label className='input-group'>
            <span className='bg-gradient text-white text-sm'>Араа</span>
            <select
              className='select select-bordered w-full select-sm max-w-[250px] font-normal dark:bg-transparent dark:hover:border-gray-secondary dark:text-gray-secondary dark:border-gray-secondary'
              id='transmission'
              onChange={onChangeHandler}
            >
              <option disabled selected>
                Pick car gear
              </option>
              <option>auto</option>
              <option>manual</option>
            </select>
          </label>
          {/* Inputs */}
          <label className='input-group'>
            <span className='bg-gradient text-white text-sm'>Дэлгэрэнгүй</span>
            <input
              type='text'
              placeholder='нэмэлт'
              className='input input-bordered w-full input-sm dark:bg-transparent dark:hover:border-gray-secondary dark:text-gray-secondary dark:border-gray-secondary'
              required
              id='typeDefinition'
              onChange={onChangeHandler}
            />
          </label>
          <label className='input-group'>
            <span className='bg-gradient text-white text-sm'>кмл</span>
            <input
              type='number'
              placeholder='1 литр зарцуулах км'
              className='input input-bordered w-full input-sm dark:bg-transparent dark:hover:border-gray-secondary dark:text-gray-secondary dark:border-gray-secondary'
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
              id='price'
              onChange={onChangeHandler}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default UploadData;
