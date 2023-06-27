import dayjs from "dayjs";
import { CurrentDateType } from "@/utils/typesUtil";

export interface INavbar {
  selectedDate: CurrentDateType;
  onDateChange: (date: CurrentDateType) => void;
}

export interface ISelector {
  currentItem: string,
  selectList: string[];
  onSelectChange: (data: string) => void;
}

export interface ICalendar {
  date: Date,
}
