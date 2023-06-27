import React from "react";
import { Grid } from "@mui/material";
import { CalendarHeader } from "@/components";
import { ICalendar } from "@/utils/interfacesUtil";
import { getCurrentMonthCalendarizableDays } from "@/utils/dateUtil";
import { getRowHeightFromCurrentMonth } from "./helpers";

const Calendar: React.FC<ICalendar> = ({ date = new Date() }) => {
  const calendarDays = getCurrentMonthCalendarizableDays(date);
  const gridRowHeight = getRowHeightFromCurrentMonth(calendarDays?.length);

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={0}
    >
      <CalendarHeader />
    </Grid>
  );
}

export default Calendar;