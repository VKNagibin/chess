import { useCallback, useEffect, useState } from 'react';

import { noneFn } from '@/shared/types';

import { ModalAnimationType } from '.';

interface IProps {
  handleClose?: noneFn;
  animationType: ModalAnimationType;
  overlayElement: HTMLDivElement | null;
  cardElement: HTMLDivElement | null;
}

const useModalAnimations = ({
  handleClose,
  animationType,
  overlayElement,
  cardElement,
}: IProps) => {
  const [closeAnimationClass, setCloseAnimationClass] = useState('');
  const [cardAnimationEnd, setCardAnimationEnd] = useState(false);
  const [overlayAnimationEnd, setOverlayAnimationEnd] = useState(false);

  const onAnimationsEnd = useCallback(() => {
    handleClose?.();
  }, [handleClose]);

  const onCardAnimationEnd = useCallback(() => {
    setCardAnimationEnd(true);
  }, []);

  const onOverlayAnimationEnd = useCallback(() => {
    setOverlayAnimationEnd(true);
  }, []);

  useEffect(() => {
    if (!cardAnimationEnd || !overlayAnimationEnd) return;
    onAnimationsEnd();
  }, [cardAnimationEnd, overlayAnimationEnd, onAnimationsEnd]);

  useEffect(() => {
    if (!animationType || animationType === ModalAnimationType.EMPTY) {
      handleClose?.();
      return;
    }
    if (!handleClose || !overlayElement || !cardElement || !animationType) return;
    overlayElement.addEventListener('animationend', onOverlayAnimationEnd);
    cardElement.addEventListener('animationend', onCardAnimationEnd);

    setCloseAnimationClass(`${animationType}Close`);

    return () => {
      overlayElement.removeEventListener('animationend', onOverlayAnimationEnd);
      cardElement.addEventListener('animationend', onCardAnimationEnd);
    };
  }, [animationType, overlayElement, cardElement, handleClose]);

  return {
    closeAnimationClass,
  };
};

export default useModalAnimations;
