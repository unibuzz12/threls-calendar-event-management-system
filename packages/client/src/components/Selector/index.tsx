import React from "react";
import {
  MenuItem,
  Select,
} from '@mui/material';
import { ISelector } from "@/utils";

const Selector: React.FC<ISelector> = (props) => {
  const { currentItem, selectList, onSelectChange } = props;

  return (
    <>
      <Select
        value={currentItem}
        onChange={(e) => onSelectChange(e.target.value)}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {selectList && selectList.map((item: string | number) =>
          <MenuItem value={item} key={item}>{item}</MenuItem>
        )}
      </Select>
    </>
  )
}

export default Selector;
