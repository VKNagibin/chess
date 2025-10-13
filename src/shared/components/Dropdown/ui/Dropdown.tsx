import { t } from 'i18next';
import React from 'react';
import { createPortal } from 'react-dom';

import classes from '@/shared/components/Dropdown/styles/Dropdown.module.scss';
import { IDropdown, PositionType } from '@/shared/components/Dropdown/types';
import { DropdownMenu } from '@/shared/components/Dropdown/ui/DropdownMenu';
import useDropdown from '@/shared/components/Dropdown/useDropdown';

export const Dropdown: React.FC<IDropdown> = ({
  options,
  value,
  onChange,
  placeholder = t('dropdown.placeholder'),
  disabled = false,
  searchable = false,
  multiSelect = false,
  position = PositionType.BOTTOM,
}) => {
  const {
    isOpen,
    setIsOpen,
    searchValue,
    selectedValue,
    selectedOption,
    filteredOptions,
    dropdownRef,
    openMenu,
    handleSelect,
    setSearchValue,
  } = useDropdown({
    disabled,
    multiSelect,
    value,
    options,
    onChange,
  });

  const getContainerClasses = () => {
    let className = classes.container;
    if (disabled) className + classes.disabled;

    return className;
  };

  const getArrowClasses = () => {
    let className = classes.arrow;
    if (isOpen) className + classes.arrowOpen;

    return className;
  };

  return (
    <div ref={dropdownRef} className={getContainerClasses()}>
      <button className={classes.trigger} onClick={openMenu}>
        <span className={classes.value}>{selectedOption?.label || placeholder}</span>
        <span className={getArrowClasses()}>▼</span>
      </button>

      {isOpen &&
        createPortal(
          <DropdownMenu
            searchable={searchable}
            searchValue={searchValue}
            selectedValue={selectedValue}
            dropdownElement={dropdownRef?.current}
            position={position}
            setIsOpen={setIsOpen}
            filteredOptions={filteredOptions}
            handleSelect={handleSelect}
            setSearchValue={setSearchValue}
          />,
          document.body,
        )}
    </div>
  );
};
