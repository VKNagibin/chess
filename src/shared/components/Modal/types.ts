import { FunctionComponent } from 'react';

import { AbstractFieldsType, noneFn } from '@/shared/types';

import { ModalAnimationType } from './ModalTemplate';

export type ModalOptions = {
  disableBackdropClick?: boolean;
} & AbstractFieldsType;

export type ModalComponentProps<Result = void> = {
  serviceProps?: {
    zIndex?: number;
    animationType?: ModalAnimationType;
    handleClose?: noneFn;
  };
  submit: (result?: Result) => void;
} & AbstractFieldsType;

export interface IModal<Result = void> {
  id: string;
  component: React.FunctionComponent;
  props?: ModalComponentProps<Result>;
}

export type IOpenModal = (
  component: FunctionComponent<ModalComponentProps<unknown>>,
  props: {
    serviceProps?: ModalComponentProps['serviceProps'];
    [key: string]: unknown;
  } | null,
  ...options: any[]
) => Promise<any> | null;

export type ModalContextType = {
  openModal: IOpenModal;
};
