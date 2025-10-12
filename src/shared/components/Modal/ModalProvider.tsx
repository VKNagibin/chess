import { createContext, createElement, memo, useState } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';

import Cache from '@/services/Cache';
import {
  IModal,
  IOpenModal,
  ModalComponentProps,
  ModalContextType,
} from '@/shared/components/Modal/types';
import { uniqId } from '@/shared/utils/uniqId';

import { ModalAnimationType } from './ModalTemplate';

let minimalPriorityModalZIndex = 1000;

export const ModalContext = createContext<ModalContextType | null>(null);

export const MODAL_STATUSES = {
  CLOSE: 'CLOSE',
  SUBMIT: 'SUBMIT',
} as const;

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [displayedModals, setDisplayedModals] = useState<IModal[]>([]);

  const openModal: IOpenModal = (component, props, options) => {
    return new Promise<unknown>((resolve) => {
      const id = options?.customId || uniqId();

      const allowAnimations = Cache.get('modalsAnimations');
      const getAnimationType = () => {
        if (!allowAnimations) return null;
        return props?.serviceProps.animationType || ModalAnimationType.BOTTOM;
      };

      const submit = (result: unknown) => {
        const handleClose = () => {
          setDisplayedModals((prev) => prev.filter((modal) => modal.id !== id));
          resolve(result);
        };

        setDisplayedModals((modals) =>
          modals.map((modal) => {
            if (modal.id !== id) return modal;
            return {
              ...modal,
              props: {
                ...modal.props!,
                serviceProps: {
                  ...modal.props!.serviceProps!,
                  handleClose,
                },
              },
            };
          }),
        );
      };

      setDisplayedModals((modals) => {
        if (modals.find((modal) => modal.id === options?.customId)) return modals;
        const zIndex = minimalPriorityModalZIndex + modals.length;

        return [
          ...modals,
          {
            id,
            component,
            props: {
              ...props,
              submit,
              serviceProps: {
                zIndex,
                animationType: getAnimationType(),
              },
            },
            ...options,
          },
        ];
      });
    });
  };

  const contextValue = {
    openModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {createPortal(
        displayedModals.map((modal) => (
          <React.Fragment key={modal.id}>
            {createElement<ModalComponentProps<void>>(modal.component, modal.props)}
          </React.Fragment>
        )),
        document.body,
      )}
    </ModalContext.Provider>
  );
};

export default memo(ModalProvider);
