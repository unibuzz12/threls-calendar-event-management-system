import { CurrentDateType, EventType } from "@/utils/typesUtil";

export interface INavbar {
  selectedDate: CurrentDateType;
  onDateChange: (date: CurrentDateType) => void;
}

export interface ISelector {
  currentItem: string;
  selectList: string[];
  onSelectChange: (data: string) => void;
}

export interface ICalendar {
  date: Date;
}

export interface ICalendarDay {
  day: number;
  month: number;
  year: number;
  isEnabled: boolean;
  height: string;
}

export interface IEvent {
  isEnabled: boolean;
  dailyReminders: EventType[];
  setIsEditing: (isEditing: boolean) => void;
  setBaseInfo: (baseInfo: any) => void;
  setEdit: (edit: any) => void
}

export interface IEventModal {
  day: number;
  month: number;
  year: number;
  open: boolean;
  isEdit: boolean;
  events: EventType[];
  baseInfo: EventType;
  handleClose: () => void;
  setEvents: (event: EventType[]) => void
  error: any;
  setError: (error: any) => void
}