import React from 'react';

import { IDropdownSearch } from './types';

export const DropdownSearch: React.FC<IDropdownSearch> = ({
  value,
  onChange,
  placeholder = 'Search...',
}) => {
  return (
    <div className="dropdown-search">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="dropdown-search-input"
      />
    </div>
  );
};
