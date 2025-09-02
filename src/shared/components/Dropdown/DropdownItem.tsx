import React from 'react';

import { IDropdownOption } from './types';

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
        <span key={i} className="dropdown-item-highlight">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <li
      className={`dropdown-item ${isSelected ? 'selected' : ''} ${
        option.disabled ? 'disabled' : ''
      }`}
    >
      <button
        className="itemButton"
        onClick={() => !option.disabled && onSelect(option.value)}
      >
        {option.icon && <span className="dropdown-item-icon">{option.icon}</span>}
        <span className="dropdown-item-label">
          {searchValue ? highlightText(option.label, searchValue) : option.label}
        </span>
        {isSelected && <span className="dropdown-item-check">✓</span>}
      </button>
    </li>
  );
};
