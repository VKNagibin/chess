import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { IDropdownOption, PositionType } from './types';
import calculateMenuPosition from './utils/calculateMenuPosition';

export default function useDropdown({
  disabled,
  value,
  position,
  options,
  multiSelect,
  onChange,
}: {
  disabled: boolean;
  value?: string;
  position: PositionType;
  options: IDropdownOption[];
  multiSelect: boolean;
  onChange?: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [menuStyle, setMenuStyle] = useState({});
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [searchValue, options],
  );

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === selectedValue),
    [selectedValue, options],
  );

  const handleSelect = useCallback((newValue: string) => {
    setSelectedValue(newValue);
    onChange?.(newValue);
    if (!multiSelect) {
      setIsOpen(false);
      setSearchValue('');
    }
  }, []);

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
      setSearchValue('');
    }
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const clickedOutsideDropdown =
      dropdownRef.current && !dropdownRef.current.contains(event.target as Node);

    const clickedOutsideMenu =
      menuRef.current && !menuRef.current.contains(event.target as Node);

    if (clickedOutsideDropdown && clickedOutsideMenu) {
      setIsOpen(false);
      setSearchValue('');
    }
  }, []);

  useEffect(() => {
    if (!dropdownRef.current) return;

    setMenuStyle(calculateMenuPosition(dropdownRef.current, position));

    document.addEventListener('click', handleClickOutside);

    const handleResize = () =>
      setMenuStyle(calculateMenuPosition(dropdownRef.current!, position));
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [handleClickOutside]);

  return {
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
  };
}
