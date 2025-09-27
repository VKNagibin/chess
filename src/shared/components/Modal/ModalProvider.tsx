import { createContext, createElement, memo, useCallback, useState } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';

import {
  IModal,
  IOpenModal,
  ModalComponentProps,
  ModalContextType,
} from '@/shared/components/Modal/types';
import { uniqId } from '@/shared/utils/uniqId';

let minimalPriorityModalZIndex = 1000;

export const ModalContext = createContext<ModalContextType | null>(null);

export const MODAL_STATUSES = {
  CLOSE: 'CLOSE',
  SUBMIT: 'SUBMIT',
} as const;

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [displayedModals, setDisplayedModals] = useState<IModal[]>([]);

  const openModal: IOpenModal = (component, props, options) => {
    return new Promise<any>((resolve) => {
      const id = options?.customId || uniqId();

      const close = () => {
        setDisplayedModals((prev) => prev.filter((modal) => modal.id !== id));
        resolve(null);
      };

      const submit = (result: any) => {
        setDisplayedModals((prev) => prev.filter((modal) => modal.id !== id));
        resolve(result);
      };

      setDisplayedModals((modals) => {
        if (modals.find((modal) => modal.id === options?.customId)) return modals;

        return [
          ...modals,
          {
            id,
            component,
            props: {
              ...props,
              zIndex: minimalPriorityModalZIndex + modals.length,
              close,
              submit,
            },
            resolve,
            ...options,
          },
        ];
      });
    });
  };

  const closeModal = useCallback((id: string) => {
    setDisplayedModals((modals) => modals.filter((modal) => modal.id !== id));
  }, []);

  const closeAllModals = useCallback(() => {
    setDisplayedModals([]);
  }, []);

  const contextValue = {
    openModal,
    closeModal,
    closeAllModals,
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
