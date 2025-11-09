import { FunctionComponent } from 'react';

import { AbstractFieldsType, noneFn } from '@/shared/types';

import { ModalAnimationType } from './ModalTemplate';

export type ModalOptions = {
  closeOnClickOutside?: boolean;
  customId?: string;
} & AbstractFieldsType;

export type ModalComponentProps<Result = unknown> = {
  serviceProps: {
    zIndex: number;
    animationType: ModalAnimationType;
    handleClose?: noneFn;
  };
  submit: (result?: Result) => void;
} & AbstractFieldsType;

interface IOpenModalProps {
  ui: FunctionComponent<ModalComponentProps & AbstractFieldsType>;
  props?: {
    serviceProps?: {
      animationType: ModalAnimationType;
    };
  } & AbstractFieldsType;
  options?: ModalOptions;
}

export type IOpenModal = ({ ui, props, options }: IOpenModalProps) => Promise<any> | null;

export interface IModal {
  id: string;
  ui: FunctionComponent<ModalComponentProps & AbstractFieldsType>;
  props?: ModalComponentProps;
  options?: ModalOptions;
}

export type ModalContextType = {
  openModal: IOpenModal;
};
