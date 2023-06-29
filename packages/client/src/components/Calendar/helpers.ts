import { DAYS_IN_WEEK } from "@/constants";

const CALENDAR_ROW_HEIGHT = {
  SMALL: "13.3vh",
  MEDIUM: "16vh",
  LARGE: "20vh",
};

export const getRowHeightFromCurrentMonth = (amountOfDays: number) => {
  switch (amountOfDays / DAYS_IN_WEEK) {
    case 4:
      return CALENDAR_ROW_HEIGHT.LARGE;

    case 5:
      return CALENDAR_ROW_HEIGHT.MEDIUM;

    case 6:
      return CALENDAR_ROW_HEIGHT.SMALL;

    default:
      return CALENDAR_ROW_HEIGHT.MEDIUM;
  }
};
