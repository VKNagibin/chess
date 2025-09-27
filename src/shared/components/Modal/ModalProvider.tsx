import {
  createContext,
  createElement,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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

const modalRootElement = document.createElement('div');

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [displayedModals, setDisplayedModals] = useState<IModal[]>([]);
  const modalRoot = useRef(modalRootElement).current;

  const openModal: IOpenModal = (component, props, options) => {
    return new Promise<any>((resolve) => {
      const id = uniqId();

      const close = () => {
        setDisplayedModals((prev) => prev.filter((modal) => modal.id !== id));
        resolve(null);
      };

      const submit = (result: any) => {
        setDisplayedModals((prev) => prev.filter((modal) => modal.id !== id));
        resolve(result);
      };

      setDisplayedModals((prev) => [
        ...prev,
        {
          id,
          component,
          props: { ...props, close, submit },
          resolve,
          ...options,
        },
      ]);
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

  useEffect(() => {
    document.body.appendChild(modalRoot);
    return () => {
      document.body.removeChild(modalRoot);
    };
  }, [modalRoot]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {createPortal(
        displayedModals.map((modal, index) => (
          <div
            className="modal"
            key={modal.id}
            style={{ zIndex: minimalPriorityModalZIndex + index }}
          >
            {createElement<ModalComponentProps<void>>(modal.component, modal.props)}
          </div>
        )),
        modalRoot,
      )}
    </ModalContext.Provider>
  );
};

export default memo(ModalProvider);
