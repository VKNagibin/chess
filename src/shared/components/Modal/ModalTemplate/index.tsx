import CrossIcon from 'icons/cross.svg';
import React, { memo, PropsWithChildren, useRef } from 'react';

import { noneFn } from '@/shared/types';

import animationClasses from './styles/animations/index.module.scss';
import classes from './styles/index.module.scss';
import useModalAnimations from './useModalAnimations';

export enum ModalAnimationType {
  BOTTOM = 'bottom',
  EMPTY = 'empty',
}

interface IProps {
  title: string;
  close?: noneFn;
  buttons?: React.ReactElement | null;
  handleClose?: noneFn;
  zIndex: number;
  animationType: ModalAnimationType;
  className?: string;
}

const ModalTemplate = ({
  title,
  close,
  handleClose,
  children,
  buttons = null,
  zIndex,
  animationType,
  className = '',
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
    <div className={classes.modalWrapper}>
      <div
        ref={overlayRef}
        className={`${classes.overlay} ${
          animationClasses[`${animationType}ShowOverlay`]
        } ${animationClasses[`${closeAnimationClass}Overlay`]} modalOverlay`}
      />
      <div className={classes.container}>
        <div
          ref={cardRef}
          className={`${classes.card} ${className} ${
            animationClasses[`${animationType}ShowCard`]
          } ${animationClasses[`${closeAnimationClass}Card`]}`}
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
    </div>
  );
};

export default memo(ModalTemplate);
