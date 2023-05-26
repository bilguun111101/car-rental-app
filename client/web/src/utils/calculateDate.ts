import moment from 'moment';

export const calculateDate = (startDate: Date, endDate: Date) => {
  const stringStartDate = moment(startDate).format().slice(0, 10);
  const stringEndDate = moment(endDate).format().slice(0, 10);

  const date1 = new Date(stringStartDate);
  const date2 = new Date(stringEndDate);

  // To calculate the time difference of two dates
  const timeDifference = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  const totalDays = timeDifference / (1000 * 3600 * 24);

  return { stringStartDate, stringEndDate, totalDays };
};
