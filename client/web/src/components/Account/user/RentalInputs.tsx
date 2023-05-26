import moment from 'moment';
import Image from 'next/image';

type Props = {
  rentalData: RentalDataType[];
};

const RentalInputs = ({ rentalData }: Props) => {
  return (
    <div>
      <div className='overflow-x-auto'>
        <table className='table w-full table-compact md:table'>
          {/* head*/}
          <thead className=''>
            <tr className='hover'>
              <th className='text-center'>#</th>
              <th className='text-center'>Авах өдөр</th>
              <th className='text-center'>Өгөх өдөр</th>
              <th className='text-center'>Нийт өдөр</th>
              <th className='text-center'>Байршил</th>
              <th className='text-center'>Баталгаажсан</th>
              <th className='text-center'>Үүссэн огноо</th>
              <th className='text-center'>Машин</th>
            </tr>
          </thead>
          <tbody className='border'>
            {rentalData.length > 0 &&
              rentalData.map((rental, i) => {
                const {
                  dateRent,
                  dateReturn,
                  totalDays,
                  location,
                  verified,
                  extras,
                  createdAt,
                  car,
                } = rental;
                return (
                  <tr className='' key={rental.id}>
                    <th className='text-xs md:text-sm dark:bg-transparent dark:text-gray-secondary text-black text-center'>
                      {i + 1}
                    </th>
                    <td className='text-xs md:text-sm dark:bg-transparent dark:text-gray-secondary text-black'>
                      {dateRent}
                    </td>
                    <td className='text-xs md:text-sm dark:bg-transparent dark:text-gray-secondary text-black'>
                      {dateReturn}
                    </td>
                    <td className='text-xs md:text-sm dark:bg-transparent dark:text-gray-secondary text-black text-center'>
                      {totalDays}
                    </td>
                    <td className='text-xs md:text-sm dark:bg-transparent dark:text-gray-secondary text-black'>
                      {location}
                    </td>
                    <td className='text-xs md:text-sm dark:bg-transparent dark:text-gray-secondary text-black text-center'>
                      {verified ? 'тийм' : 'үгүй'}
                    </td>
                    <td className='text-xs md:text-sm dark:bg-transparent dark:text-gray-secondary text-black'>
                      {moment(createdAt).format().slice(0, 10)}
                    </td>
                    <td className='text-xs md:text-sm dark:bg-transparent dark:text-gray-secondary text-black'>
                      <Image
                        src={car.image}
                        width={100}
                        height={50}
                        alt='car'
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalInputs;
