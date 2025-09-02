export interface IDropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export type PositionType = 'top' | 'auto' | 'bottom';

export interface IDropdown {
  options: IDropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiSelect?: boolean;
  className?: string;
  position?: PositionType;
}

export interface IDropdownSearch {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
