import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useBreakpoints } from '@/hooks/useMobileSmall';
import MobileDropdownModal from '@/modals/MobileDropdownModal';
import Logger from '@/services/Logger';

import useModal from '../Modal/useModal';
import { IDropdownOption } from './types';

export default function useDropdown({
  disabled,
  placeholder,
  value,
  options,
  multiSelect,
  onChange,
}: {
  disabled: boolean;
  value?: string;
  options: IDropdownOption[];
  placeholder: string;
  multiSelect: boolean;
  onChange?: (value: string) => void;
}) {
  const { t } = useTranslation();
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

  const { openModal } = useModal();

  const isTablet = useBreakpoints('tablet');

  const openMenu = useCallback(async () => {
    if (disabled) return;

    if (!isTablet) {
      setIsOpen((prev) => !prev);
      return;
    }

    try {
      const value = await openModal({
        ui: MobileDropdownModal,
        props: {
          list: options,
          title: placeholder,
        },
        options: {
          closeOnClickOutside: true,
        },
      });

      if (!value) return;

      handleSelect(value);
    } catch (error) {
      Logger.error('error while open mobile dropdown');
    }
  }, [isTablet, t]);

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
