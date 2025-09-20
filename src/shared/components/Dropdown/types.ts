export interface IDropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export enum PositionType {
  TOP = 'top',
  AUTO = 'auto',
  BOTTOM = 'bottom',
}
export interface IDropdown {
  options: IDropdownOption[];
  value?: string;
  onChange?: (value: unknown) => void;
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
