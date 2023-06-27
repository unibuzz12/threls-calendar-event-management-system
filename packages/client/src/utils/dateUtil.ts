import dayjs from 'dayjs';
import { CurrentDateType } from '@/utils/typesUtil';
import { DAYS_IN_WEEK } from "@/constants";

import localeData from "dayjs/plugin/localeData";
dayjs.extend(localeData);

export const getYearsList = (): string[] => {
  const result = [];
  for (let i = 1900; i < 2100; i++) {
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

export const getMonthFromString = (mon: string): number => {
  return new Date(Date.parse(mon + " 1, 2012")).getMonth();
}

export const getPreviousMonthDate = (date: any) => {
  return dayjs(date).subtract(1, "month");
};

export const getNextMonthDate = (date: any) => {
  return dayjs(date).add(1, "month");
};

export const getWeekDays = () => {
  const weekdayLongName = dayjs.weekdays();
  const weekdayShortName = dayjs.weekdaysShort();

  return weekdayLongName.map((day: string, index: number) => ({
    longName: day,
    shortName: weekdayShortName[index],
  }));
};

export const getCurrentMonthCalendarizableDays = (date: Date) => {
  const baseDate = dayjs(date);
  const month = parseInt(baseDate.format("M"));
  const year = parseInt(baseDate.format("YYYY"));

  const amountOfDays = baseDate.daysInMonth() + 1;
  const weekdayOfFirstDayOfCurrentMonth = Number(
    baseDate.startOf("month").day()
  );
  const lastDayOfPreviousMonth = Number(
    getPreviousMonthDate(baseDate).endOf("month").format("D")
  );

  let lastMonthDays: any[] = [];
  if (weekdayOfFirstDayOfCurrentMonth > 0) {
    lastMonthDays = [...Array(weekdayOfFirstDayOfCurrentMonth)]
      .map((_, index) => ({
        isEnabled: false,
        number: lastDayOfPreviousMonth - index,
      }))
      .reverse();
  }

  const currentMonthDays = [...Array(amountOfDays).keys() as unknown as string[]].map((day) => ({
    number: day,
    isEnabled: true,
    month,
    year,
  }));
  currentMonthDays.shift();

  const calendarDays = lastMonthDays.concat(currentMonthDays);

  const nextMonthAmount = DAYS_IN_WEEK - (calendarDays.length % DAYS_IN_WEEK);
  const nextMonthDays = [...Array(nextMonthAmount).keys() as unknown as string[]].map((day) => ({
    number: day + 1,
    isEnabled: false,
  }));

  return calendarDays.concat(nextMonthDays);
};
