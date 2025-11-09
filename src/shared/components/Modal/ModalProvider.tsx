import { createContext, createElement, memo, useEffect, useRef, useState } from 'react';
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

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [displayedModals, setDisplayedModals] = useState<IModal[]>([]);

  const modalContainerRef = useRef<HTMLDivElement>(null);

  const openModal: IOpenModal = ({ ui, props, options }) => {
    return new Promise<unknown>((resolve) => {
      const id = options?.customId || uniqId();

      const allowAnimations = Cache.get('modalsAnimations');
      const getAnimationType = () => {
        if (!allowAnimations) return ModalAnimationType.EMPTY;
        return props?.serviceProps?.animationType || ModalAnimationType.BOTTOM;
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
              options,
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
            ui,
            props: {
              ...props,
              submit,
              serviceProps: {
                zIndex,
                animationType: getAnimationType(),
              },
            },
            options,
          },
        ];
      });
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const closableModals = displayedModals.filter(
        (modal) => modal.options?.closeOnClickOutside === true,
      );

      if (closableModals.length === 0) return;

      if ((event.target as HTMLDivElement)?.classList?.contains?.('modalOverlay')) {
        const topModal = closableModals[closableModals.length - 1];
        topModal.props?.submit();
      }
    };

    if (displayedModals.some((modal) => modal.options?.closeOnClickOutside === true)) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [displayedModals]);

  const contextValue = {
    openModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {createPortal(
        <div ref={modalContainerRef}>
          {displayedModals.map((modal) => (
            <React.Fragment key={modal.id}>
              {createElement<ModalComponentProps<unknown>>(modal.ui, modal.props)}
            </React.Fragment>
          ))}
        </div>,
        document.body,
      )}
    </ModalContext.Provider>
  );
};

export default memo(ModalProvider);
