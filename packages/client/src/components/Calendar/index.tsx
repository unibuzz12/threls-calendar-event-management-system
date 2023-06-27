import React from "react";
import { Grid } from "@mui/material";
import { CalendarDay, CalendarHeader } from "@/components";
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
      {calendarDays?.map((day) => (
        <CalendarDay
          key={`${day.number}.${day.month}.${day.year}`}
          day={day.number}
          month={day.month}
          year={day.year}
          isEnabled={day.isEnabled}
          height={gridRowHeight}
        />
      ))}
    </Grid>
  );
}

export default Calendar;