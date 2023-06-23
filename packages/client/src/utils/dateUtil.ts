import { CurrentDateType } from '@/utils/typesUtil';

export const monthsOfString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'];

export const getYearsList = (): string[] => {
  const result = [];
  for(let i = 1900; i < 2100; i++) {
    result.push(i.toString());
  }
  return result;
};

export const getCurrentDate = (): CurrentDateType => {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });;
  const year = date.getFullYear().toString();

  return {
    date,
    month,
    year,
  }
}