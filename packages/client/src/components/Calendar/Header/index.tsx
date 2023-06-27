import React from 'react';
import { Card, Grid } from '@mui/material';
import { getWeekDays } from '@/utils/dateUtil';

const CalendarHeader = () => {
  return getWeekDays().map((day) => (
    <Card
      key={day.longName}
      variant='outlined'
      className='calendar-header-card'
    >
      <Grid item className='calendar-header-text-large'>
        {day.longName}
      </Grid>
      <Grid item className='calendar-header-text-small'>
        {day.shortName}
      </Grid>
    </Card>
  ));
};

export default CalendarHeader;