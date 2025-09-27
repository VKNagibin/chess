import { FunctionComponent } from 'react';

import { AbstractFieldsType } from '@/shared/types';

export type ModalComponentProps<Result = void> = {
  submit: (result?: Result) => void;
  close: (result?: Result) => void;
} & AbstractFieldsType;

export type ModalOptions = {
  disableBackdropClick?: boolean;
} & AbstractFieldsType;

export interface IModal<Result = void> {
  id: string;
  component: React.FunctionComponent;
  resolve: (value?: any) => void;
  disableBackdropClick?: boolean;
  props?: ModalComponentProps<Result>;
}

export type IOpenModal = (
  component: FunctionComponent<ModalComponentProps<unknown>>,
  props?: { [key: string]: unknown } | null,
  ...options: any[]
) => Promise<any> | null;

export type ModalContextType = {
  openModal: IOpenModal;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
};
