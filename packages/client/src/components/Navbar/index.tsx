import React, { useState } from "react";
import { Selector } from "@/components";
import { INavbar } from "@/utils/interfacesUtil";
import { monthsOfString, getYearsList } from "@/utils/dateUtil";

const Navbar: React.FC<INavbar> = (props) => {
  const { selectedDate, onDateChange } = props;

  const yearsOfString = getYearsList();

  const handleChangeMonth = (month: string) => {
    onDateChange({...selectedDate, month});
  }

  const handleChangeYear = (year: string) => {
    onDateChange({...selectedDate, year})
  }

  return (
    <div className="navbar">
      <div className="navbar__selector">
        <Selector
          currentItem={selectedDate.month}
          selectList={monthsOfString}
          onSelectChange={handleChangeMonth}
        />

        <Selector
          currentItem={selectedDate.year}
          selectList={yearsOfString}
          onSelectChange={handleChangeYear}
        />
      </div>
    </div>
  );
};

export default Navbar;