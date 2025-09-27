export interface IDropdownOption<T extends string = string> {
  value: T;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export enum PositionType {
  TOP = 'top',
  AUTO = 'auto',
  BOTTOM = 'bottom',
}
export interface IDropdown<T extends string = string> {
  options: IDropdownOption[];
  value?: T;
  onChange?: (value: T) => void;
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
