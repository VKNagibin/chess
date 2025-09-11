import React, { RefObject } from 'react';

import classes from '@/shared/components/Dropdown/styles/DropdownMenu.module.scss';
import { IDropdownOption, PositionType } from '@/shared/components/Dropdown/types';
import { DropdownItem } from '@/shared/components/Dropdown/ui/DropdownItem';
import { DropdownSearch } from '@/shared/components/Dropdown/ui/DropdownSearch';

interface IDropdownMenu {
  searchable: boolean;
  searchValue: string;
  selectedValue?: string;
  position: PositionType;
  filteredOptions: IDropdownOption[];
  menuRef: RefObject<HTMLDivElement | null>;
  menuStyle: React.StyleHTMLAttributes<HTMLDivElement>;
  handleSelect: (value: string) => void;
  setSearchValue: (value: string) => void;
}

export const DropdownMenu: React.FC<IDropdownMenu> = ({
  searchable,
  searchValue,
  selectedValue,
  position,
  filteredOptions,
  menuRef,
  menuStyle,
  handleSelect,
  setSearchValue,
}) => {
  const getContainerClasses = () => {
    const className = classes.container;
    if (position === PositionType.TOP) className + classes.reversed;

    return className;
  };

  return (
    <div ref={menuRef} style={menuStyle} className={getContainerClasses()}>
      {searchable && (
        <DropdownSearch
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search options..."
        />
      )}

      <ul className={classes.list}>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <DropdownItem
              key={option.value}
              option={option}
              isSelected={option.value === selectedValue}
              onSelect={handleSelect}
              searchValue={searchValue}
            />
          ))
        ) : (
          <li className={classes.empty}>No options found</li>
        )}
      </ul>
    </div>
  );
};
