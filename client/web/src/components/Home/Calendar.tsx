import React, { Dispatch, SetStateAction } from 'react';
import { DateRangePicker } from 'react-date-range';

type Props = {
  setStartDate: Dispatch<SetStateAction<Date>>;
  setEndDate: Dispatch<SetStateAction<Date>>;
  startDate: Date;
  endDate: Date;
};

// imported from <PickUp/>
const Calendar = ({ setStartDate, setEndDate, startDate, endDate }: Props) => {
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  return (
    <>
      <DateRangePicker
        ranges={[selectionRange]}
        minDate={new Date()}
        rangeColors={['#FD5B61']}
        onChange={handleSelect}
        showDateDisplay={false}
        className='dark:bg-dark-primary dark:text-red-500'
        // color='blue'
      />
    </>
  );
};

export default Calendar;
