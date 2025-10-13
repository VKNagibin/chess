import { useCallback, useMemo, useRef, useState } from 'react';

import { IDropdownOption } from './types';

export default function useDropdown({
  disabled,
  value,
  options,
  multiSelect,
  onChange,
}: {
  disabled: boolean;
  value?: string;
  options: IDropdownOption[];
  multiSelect: boolean;
  onChange?: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const openMenu = useCallback(() => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
    setSearchValue('');
  }, []);

  return {
    isOpen,
    searchValue,
    selectedValue,
    selectedOption,
    filteredOptions,
    dropdownRef,
    openMenu,
    handleSelect,
    setIsOpen,
    setSearchValue,
  };
}
