import React from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Selector } from "@/components";
import { INavbar,  getYearsList, getMonthFromString } from "@/utils";
import { MONTHS_STRING } from "@/constants";

const Navbar: React.FC<INavbar> = (props) => {
  const { selectedDate, onDateChange } = props;

  const yearsOfString = getYearsList();

  const handleChangeMonth = (month: string) => {
    const date = selectedDate.date;
    date.setMonth(getMonthFromString(month));
    onDateChange({...selectedDate, month, date});
  }

  const handleChangeYear = (year: string) => {    
    const date = selectedDate.date;
    date.setFullYear(year as unknown as number);
    onDateChange({...selectedDate, year, date})
  }

  const handleChangePrevMonth = () => {
    const date = selectedDate.date;
    date.setMonth(getMonthFromString(selectedDate.month) - 1);
    const month = MONTHS_STRING[date.getMonth()];
    const year = date.getFullYear() as unknown as string;
    onDateChange({...selectedDate, month, year});
  }

  const handleChangeNextMonth = () => {
    const date = selectedDate.date;
    date.setMonth(getMonthFromString(selectedDate.month) + 1);
    const month = MONTHS_STRING[date.getMonth()];
    const year = date.getFullYear() as unknown as string;
    onDateChange({...selectedDate, month, year});
  }

  return (
    <div className="navbar">
      <div className="navbar__button-prev">
        <ArrowBackIos  onClick={handleChangePrevMonth}/>
      </div>
      <div className="navbar__selector">
        <Selector
          currentItem={selectedDate.month}
          selectList={MONTHS_STRING}
          onSelectChange={handleChangeMonth}
        />

        <Selector
          currentItem={selectedDate.year}
          selectList={yearsOfString}
          onSelectChange={handleChangeYear}
        />
      </div>
      <div className="navbar__button-next">
        <ArrowForwardIos onClick={handleChangeNextMonth}/>
      </div>
    </div>
  );
};

export default Navbar;