import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import classes from '@/shared/components/Dropdown/styles/DropdownMenu.module.scss';
import { IDropdownOption, PositionType } from '@/shared/components/Dropdown/types';
import { DropdownItem } from '@/shared/components/Dropdown/ui/DropdownItem';
import { DropdownSearch } from '@/shared/components/Dropdown/ui/DropdownSearch';

import calculateMenuPosition from './../utils/calculateMenuPosition';

interface IDropdownMenu {
  searchable: boolean;
  searchValue: string;
  selectedValue?: string;
  position: PositionType;
  setIsOpen: (prop: boolean) => void;
  filteredOptions: IDropdownOption[];
  dropdownElement: HTMLDivElement | null;
  menuStyle: React.StyleHTMLAttributes<HTMLDivElement>;
  handleSelect: (value: string) => void;
  setSearchValue: (value: string) => void;
}

export const DropdownMenu: React.FC<IDropdownMenu> = ({
  searchable,
  searchValue,
  selectedValue,
  position,
  dropdownElement,
  filteredOptions,
  setIsOpen,
  handleSelect,
  setSearchValue,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyles, setMenuStyles] = useState({});

  const { t } = useTranslation();

  const getContainerClasses = () => {
    const className = classes.container;
    if (position === PositionType.TOP) className + classes.reversed;

    return className;
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const clickedOutsideDropdown = !dropdownElement?.contains(event.target as Node);

    const clickedOutsideMenu = !menuRef.current?.contains(event.target as Node);

    if (clickedOutsideDropdown && clickedOutsideMenu) {
      setIsOpen(false);
      setSearchValue('');
    }
  }, []);

  const calculateMenuStyles = () => {
    setMenuStyles(calculateMenuPosition(position, dropdownElement));
  };

  useLayoutEffect(() => {
    calculateMenuStyles();
    if (!dropdownElement) return;

    document.addEventListener('click', handleClickOutside);

    window.addEventListener('resize', calculateMenuStyles);
    window.addEventListener('scroll', calculateMenuStyles, true);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', calculateMenuStyles);
      window.removeEventListener('scroll', calculateMenuStyles, true);
    };
  }, [t, dropdownElement]);

  return (
    <div ref={menuRef} className={getContainerClasses()} style={menuStyles}>
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
