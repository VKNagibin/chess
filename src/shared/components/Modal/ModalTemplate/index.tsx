import CrossIcon from 'icons/cross.svg';
import React, { memo, PropsWithChildren } from 'react';

import classes from '@/shared/components/Modal/ModalTemplate/index.module.scss';
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
    <div className={`${classes.overlay} modal`}>
      <div className={`${classes.card}`}>
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
