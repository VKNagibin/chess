import React from 'react';

import classes from '@/shared/components/Dropdown/styles/DropdownItem.module.scss';
import { IDropdownOption } from '@/shared/components/Dropdown/types';

interface DropdownItemProps {
  option: IDropdownOption;
  isSelected: boolean;
  onSelect: (value: string) => void;
  searchValue?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  option,
  isSelected,
  onSelect,
  searchValue,
}) => {
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className={classes.highlight}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const getButtonClasses = () => {
    let className = classes.button;
    if (isSelected) className = `${className} ${classes.selected}`;
    if (option.disabled) className = `${className} ${classes.disabled}`;

    return className;
  };

  return (
    <li className={classes.container}>
      <button
        className={getButtonClasses()}
        onClick={() => !option.disabled && onSelect(option.value)}
      >
        {option.icon || null}
        <p>{searchValue ? highlightText(option.label, searchValue) : option.label}</p>
      </button>
    </li>
  );
};
