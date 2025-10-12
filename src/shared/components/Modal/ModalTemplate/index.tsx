import CrossIcon from 'icons/cross.svg';
import React, { memo, PropsWithChildren, useRef } from 'react';

import { noneFn } from '@/shared/types';

import animationClasses from './styles/animations/index.module.scss';
import classes from './styles/index.module.scss';
import useModalAnimations from './useModalAnimations';

export enum ModalAnimationType {
  BOTTOM = 'bottom',
}

interface IProps {
  title: string;
  close?: noneFn;
  buttons?: React.ReactElement | null;
  handleClose?: noneFn;
  zIndex: number;
  animationType: ModalAnimationType;
}

const ModalTemplate = ({
  title,
  close,
  handleClose,
  children,
  buttons = null,
  zIndex,
  animationType,
}: PropsWithChildren<IProps>) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const { closeAnimationClass } = useModalAnimations({
    cardElement: cardRef.current,
    overlayElement: overlayRef.current,
    animationType,
    handleClose,
  });

  return (
    <div
      ref={overlayRef}
      className={`${classes.overlay} ${animationClasses[`${animationType}ShowOverlay`]} ${
        animationClasses[`${closeAnimationClass}Overlay`]
      } modal`}
    >
      <div
        ref={cardRef}
        className={`${classes.card} ${animationClasses[`${animationType}ShowCard`]} ${
          animationClasses[`${closeAnimationClass}Card`]
        }`}
        style={{ zIndex }}
      >
        {!!close && (
          <button
            data-testid="modal_close_button"
            className={classes.cross}
            onClick={close}
          >
            <CrossIcon className={classes.crossIcon} />
          </button>
        )}
        <div className={classes.header}>
          <h3>{title}</h3>
        </div>
        {children}
        {buttons}
      </div>
    </div>
  );
};

export default memo(ModalTemplate);
