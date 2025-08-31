import CrossIcon from 'icons/cross.svg';
import React, { memo, PropsWithChildren } from 'react';

import classes from '@/shared/components/Modal/ModalTemplate/index.module.css';
import { noneFn } from '@/shared/types';

interface IProps {
  title: string;
  close?: noneFn;
  buttons?: React.ReactElement | null;
}

const ModalTemplate = ({
  title,
  close,
  children,
  buttons = null,
}: PropsWithChildren<IProps>) => {
  return (
    <div className={classes.overlay}>
      <div className={classes.card}>
        <div className={classes.header}>
          <h3>{title}</h3>
          {!!close && (
            <button
              data-testid="modal_close_button"
              className={classes.cross}
              onClick={close}
            >
              <CrossIcon />
            </button>
          )}
        </div>
        {children}
        {buttons}
      </div>
    </div>
  );
};

export default memo(ModalTemplate);
