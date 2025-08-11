import React, { memo, PropsWithChildren } from 'react';

import classes from '@/shared/components/Modal/ModalTemplate/index.module.css';

interface IProps {
  title: string;
  withCloseButton?: boolean;
  buttons?: React.ReactElement | null;
}

const ModalTemplate = ({
  title,
  withCloseButton,
  children,
  buttons = null,
}: PropsWithChildren<IProps>) => {
  return (
    <div className={classes.overlay}>
      <div className={classes.card}>
        <div className={classes.header}>
          <h3>{title}</h3>
          {!!withCloseButton && <button className={classes.cross} />}
        </div>
        {children}
        {buttons}
      </div>
    </div>
  );
};

export default memo(ModalTemplate);
