import React from "react";
import { Grid } from "@mui/material";
import { ICalendar } from "@/utils/interfacesUtil";

const Calendar: React.FC<ICalendar> = ({ date = new Date() }) => {

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={0}
    >

    </Grid>
  );
}

export default Calendar;