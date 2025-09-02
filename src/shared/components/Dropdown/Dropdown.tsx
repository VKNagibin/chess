import './Dropdown.css';

import React from 'react';
import { createPortal } from 'react-dom';

import { DropdownItem } from './DropdownItem';
import { DropdownSearch } from './DropdownSearch';
import { IDropdown } from './types';
import useDropdown from './useDropdown';

export const Dropdown: React.FC<IDropdown> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  searchable = false,
  multiSelect = false,
  className = '',
  position = 'bottom',
}) => {
  const {
    isOpen,
    searchValue,
    selectedValue,
    selectedOption,
    filteredOptions,
    menuStyle,
    dropdownRef,
    menuRef,
    handleToggle,
    handleSelect,
    setSearchValue,
  } = useDropdown({
    disabled,
    multiSelect,
    position,
    value,
    options,
    onChange,
  });

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${className} ${disabled ? 'disabled' : ''} ${
        isOpen ? 'open' : ''
      }`}
    >
      <button className="dropdown-trigger" onClick={handleToggle}>
        <span className="dropdown-value">{selectedOption?.label || placeholder}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen &&
        createPortal(
          <div ref={menuRef} style={menuStyle} className={`dropdown-menu ${position}`}>
            {searchable && (
              <DropdownSearch
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Search options..."
              />
            )}

            <ul className="dropdown-list">
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
                <li className="dropdown-empty">No options found</li>
              )}
            </ul>
          </div>,
          document.body,
        )}
    </div>
  );
};
