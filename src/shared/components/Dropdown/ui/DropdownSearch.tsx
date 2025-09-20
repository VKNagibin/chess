import React from 'react';

import classes from '@/shared/components/Dropdown/styles/DropdownSearch.module.scss';
import { IDropdownSearch } from '@/shared/components/Dropdown/types';

export const DropdownSearch: React.FC<IDropdownSearch> = ({
  value,
  onChange,
  placeholder = 'Search...',
}) => {
  return (
    <div className={classes.container}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={classes.input}
      />
    </div>
  );
};
